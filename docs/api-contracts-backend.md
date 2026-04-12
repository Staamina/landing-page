# API Contracts - Backend

**Generated:** 2026-01-07  
**Part:** backend  
**Base URL:** `/api`

## Authentication

All endpoints (except public auth endpoints) require JWT Bearer token authentication.

### Auth Endpoints

#### `GET /api/auth/sign-in`

- **Description:** Get sign-in URL (redirects to Logto)
- **Public:** Yes
- **Query Parameters:**
  - `redirectUri` (optional): Redirect URI after authentication
- **Response:** Redirects to Logto sign-in page

#### `GET /api/auth/callback`

- **Description:** OAuth callback endpoint
- **Public:** Yes
- **Response:** Redirects to frontend with token in query parameter

#### `POST /api/auth/sign-out`

- **Description:** Sign out current user
- **Authentication:** Required (JWT)
- **Query Parameters:**
  - `redirectUri` (optional): Redirect URI after sign-out
- **Response:** Redirects to sign-out URL

#### `GET /api/auth/me`

- **Description:** Get current user information from JWT token
- **Authentication:** Required (JWT)
- **Response:** LogtoUser object

#### `GET /api/auth/verify`

- **Description:** Verify JWT token validity
- **Authentication:** Required (JWT)
- **Response:**
  ```json
  {
    "valid": true,
    "user": {
      "id": "string",
      "email": "string",
      "name": "string"
    }
  }
  ```

#### `GET /api/auth/token`

- **Description:** Get current access token from authenticated session
- **Public:** Yes (but requires authenticated session)
- **Response:** TokenResponseDto

#### `POST /api/auth/token`

- **Description:** Exchange authorization code for access token
- **Public:** Yes
- **Request Body:** ExchangeCodeDto
  ```json
  {
    "code": "string"
  }
  ```
- **Response:** TokenResponseDto

#### `POST /api/auth/login`

- **Description:** Authenticate with email and password
- **Public:** Yes
- **Request Body:** LoginDto
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- **Response:** TokenResponseDto

## Users

Base path: `/api/users`

All endpoints require JWT authentication and role-based authorization.

#### `GET /api/users/me`

- **Description:** Get current user information (synchronizes with database)
- **Authentication:** Required (JWT)
- **Roles:** Any authenticated user
- **Response:** User object with database record

#### `GET /api/users/me/roles`

- **Description:** Get current user roles
- **Authentication:** Required (JWT)
- **Roles:** Any authenticated user
- **Response:** Array of Role objects

#### `POST /api/users/me/assign-super-admin`

- **Description:** Assign SuperAdministrator role to current user
- **Authentication:** Required (JWT)
- **Roles:** SuperAdministrator (to assign to self)
- **Response:** Success message with userId and logtoId

#### `POST /api/users`

- **Description:** Create a new user
- **Authentication:** Required (JWT)
- **Roles:** SuperAdministrator
- **Request Body:** CreateUserDto
  ```json
  {
    "email": "string",
    "name": "string",
    "companyId": "string (optional)",
    "siteId": "string (optional)",
    "serviceProviderId": "string (optional)",
    "roleName": "string (optional)"
  }
  ```
- **Response:** Created User object

#### `GET /api/users`

- **Description:** Get all users (paginated)
- **Authentication:** Required (JWT)
- **Roles:** SuperAdministrator, Administrator
- **Query Parameters:**
  - `page` (optional): Page number (default: 1)
  - `limit` (optional): Items per page (default: 10)
- **Response:** Paginated users list

#### `GET /api/users/:userId`

- **Description:** Get a user by ID
- **Authentication:** Required (JWT)
- **Roles:** SuperAdministrator, Administrator
- **Path Parameters:**
  - `userId`: User UUID
- **Response:** User object

#### `GET /api/users/roles`

- **Description:** Get all available roles
- **Authentication:** Required (JWT)
- **Roles:** SuperAdministrator, Administrator
- **Response:** Array of Role objects

