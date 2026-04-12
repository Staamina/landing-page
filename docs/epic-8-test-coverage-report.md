# Rapport de couverture tests – Epic 8 (changements en cours)

**Date :** 2026-02-09  
**Branche :** epic-8  
**Périmètre :** fichiers modifiés/ajoutés (git status)

---

## 1. Résumé exécutif

| Zone                             | Tests unitaires                              | Tests d'intégration | Couverture %    | Statut exécution                                                                              |
| -------------------------------- | -------------------------------------------- | ------------------- | --------------- | --------------------------------------------------------------------------------------------- |
| **Backend (super-admin + auth)** | 2 specs (controller + service) + 1 spec auth | 1 spec intégration  | Non mesurable\* | Unitaires : ✅ Passent. Intégration : ❌ DB indisponible. Coverage : ❌ Erreur Jest/istanbul. |
| **Backend (core auth)**          | 1 spec (SuperAdminAuditService)              | —                   | —               | ✅ Passent                                                                                    |
| **Headquarter (frontend)**       | 0 spec sur les fichiers epic-8               | —                   | 0 %             | test:coverage : ❌ Dépendance manquante (@vitest/coverage-v8)                                 |

\* La commande `test:cov` échoue avec une erreur globale Jest/istanbul (`The "original" argument must be of type function`), donc aucun pourcentage de couverture n’a pu être collecté pour le backend.

---

## 2. Backend – inventaire des fichiers et des tests

### 2.1 Fichiers modifiés/ajoutés (epic-8)

#### Module `super-admin`

| Fichier                                     | Type       | Test unitaire                       | Test intégration                                         |
| ------------------------------------------- | ---------- | ----------------------------------- | -------------------------------------------------------- |
| `super-admin.controller.ts`                 | Controller | ✅ `super-admin.controller.spec.ts` | ✅ `__tests__/super-admin.integration.spec.ts` (metrics) |
| `super-admin.service.ts`                    | Service    | ✅ `super-admin.service.spec.ts`    | Couvert indirectement (appelé par controller)            |
| `super-admin-companies.service.ts`          | Service    | ❌ Aucun                            | ❌ Aucun                                                 |
| `super-admin-companies.controller.ts`       | Controller | ❌ Aucun                            | ❌ Aucun                                                 |
| `super-admin-company-context.service.ts`    | Service    | ❌ Aucun                            | ❌ Aucun                                                 |
| `super-admin-test-users.service.ts`         | Service    | ❌ Aucun                            | ❌ Aucun                                                 |
| `super-admin-test-users.controller.ts`      | Controller | ❌ Aucun                            | ❌ Aucun                                                 |
| `super-admin-standard-data.controller.ts`   | Controller | ❌ Aucun                            | ❌ Aucun                                                 |
| `super-admin.module.ts`                     | Module     | ❌ Aucun                            | —                                                        |
| DTOs (company-context, standard-data, etc.) | DTO        | ❌ Aucun                            | —                                                        |

#### Core auth

| Fichier                           | Type        | Test unitaire                          | Test intégration |
| --------------------------------- | ----------- | -------------------------------------- | ---------------- |
| `super-admin-write.guard.ts`      | Guard       | ❌ Aucun                               | —                |
| `super-admin-read.interceptor.ts` | Interceptor | ❌ Aucun                               | —                |
| `super-admin-audit.service.ts`    | Service     | ✅ `super-admin-audit.service.spec.ts` | —                |

### 2.2 Détail des specs existantes (backend)

- **super-admin.controller.spec.ts**
  - Controller seul, mocks pour `SuperAdminService` et `SuperAdminAuditService`.
  - Cas : `getMetrics` (retour métriques, audit VIEW_METRICS, fallback `user.sub`).
  - Ne couvre pas les sous-controllers (companies, test-users, standard-data) ni les autres routes.

- **super-admin.service.spec.ts**
  - Service métriques seul (Prisma + RateLimit mockés).
  - Cas : cache hit, cache miss + calcul + TTL config.

- **super-admin.integration.spec.ts**
  - App Nest + DB (Prisma).
  - Cas : `GET /api/v1/super-admin/metrics` (401 sans auth, 403 non SuperAdmin, 200 + body pour SuperAdmin).
  - Échoue si la base n’est pas disponible (ex. `Can't reach database server at 127.0.0.1:15432`).

