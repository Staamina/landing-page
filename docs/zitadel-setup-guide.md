# Zitadel Setup Guide

Complete guide to configure Zitadel OIDC authentication for Staamina — local development and production.

## Table of Contents

1. [Zitadel Instance Setup](#1-zitadel-instance-setup)
2. [Project & Application Configuration](#2-project--application-configuration)
3. [Roles Configuration](#3-roles-configuration)
4. [Service User (Backend M2M)](#4-service-user-backend-m2m)
5. [Local Development Configuration](#5-local-development-configuration)
6. [Production Configuration](#6-production-configuration)
7. [Verifying the Setup](#7-verifying-the-setup)
8. [Troubleshooting](#8-troubleshooting)

---

## 1. Zitadel Instance Setup

### Option A: Zitadel Cloud (recommended for getting started)

1. Go to [zitadel.com](https://zitadel.com) and create an account
2. Create a new instance — you'll get a domain like `https://your-org-abc123.zitadel.cloud`
3. Note down your instance domain

### Option B: Self-hosted (production)

1. Deploy Zitadel via Docker Compose or Kubernetes (see [Zitadel deployment docs](https://zitadel.com/docs/self-hosting/deploy/overview))
2. Your instance domain will be your custom domain (e.g., `https://auth.staamina.com`)

---

## 2. Project & Application Configuration

### Create a Project

1. In the Zitadel Console, go to **Projects** → **Create New Project**
2. Name it `Staamina`
3. Note the **Project ID** (Resource ID displayed on the project page)

### Create the HQ Application (Headquarter System)

1. Inside the project, click **New Application**
2. Name: `Staamina HQ`
3. Type: **Web** → **PKCE** (Code flow, no client secret needed on frontend)
4. Redirect URIs:
   - **Development:** `http://localhost:4002/callback`
   - **Production:** `https://hq.staamina.com/callback` (your production domain)
5. Post-logout redirect URIs:
   - **Development:** `http://localhost:4002`
   - **Production:** `https://hq.staamina.com`
6. Save and note the **Client ID**

### Create the FSM Application (Field Maintenance System)

1. Inside the same project, click **New Application**
2. Name: `Staamina FSM`
3. Type: **Web** → **PKCE**
4. Redirect URIs:
   - **Development:** `http://localhost:4003/callback`
   - **Production:** `https://fsm.staamina.com/callback`
5. Post-logout redirect URIs:
   - **Development:** `http://localhost:4003`
   - **Production:** `https://fsm.staamina.com`
6. Save and note the **Client ID**

### Create the Backend Application (API — confidential)

1. Inside the same project, click **New Application**
2. Name: `Staamina API`
3. Type: **API** → **Basic Authentication**
4. Save and note the **Client ID** and **Client Secret**

> **Important:** The backend uses the Client Secret for M2M operations (e.g., user info lookup). The frontend apps use PKCE and do NOT need a client secret.

---

## 3. Roles Configuration

1. In the Zitadel Console, go to your project → **Roles**
2. Create the following roles:

| Role Key           | Display Name        | Group   |
| ------------------ | ------------------- | ------- |
| SuperAdministrator | Super Administrator | admin   |
| Administrator      | Administrator       | admin   |
| SiteManager        | Site Manager        | manager |
| Technician         | Technician          | field   |

3. Go to **Settings** → **General** and enable:
   - ✅ "Assert Roles on Authentication" — includes roles in the JWT token
   - ✅ "Check for Project on Authentication" — validates the audience

---

## 4. Service User (Backend M2M)

For backend operations that need to call the Zitadel Management API (e.g., creating users, syncing roles):

1. Go to **Users** → **Service Users** → **New Service User**
2. Name: `staamina-backend`
3. Access Token Type: **JWT**
4. Generate a new key → download the JSON key file
5. Place the key file in a secure location and set `ZITADEL_SERVICE_USER_KEY_PATH` to its path

> This is **optional** if you don't need backend-initiated user management via Zitadel API.

---

## 5. Local Development Configuration

### Backend (`apps/backend/.env`)

```env
# Zitadel Authentication
ZITADEL_INSTANCE_DOMAIN=https://your-org-abc123.zitadel.cloud
ZITADEL_CLIENT_ID=<backend-api-client-id>
ZITADEL_CLIENT_SECRET=<backend-api-client-secret>
ZITADEL_PROJECT_ID=<project-id>
ZITADEL_HQ_CLIENT_ID=<hq-app-client-id>
ZITADEL_FSM_CLIENT_ID=<fsm-app-client-id>
ZITADEL_SERVICE_USER_KEY_PATH=

# API
API_BASE_URL=http://localhost:4000
```

### Headquarter System (`apps/headquarter-system/.env`)

```env
VITE_ZITADEL_INSTANCE_DOMAIN=https://your-org-abc123.zitadel.cloud
VITE_ZITADEL_CLIENT_ID=<hq-app-client-id>
VITE_ZITADEL_PROJECT_ID=<project-id>
VITE_API_BASE_URL=http://localhost:4000
```

### Field Maintenance System (`apps/field-maintenance-system/.env`)

```env
VITE_ZITADEL_INSTANCE_DOMAIN=https://your-org-abc123.zitadel.cloud
VITE_ZITADEL_CLIENT_ID=<fsm-app-client-id>
VITE_ZITADEL_PROJECT_ID=<project-id>
VITE_API_BASE_URL=http://localhost:4000
```

### How it all connects

```
Browser (HQ/FSM)                    Zitadel Instance                    Backend API
     │                                    │                                  │
     ├──── authorize() ──────────────────►│                                  │
     │     (PKCE code flow)               │                                  │
     │◄─── redirect /callback?code= ──────┤                                  │
     │                                    │                                  │
     ├──── signinRedirectCallback() ──────►│                                  │
     │◄─── { access_token (JWT) } ────────┤                                  │
     │                                    │                                  │
     ├──── API call ──────────────────────────────────────────────────────────►│
     │     Authorization: Bearer <JWT>                                        │
     │                                                                        │
     │                                    │◄──── JWKS validation ─────────────┤
     │                                    │      /oauth/v2/keys               │
     │                                    ├────► { public keys } ─────────────►│
     │                                                                        │
     │◄───────────────────────────────────────── API response ────────────────┤
```

- **Frontend** redirects to Zitadel hosted login page, receives a JWT `access_token`
- **Backend** validates the JWT using Zitadel's JWKS endpoint (public keys)
- No session cookies — pure stateless JWT authentication

---

## 6. Production Configuration

### Backend (Docker / VPS)

Set these environment variables in your Docker Compose or deployment config:

```env
ZITADEL_INSTANCE_DOMAIN=https://auth.staamina.com
ZITADEL_CLIENT_ID=<backend-api-client-id>
ZITADEL_CLIENT_SECRET=<backend-api-client-secret>
ZITADEL_PROJECT_ID=<project-id>
ZITADEL_HQ_CLIENT_ID=<hq-app-client-id>
ZITADEL_FSM_CLIENT_ID=<fsm-app-client-id>
ZITADEL_SERVICE_USER_KEY_PATH=/etc/staamina/zitadel-key.json
API_BASE_URL=https://api.staamina.com
```

### Frontend (Vercel)

Set these in Vercel → Project Settings → Environment Variables:

**HQ app:**
| Variable | Value |
|----------|-------|
| `VITE_ZITADEL_INSTANCE_DOMAIN` | `https://auth.staamina.com` |
| `VITE_ZITADEL_CLIENT_ID` | `<hq-app-client-id>` |
| `VITE_ZITADEL_PROJECT_ID` | `<project-id>` |
| `VITE_API_BASE_URL` | `https://api.staamina.com` |

**FSM app:**
| Variable | Value |
|----------|-------|
| `VITE_ZITADEL_INSTANCE_DOMAIN` | `https://auth.staamina.com` |
| `VITE_ZITADEL_CLIENT_ID` | `<fsm-app-client-id>` |
| `VITE_ZITADEL_PROJECT_ID` | `<project-id>` |
| `VITE_API_BASE_URL` | `https://api.staamina.com` |

### Production Zitadel Checklist

- [ ] Redirect URIs updated to production domains in each Zitadel application
- [ ] CORS configured on Zitadel instance (if self-hosted) to allow frontend origins
- [ ] "Assert Roles on Authentication" enabled on the project
- [ ] Service User key file deployed securely (if using M2M)
- [ ] Backend `ZITADEL_INSTANCE_DOMAIN` points to production Zitadel (not cloud dev)
- [ ] All `VITE_*` env vars set in Vercel for each frontend app
- [ ] Test login flow end-to-end after deployment

---

## 7. Verifying the Setup

### Check Zitadel is reachable

```bash
# Should return JWKS public keys
curl https://your-zitadel-instance.zitadel.cloud/oauth/v2/keys
```

### Check backend auth

```bash
# Start backend
pnpm backend:dev

# Should return 401 (no token)
curl http://localhost:4000/api/v1/auth/me

# Get the sign-in URL
curl "http://localhost:4000/api/v1/auth/sign-in?redirectUri=http://localhost:5173/callback"
```

### Check frontend flow

1. Start the app: `pnpm head:dev` or `pnpm fsm:dev`
2. Open the app in browser — should redirect to Zitadel hosted login
3. Log in with a Zitadel user
4. Should redirect back to `/callback` then to `/`
5. Check browser DevTools → Application → Session Storage for the OIDC user object

---

## 8. Troubleshooting

### "Invalid redirect URI"

- The redirect URI in your Zitadel app config must **exactly match** what the frontend sends
- Check trailing slashes — `http://localhost:4002/callback` vs `http://localhost:4002/callback/`
- HQ runs on port **4002**, FSM on port **4003** (not Vite's default 5173/5174)

### "Invalid audience" / 401 on backend

- Ensure `ZITADEL_PROJECT_ID` is correct (check Project → Resource ID in Zitadel Console)
- Ensure "Assert Roles on Authentication" is enabled on the project
- Ensure `ZITADEL_CLIENT_ID`, `ZITADEL_HQ_CLIENT_ID`, and `ZITADEL_FSM_CLIENT_ID` are correct

### "JWKS error" on backend startup

- Ensure `ZITADEL_INSTANCE_DOMAIN` is reachable from the backend
- Test: `curl $ZITADEL_INSTANCE_DOMAIN/oauth/v2/keys`

### Silent renew fails

- Zitadel requires an active session — if the user's session expired, silent renew will fail
- The frontend handles this gracefully by redirecting to login

### Roles not in JWT token

- Go to Zitadel Console → Project → Settings → enable "Assert Roles on Authentication"
- Assign roles to users via the Zitadel Console or Management API

---

## Summary of Environment Variables

| Variable                        | App     | Required | Description                                      |
| ------------------------------- | ------- | -------- | ------------------------------------------------ |
| `ZITADEL_INSTANCE_DOMAIN`       | Backend | Yes      | Zitadel instance URL (no trailing slash)         |
| `ZITADEL_CLIENT_ID`             | Backend | Yes      | Backend API app Client ID (M2M / token exchange) |
| `ZITADEL_CLIENT_SECRET`         | Backend | Yes      | Backend API app Client Secret                    |
| `ZITADEL_PROJECT_ID`            | Backend | Yes      | Zitadel Project Resource ID                      |
| `ZITADEL_HQ_CLIENT_ID`          | Backend | Yes      | HQ app Client ID (for JWT audience validation)   |
| `ZITADEL_FSM_CLIENT_ID`         | Backend | Yes      | FSM app Client ID (for JWT audience validation)  |
| `ZITADEL_SERVICE_USER_KEY_PATH` | Backend | No       | Path to service user JSON key                    |
| `VITE_ZITADEL_INSTANCE_DOMAIN`  | HQ, FSM | Yes      | Zitadel instance URL                             |
| `VITE_ZITADEL_CLIENT_ID`        | HQ, FSM | Yes      | Respective app Client ID                         |
| `VITE_ZITADEL_PROJECT_ID`       | HQ, FSM | Yes      | Zitadel Project Resource ID                      |