#### `POST /api/users/:userId/roles`

- **Description:** Assign a role to a user
- **Authentication:** Required (JWT)
- **Roles:** SuperAdministrator
- **Path Parameters:**
  - `userId`: User UUID
- **Request Body:**
  ```json
  {
    "roleName": "string"
  }
  ```
- **Response:** Success message

#### `DELETE /api/users/:userId/roles/:roleName`

- **Description:** Remove a role from a user
- **Authentication:** Required (JWT)
- **Roles:** SuperAdministrator
- **Path Parameters:**
  - `userId`: User UUID
  - `roleName`: Role name
- **Response:** Success message

#### `PUT /api/users/:userId/organization`

- **Description:** Assign a user to an organization (Company, Site, or ServiceProvider)
- **Authentication:** Required (JWT)
- **Roles:** SuperAdministrator, Administrator
- **Path Parameters:**
  - `userId`: User UUID
- **Request Body:** AssignUserOrganizationDto
  ```json
  {
    "companyId": "string (optional)",
    "siteId": "string (optional)",
    "serviceProviderId": "string (optional)"
  }
  ```
- **Response:** Updated User object

#### `DELETE /api/users/:userId/organization`

- **Description:** Remove user from their current organization
- **Authentication:** Required (JWT)
- **Roles:** SuperAdministrator, Administrator
- **Path Parameters:**
  - `userId`: User UUID
- **Response:** Updated User object

## Sites

Base path: `/api/sites`

All endpoints require JWT authentication and role-based authorization.

#### `POST /api/sites`

- **Description:** Create a new site
- **Authentication:** Required (JWT)
- **Roles:** SuperAdministrator, Administrator
- **Request Body:** CreateSiteDto
- **Response:** Created Site object

#### `GET /api/sites`

- **Description:** Get all sites (paginated or all)
- **Authentication:** Required (JWT)
- **Roles:** SuperAdministrator, Administrator, SiteManager
- **Query Parameters:**
  - `page` (optional): Page number
  - `limit` (optional): Items per page
- **Response:** Sites list (paginated if page/limit provided)

#### `GET /api/sites/company/:companyId`

- **Description:** Get all sites for a company
- **Authentication:** Required (JWT)
- **Roles:** SuperAdministrator, Administrator, SiteManager
- **Path Parameters:**
  - `companyId`: Company UUID
- **Response:** Array of Site objects

#### `GET /api/sites/:id`

- **Description:** Get a site by ID
- **Authentication:** Required (JWT)
- **Roles:** SuperAdministrator, Administrator, SiteManager
- **Path Parameters:**
  - `id`: Site UUID
- **Response:** Site object

#### `PATCH /api/sites/:id`

- **Description:** Update a site
- **Authentication:** Required (JWT)
- **Roles:** SuperAdministrator, Administrator
- **Path Parameters:**
  - `id`: Site UUID
- **Request Body:** UpdateSiteDto
- **Response:** Updated Site object

#### `DELETE /api/sites/:id`

- **Description:** Delete a site
- **Authentication:** Required (JWT)
- **Roles:** SuperAdministrator
- **Path Parameters:**
  - `id`: Site UUID
- **Response:** Success message or error if users assigned

#### `GET /api/sites/:id/users`

- **Description:** Get all users assigned to a site
- **Authentication:** Required (JWT)
- **Roles:** SuperAdministrator, Administrator
- **Path Parameters:**
  - `id`: Site UUID
- **Response:** Array of User objects

## Site Buildings

Base path: `/api/site-buildings`

All endpoints require JWT authentication and role-based authorization.

#### `POST /api/site-buildings`

- **Description:** Create a new site building
- **Authentication:** Required (JWT)
- **Roles:** SuperAdministrator, Administrator
- **Request Body:** CreateSiteBuildingDto
- **Response:** Created SiteBuilding object

#### `GET /api/site-buildings`

- **Description:** Get all site buildings
- **Authentication:** Required (JWT)
- **Roles:** SuperAdministrator, Administrator, SiteManager
- **Response:** Array of SiteBuilding objects