- **super-admin-audit.service.spec.ts**
  - Unité : log d’actions avec champs requis/optionnels et résilience si `create` échoue.

### 2.3 Calcul couverture backend (épic-8)

- **Fichiers “métier” super-admin (hors DTOs/module)**
  - Avec test unitaire et/ou intégration : `super-admin.controller.ts`, `super-admin.service.ts`, `super-admin-audit.service.ts` (3 fichiers).
  - Sans test dédié : `super-admin-companies.service.ts`, `super-admin-companies.controller.ts`, `super-admin-company-context.service.ts`, `super-admin-test-users.service.ts`, `super-admin-test-users.controller.ts`, `super-admin-standard-data.controller.ts` (6 fichiers), plus guards/interceptors (2 fichiers).

- **Couverture en nombre de fichiers (ordre de grandeur)**
  - Fichiers avec au moins un test les exerçant : **3** (controller principal, service métriques, audit).
  - Fichiers sans test : **8** (companies, company-context, test-users, standard-data, guard, interceptor).
  - **Taux “fichiers couverts” ≈ 3 / (3 + 8) ≈ 27 %** pour le périmètre epic-8 backend (hors DTOs).

- **Couverture en lignes/fonctions**
  - Non disponible tant que `pnpm --filter backend test:cov` échoue (erreur istanbul).

---

## 3. Headquarter (frontend) – inventaire

### 3.1 Fichiers modifiés/ajoutés (epic-8)

Tous les fichiers listés dans le git status (contextes, hooks, services, composants, pages SuperAdmin, etc.) **n’ont pas de fichier de test associé** dans le périmètre epic-8.

- Un seul test trouvé dans l’app : `CompanyForm/CompanyForm.test.tsx` (hors périmètre epic-8).
- **Couverture epic-8 frontend : 0 %** (aucun test sur les nouveaux fichiers).

### 3.2 Exécution

- `pnpm --filter headquarter-system test:coverage` échoue : dépendance manquante `@vitest/coverage-v8`.
- Après ajout de la dépendance, il faudra relancer pour obtenir un rapport de couverture global (y compris hors epic-8).

---

## 4. Résultats d’exécution (séance du 2026-02-09)

| Commande                                         | Résultat                                                                                     |
| ------------------------------------------------ | -------------------------------------------------------------------------------------------- |
| `pnpm --filter backend test:unit`                | ✅ 25 suites, 382 tests passent (dont super-admin + super-admin-audit)                       |
| `pnpm --filter backend test:cov`                 | ❌ Échec (erreur Jest/istanbul sur instrumentation), rapport “All files \| 0 \| 0 \| 0 \| 0” |
| `pnpm --filter backend test:integration`         | ❌ 148 failed, 11 passed (DB non joignable pour super-admin et autres)                       |
| `pnpm --filter headquarter-system test:coverage` | ❌ Dépendance manquante `@vitest/coverage-v8`                                                |

---

## 5. Recommandations

1. **Backend – couverture**
   - Corriger l’erreur Jest/istanbul (ou désactiver temporairement l’instrumentation) pour pouvoir lancer `test:cov` et obtenir des % réels.
   - Ajouter des tests unitaires (ou intégration) pour :
     - `super-admin-companies.service.ts` / `super-admin-companies.controller.ts`
     - `super-admin-company-context.service.ts`
     - `super-admin-test-users.service.ts` / `super-admin-test-users.controller.ts`
     - `super-admin-standard-data.controller.ts`
     - `super-admin-write.guard.ts`, `super-admin-read.interceptor.ts`

2. **Backend – intégration**
   - Lancer les tests d’intégration avec une base disponible (ex. Docker sur 127.0.0.1:15432 ou CI) pour valider `super-admin.integration.spec.ts`.

3. **Frontend**
   - Ajouter `@vitest/coverage-v8` (ou équivalent) pour pouvoir exécuter `test:coverage`.
   - Ajouter des tests (unitaires ou composant) pour au moins les hooks/services et composants critiques epic-8 (ex. `useCompanyContext`, `useStandardDataContext`, `SuperAdminCompanyForm`, pages SuperAdmin).

4. **Suivi**
   - Refaire ce calcul après correction de Jest/istanbul et ajout de `@vitest/coverage-v8`, puis après ajout des tests manquants.