#### `GET /api/site-buildings/sites/:siteId`

- **Description:** Get site building for a specific site
- **Authentication:** Required (JWT)
- **Roles:** SuperAdministrator, Administrator, SiteManager
- **Path Parameters:**
  - `siteId`: Site UUID
- **Response:** SiteBuilding object

#### `GET /api/site-buildings/:id`

- **Description:** Get a site building by ID
- **Authentication:** Required (JWT)
- **Roles:** SuperAdministrator, Administrator, SiteManager
- **Path Parameters:**
  - `id`: SiteBuilding UUID
- **Response:** SiteBuilding object

#### `PATCH /api/site-buildings/:id`

- **Description:** Update a site building
- **Authentication:** Required (JWT)
- **Roles:** SuperAdministrator, Administrator
- **Path Parameters:**
  - `id`: SiteBuilding UUID
- **Request Body:** UpdateSiteBuildingDto
- **Response:** Updated SiteBuilding object

#### `DELETE /api/site-buildings/:id`

- **Description:** Delete a site building
- **Authentication:** Required (JWT)
- **Roles:** SuperAdministrator
- **Path Parameters:**
  - `id`: SiteBuilding UUID
- **Response:** Success message

## Floors

Base path: `/api/sites`

All endpoints require JWT authentication and role-based authorization.

#### `POST /api/sites/:siteId/floors`

- **Description:** Create a new floor for a site
- **Authentication:** Required (JWT)
- **Roles:** SuperAdministrator, Administrator
- **Path Parameters:**
  - `siteId`: Site UUID
- **Request Body:** CreateFloorDto
- **Response:** Created Floor object

#### `GET /api/sites/:siteId/floors`

- **Description:** Get all floors for a site
- **Authentication:** Required (JWT)
- **Roles:** SuperAdministrator, Administrator, SiteManager
- **Path Parameters:**
  - `siteId`: Site UUID
- **Response:** Array of Floor objects

#### `GET /api/sites/floors/:id`

- **Description:** Get a floor by ID
- **Authentication:** Required (JWT)
- **Roles:** SuperAdministrator, Administrator, SiteManager
- **Path Parameters:**
  - `id`: Floor UUID
- **Response:** Floor object

#### `PATCH /api/sites/floors/:id`

- **Description:** Update a floor
- **Authentication:** Required (JWT)
- **Roles:** SuperAdministrator, Administrator
- **Path Parameters:**
  - `id`: Floor UUID
- **Request Body:** UpdateFloorDto
- **Response:** Updated Floor object

#### `DELETE /api/sites/floors/:id`

- **Description:** Delete a floor
- **Authentication:** Required (JWT)
- **Roles:** SuperAdministrator
- **Path Parameters:**
  - `id`: Floor UUID
- **Response:** Success message

## Equipment

Base path: `/api/equipment`

All endpoints require JWT authentication and role-based authorization.

#### `POST /api/equipment`

- **Description:** Create a new equipment
- **Authentication:** Required (JWT)
- **Roles:** SuperAdministrator, Administrator
- **Request Body:** CreateEquipmentDto
- **Response:** Created Equipment object

#### `GET /api/equipment`

- **Description:** Get all equipment
- **Authentication:** Required (JWT)
- **Roles:** SuperAdministrator, Administrator, SiteManager
- **Response:** Array of Equipment objects

#### `GET /api/equipment/sites/:siteId`

- **Description:** Get all equipment for a site (paginated or all)
- **Authentication:** Required (JWT)
- **Roles:** SuperAdministrator, Administrator, SiteManager, SiteDirector
- **Path Parameters:**
  - `siteId`: Site UUID
- **Query Parameters:**
  - `page` (optional): Page number
  - `limit` (optional): Items per page
  - `categoryId` (optional): Filter equipment by category ID
  - `search` (optional): Search equipment by name (case-insensitive)
- **Response:** Equipment list (paginated if page/limit provided)

#### `GET /api/equipment/:id`

- **Description:** Get an equipment by ID
- **Authentication:** Required (JWT)
- **Roles:** SuperAdministrator, Administrator, SiteManager
- **Path Parameters:**
  - `id`: Equipment UUID
- **Response:** Equipment object

#### `PATCH /api/equipment/:id`

- **Description:** Update an equipment
- **Authentication:** Required (JWT)
- **Roles:** SuperAdministrator, Administrator
- **Path Parameters:**
  - `id`: Equipment UUID
- **Request Body:** UpdateEquipmentDto
- **Response:** Updated Equipment object

#### `DELETE /api/equipment/:id`

- **Description:** Delete an equipment
- **Authentication:** Required (JWT)
- **Roles:** SuperAdministrator
- **Path Parameters:**
  - `id`: Equipment UUID
- **Response:** Success message or error if has children or connected ports

#### `POST /api/equipment/:id/electrical-panel`

- **Description:** Create an electrical panel for an equipment
- **Authentication:** Required (JWT)
- **Roles:** SuperAdministrator, Administrator
- **Path Parameters:**
  - `id`: Equipment UUID
- **Request Body:** CreateElectricalPanelDto
- **Response:** Created ElectricalPanel object

#### `GET /api/equipment/:id/electrical-panel`

- **Description:** Get electrical panel for an equipment
- **Authentication:** Required (JWT)
- **Roles:** SuperAdministrator, Administrator, SiteManager
- **Path Parameters:**
  - `id`: Equipment UUID
- **Response:** ElectricalPanel object

#### `POST /api/equipment/electrical-panels/:panelId/ports`

- **Description:** Create a panel port
- **Authentication:** Required (JWT)
- **Roles:** SuperAdministrator, Administrator
- **Path Parameters:**
  - `panelId`: ElectricalPanel UUID
- **Request Body:** CreatePanelPortDto
- **Response:** Created PanelPort object

#### `PATCH /api/equipment/:id/spatial-data`

- **Description:** Update spatial data for an equipment (position, rotation, dimensions)
- **Authentication:** Required (JWT)
- **Roles:** SuperAdministrator, Administrator, SiteManager
- **Path Parameters:**
  - `id`: Equipment UUID
- **Request Body:** SpatialDataDto
  ```json
  {
    "floorId": "string (optional)",
    "positionX": "number (optional)",
    "positionY": "number (optional)",
    "positionZ": "number (optional)",
    "rotationX": "number (optional)",
    "rotationY": "number (optional)",
    "rotationZ": "number (optional)",
    "width": "number (optional)",
    "height": "number (optional)",
    "depth": "number (optional)"
  }
  ```
- **Response:** Updated Equipment object

#### `GET /api/equipment/:id/spatial-data`

- **Description:** Get spatial data for an equipment
- **Authentication:** Required (JWT)
- **Roles:** SuperAdministrator, Administrator, SiteManager
- **Path Parameters:**
  - `id`: Equipment UUID
- **Response:** SpatialDataDto

## Organizations

### Companies

Base path: `/api/companies`

All endpoints require JWT authentication and role-based authorization.

#### `POST /api/companies`

- **Description:** Create a new company
- **Authentication:** Required (JWT)
- **Roles:** SuperAdministrator, Administrator
- **Request Body:** CreateCompanyDto
- **Response:** Created Company object

#### `GET /api/companies`

- **Description:** Get all companies (paginated or all)
- **Authentication:** Required (JWT)
- **Roles:** SuperAdministrator, Administrator, SiteManager
- **Query Parameters:**
  - `page` (optional): Page number
  - `limit` (optional): Items per page
- **Response:** Companies list (paginated if page/limit provided)

#### `GET /api/companies/:id`

- **Description:** Get a company by ID
- **Authentication:** Required (JWT)
- **Roles:** SuperAdministrator, Administrator, SiteManager
- **Path Parameters:**
  - `id`: Company UUID
- **Response:** Company object

#### `PATCH /api/companies/:id`

- **Description:** Update a company
- **Authentication:** Required (JWT)
- **Roles:** SuperAdministrator, Administrator
- **Path Parameters:**
  - `id`: Company UUID
- **Request Body:** UpdateCompanyDto
- **Response:** Updated Company object

#### `DELETE /api/companies/:id`

- **Description:** Delete a company
- **Authentication:** Required (JWT)
- **Roles:** SuperAdministrator
- **Path Parameters:**
  - `id`: Company UUID
- **Response:** Success message

#### `GET /api/companies/:id/sites`

- **Description:** Get all sites for a company
- **Authentication:** Required (JWT)
- **Roles:** SuperAdministrator, Administrator, SiteManager
- **Path Parameters:**
  - `id`: Company UUID
- **Response:** Array of Site objects

#### `GET /api/companies/:id/service-providers`

- **Description:** Get all service providers for a company
- **Authentication:** Required (JWT)
- **Roles:** SuperAdministrator, Administrator, SiteManager
- **Path Parameters:**
  - `id`: Company UUID
- **Response:** Array of ServiceProvider objects

#### `GET /api/companies/:id/users`

- **Description:** Get all users for a company
- **Authentication:** Required (JWT)
- **Roles:** SuperAdministrator, Administrator
- **Path Parameters:**
  - `id`: Company UUID
- **Response:** Array of User objects

### Service Providers

Base path: `/api/service-providers`

All endpoints require JWT authentication and role-based authorization.

#### `POST /api/service-providers`

- **Description:** Create a new service provider
- **Authentication:** Required (JWT)
- **Roles:** SuperAdministrator, Administrator
- **Request Body:** CreateServiceProviderDto
- **Response:** Created ServiceProvider object

#### `GET /api/service-providers`

- **Description:** Get all service providers (paginated or all)
- **Authentication:** Required (JWT)
- **Roles:** SuperAdministrator, Administrator, SiteManager
- **Query Parameters:**
  - `page` (optional): Page number
  - `limit` (optional): Items per page
- **Response:** ServiceProviders list (paginated if page/limit provided)

#### `GET /api/service-providers/independent`

- **Description:** Get independent service providers (not linked to companies)
- **Authentication:** Required (JWT)
- **Roles:** SuperAdministrator, Administrator, SiteManager
- **Response:** Array of ServiceProvider objects

#### `GET /api/service-providers/company/:companyId`

- **Description:** Get all service providers for a company
- **Authentication:** Required (JWT)
- **Roles:** SuperAdministrator, Administrator, SiteManager
- **Path Parameters:**
  - `companyId`: Company UUID
- **Response:** Array of ServiceProvider objects

#### `GET /api/service-providers/:id`

- **Description:** Get a service provider by ID
- **Authentication:** Required (JWT)
- **Roles:** SuperAdministrator, Administrator, SiteManager
- **Path Parameters:**
  - `id`: ServiceProvider UUID
- **Response:** ServiceProvider object

#### `PATCH /api/service-providers/:id`

- **Description:** Update a service provider
- **Authentication:** Required (JWT)
- **Roles:** SuperAdministrator, Administrator
- **Path Parameters:**
  - `id`: ServiceProvider UUID
- **Request Body:** UpdateServiceProviderDto
- **Response:** Updated ServiceProvider object

#### `DELETE /api/service-providers/:id`

- **Description:** Delete a service provider
- **Authentication:** Required (JWT)
- **Roles:** SuperAdministrator
- **Path Parameters:**
  - `id`: ServiceProvider UUID
- **Response:** Success message

#### `GET /api/service-providers/:id/users`

- **Description:** Get all users for a service provider
- **Authentication:** Required (JWT)
- **Roles:** SuperAdministrator, Administrator
- **Path Parameters:**
  - `id`: ServiceProvider UUID
- **Response:** Array of User objects

## Catalog

### Brands

Base path: `/api/brands`

All endpoints require JWT authentication and role-based authorization.

#### `POST /api/brands`

- **Description:** Create a new brand
- **Authentication:** Required (JWT)
- **Roles:** SuperAdministrator, Administrator
- **Request Body:** CreateBrandDto
- **Response:** Created Brand object

#### `GET /api/brands`

- **Description:** Get all brands (paginated or all)
- **Authentication:** Required (JWT)
- **Roles:** SuperAdministrator, Administrator, SiteManager
- **Query Parameters:**
  - `page` (optional): Page number
  - `limit` (optional): Items per page
- **Response:** Brands list (paginated if page/limit provided)

#### `GET /api/brands/:id`

- **Description:** Get a brand by ID
- **Authentication:** Required (JWT)
- **Roles:** SuperAdministrator, Administrator, SiteManager
- **Path Parameters:**
  - `id`: Brand UUID
- **Response:** Brand object

#### `PATCH /api/brands/:id`

- **Description:** Update a brand
- **Authentication:** Required (JWT)
- **Roles:** SuperAdministrator, Administrator
- **Path Parameters:**
  - `id`: Brand UUID
- **Request Body:** UpdateBrandDto
- **Response:** Updated Brand object

#### `DELETE /api/brands/:id`

- **Description:** Delete a brand
- **Authentication:** Required (JWT)
- **Roles:** SuperAdministrator
- **Path Parameters:**
  - `id`: Brand UUID
- **Response:** Success message

### Categories

Base path: `/api/categories`

All endpoints require JWT authentication and role-based authorization.

#### `POST /api/categories`

- **Description:** Create a new category
- **Authentication:** Required (JWT)
- **Roles:** SuperAdministrator, Administrator
- **Request Body:** CreateCategoryDto
- **Response:** Created Category object

#### `GET /api/categories`

- **Description:** Get all categories
- **Authentication:** Required (JWT)
- **Roles:** SuperAdministrator, Administrator, SiteManager
- **Response:** Array of Category objects

#### `GET /api/categories/:id`

- **Description:** Get a category by ID
- **Authentication:** Required (JWT)
- **Roles:** SuperAdministrator, Administrator, SiteManager
- **Path Parameters:**
  - `id`: Category UUID
- **Response:** Category object

#### `PATCH /api/categories/:id`

- **Description:** Update a category
- **Authentication:** Required (JWT)
- **Roles:** SuperAdministrator, Administrator
- **Path Parameters:**
  - `id`: Category UUID
- **Request Body:** UpdateCategoryDto
- **Response:** Updated Category object

#### `DELETE /api/categories/:id`

- **Description:** Delete a category
- **Authentication:** Required (JWT)
- **Roles:** SuperAdministrator
- **Path Parameters:**
  - `id`: Category UUID
- **Response:** Success message

#### `GET /api/categories/companies/:companyId`

- **Description:** Get all categories for a company
- **Authentication:** Required (JWT)
- **Roles:** SuperAdministrator, Administrator, SiteManager, SiteDirector
- **Path Parameters:**
  - `companyId`: Company UUID
- **Response:** Array of Category objects

### Models

Base path: `/api/models`

All endpoints require JWT authentication and role-based authorization.

#### `POST /api/models`

- **Description:** Create a new model
- **Authentication:** Required (JWT)
- **Roles:** SuperAdministrator, Administrator
- **Request Body:** CreateModelDto
- **Response:** Created Model object

#### `GET /api/models`

- **Description:** Get all models (paginated or all)
- **Authentication:** Required (JWT)
- **Roles:** SuperAdministrator, Administrator, SiteManager
- **Query Parameters:**
  - `page` (optional): Page number
  - `limit` (optional): Items per page
- **Response:** Models list (paginated if page/limit provided)

#### `GET /api/models/:id`

- **Description:** Get a model by ID
- **Authentication:** Required (JWT)
- **Roles:** SuperAdministrator, Administrator, SiteManager
- **Path Parameters:**
  - `id`: Model UUID
- **Response:** Model object

#### `PATCH /api/models/:id`

- **Description:** Update a model
- **Authentication:** Required (JWT)
- **Roles:** SuperAdministrator, Administrator
- **Path Parameters:**
  - `id`: Model UUID
- **Request Body:** UpdateModelDto
- **Response:** Updated Model object

#### `DELETE /api/models/:id`

- **Description:** Delete a model
- **Authentication:** Required (JWT)
- **Roles:** SuperAdministrator
- **Path Parameters:**
  - `id`: Model UUID
- **Response:** Success message

## Incidents

Base path: `/api/incidents`

All endpoints require JWT authentication and role-based authorization.

#### `POST /api/incidents`

- **Description:** Create a new incident
- **Authentication:** Required (JWT)
- **Roles:** SuperAdministrator, Administrator, SiteManager, SiteDirector
- **Request Body:** CreateIncidentDto
  ```json
  {
    "title": "string",
    "description": "string",
    "equipmentId": "string (UUID)",
    "criticality": "LOW | MEDIUM | HIGH | CRITICAL",
    "errorCode": "string (optional)",
    "scheduledAt": "string (ISO date, optional)",
    "draftId": "string (UUID, optional)"
  }
  ```
- **Response:** IncidentResponseDto with status 201
- **Error Responses:**
  - `400`: Validation error - invalid input data
  - `403`: Forbidden - user must have company and site assigned
  - `404`: Equipment not found or not accessible

#### `GET /api/incidents`

- **Description:** Get paginated list of incidents with filters
- **Authentication:** Required (JWT)
- **Roles:** Any authenticated user with company assigned
- **Query Parameters:**
  - `page` (optional): Page number
  - `limit` (optional): Items per page
  - `status` (optional): Filter by incident status
  - `criticality` (optional): Filter by criticality level
  - `siteId` (optional): Filter by site ID
- **Response:** PaginatedResponse<IncidentResponseDto>
- **Error Responses:**
  - `403`: Forbidden - user must have company assigned

#### `GET /api/incidents/:id`

- **Description:** Get incident details with complete timeline
- **Authentication:** Required (JWT)
- **Roles:** Any authenticated user with company assigned
- **Path Parameters:**
  - `id`: Incident UUID
- **Response:** IncidentDetailResponseDto with timeline events
- **Error Responses:**
  - `403`: Forbidden - user must have company assigned
  - `404`: Incident not found or not accessible
  - `422`: Validation error - invalid UUID format

## Location

Base path: `/api/location`

#### `GET /api/location/address-suggestions`

- **Description:** Get address suggestions (likely for autocomplete)
- **Authentication:** Required (JWT)
- **Query Parameters:**
  - `query` (required): Search query string
- **Response:** Array of address suggestions

## Root

#### `GET /api`

- **Description:** Health check / API welcome endpoint
- **Public:** Yes
- **Response:**
  ```json
  {
    "message": "Welcome to staamina API",
    "version": "1.0.0"
  }
  ```

## Response Format

All API responses follow a uniform format:

```json
{
  "success": true,
  "data": {},
  "pagination": null | {
    "page": 1,
    "limit": 10,
    "total": 45,
    "pageCount": 5
  },
  "error": null | {
    "code": "ErrorCode",
    "message": "Error message",
    "details": {}
  },
  "statusCode": 200,
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## Authentication

- **JWT Bearer Token:** Required for all protected endpoints
- **Token Location:** `Authorization: Bearer <token>` header
- **Public Endpoints:** Auth sign-in, callback, token exchange, login
- **Role-Based Access Control:** Uses `@Roles()` decorator with Logto roles

## Roles

- **SuperAdministrator:** Full access to all endpoints
- **Administrator:** Access to most endpoints, cannot delete critical resources
- **SiteManager:** Read access to sites, equipment, and related resources. Can create incidents.
- **SiteDirector:** Can create incidents, view categories for their company, and view equipment for their site

_Sources: Backend source code analysis (exhaustive scan)_
