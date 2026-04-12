# Data Models - Backend

**Generated:** 2026-01-07  
**Part:** backend  
**ORM:** Prisma  
**Database:** PostgreSQL

## Database Schema Overview

The backend uses Prisma ORM with PostgreSQL. The schema defines a comprehensive data model for managing companies, sites, equipment, users, and catalog items.

## Core Models

### User

User accounts linked to Logto authentication system.

**Table:** `users`

| Field             | Type          | Constraints                     | Description                        |
| ----------------- | ------------- | ------------------------------- | ---------------------------------- |
| id                | String (UUID) | Primary Key                     | Unique user identifier             |
| logtoId           | String        | Unique                          | Logto user ID (sub claim from JWT) |
| email             | String        | Unique                          | User email address                 |
| name              | String?       | Optional                        | User display name                  |
| createdAt         | DateTime      | Auto                            | Creation timestamp                 |
| updatedAt         | DateTime      | Auto                            | Last update timestamp              |
| companyId         | String?       | Foreign Key → companies         | Assigned company                   |
| siteId            | String?       | Foreign Key → sites             | Assigned site                      |
| serviceProviderId | String?       | Foreign Key → service_providers | Assigned service provider          |

**Relationships:**

- `roles`: UserRole[] (many-to-many with Role)
- `company`: Company? (optional)
- `site`: Site? (optional)
- `serviceProvider`: ServiceProvider? (optional)

### Role

User roles for RBAC (Role-Based Access Control).

**Table:** `roles`

| Field       | Type          | Constraints | Description                                                            |
| ----------- | ------------- | ----------- | ---------------------------------------------------------------------- |
| id          | String (UUID) | Primary Key | Unique role identifier                                                 |
| name        | String        | Unique      | Role name (e.g., "SuperAdministrator", "Administrator", "SiteManager") |
| description | String?       | Optional    | Role description                                                       |
| createdAt   | DateTime      | Auto        | Creation timestamp                                                     |
| updatedAt   | DateTime      | Auto        | Last update timestamp                                                  |

**Relationships:**

- `users`: UserRole[] (many-to-many with User)

### UserRole

Junction table for user-role many-to-many relationship.

**Table:** `user_roles`

| Field     | Type          | Constraints         | Description          |
| --------- | ------------- | ------------------- | -------------------- |
| id        | String (UUID) | Primary Key         | Unique identifier    |
| userId    | String        | Foreign Key → users | User reference       |
| roleId    | String        | Foreign Key → roles | Role reference       |
| createdAt | DateTime      | Auto                | Assignment timestamp |

**Constraints:**

- Unique constraint on `(userId, roleId)`
- Cascade delete on user/role deletion

## Location Models

### Address

Physical addresses for companies, sites, and service providers.

**Table:** `addresses`

| Field                | Type          | Constraints | Description                              |
| -------------------- | ------------- | ----------- | ---------------------------------------- |
| id                   | String (UUID) | Primary Key | Unique address identifier                |
| addressLine          | String        | Required    | Primary address line                     |
| secondAddressLine    | String?       | Optional    | Secondary address line                   |
| city                 | String        | Required    | City name                                |
| postalCode           | String        | Required    | Postal/ZIP code                          |
| country              | String        | Required    | Country name                             |
| lat                  | Float?        | Optional    | Latitude coordinate                      |
| lng                  | Float?        | Optional    | Longitude coordinate                     |
| floor                | String?       | Optional    | Floor number/identifier                  |
| commercialCenterName | String?       | Optional    | Shopping center name                     |
| department           | String?       | Optional    | Department/region                        |
| locationType         | LocationType? | Optional    | Enum: STREET, SHOPPING_MALL, RETAIL_PARK |
| createdAt            | DateTime      | Auto        | Creation timestamp                       |
| updatedAt            | DateTime      | Auto        | Last update timestamp                    |

**Relationships:**

- `companies`: Company[]
- `sites`: Site[]
- `serviceProviders`: ServiceProvider[]

## Organization Models

### Company

Companies that own sites and manage equipment.

**Table:** `companies`

| Field     | Type          | Constraints             | Description               |
| --------- | ------------- | ----------------------- | ------------------------- |
| id        | String (UUID) | Primary Key             | Unique company identifier |
| name      | String        | Required                | Company name              |
| addressId | String        | Foreign Key → addresses | Company address           |
| createdAt | DateTime      | Auto                    | Creation timestamp        |
| updatedAt | DateTime      | Auto                    | Last update timestamp     |

**Relationships:**

- `address`: Address (required)
- `sites`: Site[]
- `companyServiceProviders`: CompanyServiceProvider[]
- `users`: User[]
- `categories`: Category[]
- `models`: Model[]
- `brands`: Brand[]

### Site

Physical locations (stores, facilities) belonging to companies.

**Table:** `sites`

| Field                 | Type          | Constraints             | Description                       |
| --------------------- | ------------- | ----------------------- | --------------------------------- |
| id                    | String (UUID) | Primary Key             | Unique site identifier            |
| name                  | String        | Required                | Site name                         |
| email                 | String?       | Optional                | Site contact email                |
| internalCode          | String?       | Optional                | Internal site code                |
| addressId             | String        | Foreign Key → addresses | Site address                      |
| companyId             | String        | Foreign Key → companies | Parent company                    |
| siteType              | SiteType      | Required                | Enum: FLAGSHIP, STORE, FRANCHISE  |
| activityType          | ActivityType  | Required                | Enum: RETAIL, FOOD_SERVICES, GYM  |
| openingHours          | Json?         | Optional                | Opening hours JSON structure      |
| isCritical            | Boolean?      | Default: false          | Critical site flag                |
| isHighTrafficLocation | Boolean       | Default: false          | High traffic location flag        |
| status                | SiteStatus?   | Optional                | Enum: Open, Closed, PlanningStage |
| createdAt             | DateTime      | Auto                    | Creation timestamp                |
| updatedAt             | DateTime      | Auto                    | Last update timestamp             |

**Relationships:**

- `address`: Address (required)
- `company`: Company (required)
- `users`: User[]
- `equipment`: Equipment[]
- `siteBuilding`: SiteBuilding? (one-to-one)

### SiteBuilding

Building information for sites (floors, access, parking, etc.).

**Table:** `site_buildings`

| Field                 | Type          | Constraints                 | Description                            |
| --------------------- | ------------- | --------------------------- | -------------------------------------- |
| id                    | String (UUID) | Primary Key                 | Unique building identifier             |
| siteId                | String        | Foreign Key → sites, Unique | Associated site (one-to-one)           |
| buildingFloorsCount   | Int           | Required                    | Total number of floors                 |
| publicFloorsCount     | Int           | Required                    | Number of public floors                |
| technicalFloors       | Int?          | Optional                    | Number of technical floors             |
| isBasementPresent     | Boolean       | Default: false              | Has basement                           |
| isMezzaninePresent    | Boolean       | Default: false              | Has mezzanine                          |
| accessType            | AccessType    | Required                    | Enum: STREET, MALL, INTERNAL           |
| isStreetVisibility    | Boolean?      | Optional                    | Street visibility                      |
| isDeliveryAreaPresent | Boolean       | Default: false              | Has delivery area                      |
| isWasteAreaPresent    | Boolean       | Default: false              | Has waste area                         |
| isParkingAvailable    | Boolean       | Default: false              | Has parking                            |
| parkingType           | ParkingType?  | Optional                    | Enum: PRIVATE, SHOPPING_CENTER, PUBLIC |
| parkingSpotsCount     | Int?          | Optional                    | Number of parking spots                |
| hasFreeParking        | Boolean       | Default: false              | Free parking available                 |
| hasEvCharging         | Boolean       | Default: false              | EV charging available                  |
| hasDisabilityAccess   | Boolean       | Default: false              | Disability access                      |
| isElevatorPresent     | Boolean       | Default: false              | Has elevator                           |
| isEscalatorPresent    | Boolean       | Default: false              | Has escalator                          |
| isLoadingDockPresent  | Boolean       | Default: false              | Has loading dock                       |
| area                  | Float?        | Optional                    | Total area (square meters)             |
| salesArea             | Float?        | Optional                    | Sales area (square meters)             |
| buildingWidth         | Float?        | Optional                    | Building width (meters)                |
| buildingLength        | Float?        | Optional                    | Building length (meters)               |
| createdAt             | DateTime      | Auto                        | Creation timestamp                     |
| updatedAt             | DateTime      | Auto                        | Last update timestamp                  |

**Relationships:**

- `site`: Site (one-to-one, required)
- `floors`: Floor[]

### Floor

Floors within a site building.

**Table:** `floors`

| Field          | Type          | Constraints                  | Description             |
| -------------- | ------------- | ---------------------------- | ----------------------- |
| id             | String (UUID) | Primary Key                  | Unique floor identifier |
| number         | Int           | Required                     | Floor number            |
| height         | Float         | Required                     | Floor height (meters)   |
| siteBuildingId | String        | Foreign Key → site_buildings | Parent building         |
| createdAt      | DateTime      | Auto                         | Creation timestamp      |
| updatedAt      | DateTime      | Auto                         | Last update timestamp   |

**Constraints:**

- Unique constraint on `(siteBuildingId, number)`

**Relationships:**

- `siteBuilding`: SiteBuilding (required)
- `equipment`: Equipment[]

### ServiceProvider

Service providers that can be linked to companies.

**Table:** `service_providers`

| Field     | Type          | Constraints             | Description                        |
| --------- | ------------- | ----------------------- | ---------------------------------- |
| id        | String (UUID) | Primary Key             | Unique service provider identifier |
| name      | String        | Required                | Service provider name              |
| addressId | String        | Foreign Key → addresses | Service provider address           |
| createdAt | DateTime      | Auto                    | Creation timestamp                 |
| updatedAt | DateTime      | Auto                    | Last update timestamp              |

**Relationships:**

- `address`: Address (required)
- `companyServiceProviders`: CompanyServiceProvider[]
- `users`: User[]

### CompanyServiceProvider

Junction table for company-service provider many-to-many relationship.

**Table:** `company_service_providers`

| Field             | Type          | Constraints                     | Description                |
| ----------------- | ------------- | ------------------------------- | -------------------------- |
| id                | String (UUID) | Primary Key                     | Unique identifier          |
| companyId         | String        | Foreign Key → companies         | Company reference          |
| serviceProviderId | String        | Foreign Key → service_providers | Service provider reference |
| createdAt         | DateTime      | Auto                            | Assignment timestamp       |

**Constraints:**

- Unique constraint on `(companyId, serviceProviderId)`
- Cascade delete on company/service provider deletion

## Catalog Models

### Brand

Product brands.

**Table:** `brands`

| Field     | Type          | Constraints                       | Description             |
| --------- | ------------- | --------------------------------- | ----------------------- |
| id        | String (UUID) | Primary Key                       | Unique brand identifier |
| name      | String        | Unique                            | Brand name              |
| companyId | String?       | Foreign Key → companies, Optional | Associated company      |
| createdAt | DateTime      | Auto                              | Creation timestamp      |
| updatedAt | DateTime      | Auto                              | Last update timestamp   |

**Relationships:**

- `company`: Company? (optional)
- `models`: Model[]

### Category

Product categories with hierarchical structure.

**Table:** `categories`

| Field       | Type          | Constraints                        | Description                      |
| ----------- | ------------- | ---------------------------------- | -------------------------------- |
| id          | String (UUID) | Primary Key                        | Unique category identifier       |
| name        | String        | Required                           | Category name                    |
| description | String?       | Optional                           | Category description             |
| parentId    | String?       | Foreign Key → categories, Optional | Parent category (self-reference) |
| companyId   | String?       | Foreign Key → companies, Optional  | Associated company               |
| createdAt   | DateTime      | Auto                               | Creation timestamp               |
| updatedAt   | DateTime      | Auto                               | Last update timestamp            |

**Relationships:**

- `parent`: Category? (self-reference for hierarchy)
- `children`: Category[] (child categories)
- `company`: Company? (optional)
- `models`: Model[]

### Model

Product models linking brands, categories, and companies.

**Table:** `models`

| Field      | Type          | Constraints                        | Description             |
| ---------- | ------------- | ---------------------------------- | ----------------------- |
| id         | String (UUID) | Primary Key                        | Unique model identifier |
| name       | String        | Required                           | Model name              |
| categoryId | String?       | Foreign Key → categories, Optional | Product category        |
| companyId  | String?       | Foreign Key → companies, Optional  | Associated company      |
| brandId    | String?       | Foreign Key → brands, Optional     | Product brand           |
| createdAt  | DateTime      | Auto                               | Creation timestamp      |
| updatedAt  | DateTime      | Auto                               | Last update timestamp   |

**Relationships:**

- `category`: Category? (optional)
- `company`: Company? (optional)
- `brand`: Brand? (optional)
- `equipment`: Equipment[]

## Equipment Models

### Equipment

Physical equipment items installed at sites.

**Table:** `equipment`

| Field             | Type          | Constraints                       | Description                     |
| ----------------- | ------------- | --------------------------------- | ------------------------------- |
| id                | String (UUID) | Primary Key                       | Unique equipment identifier     |
| name              | String        | Required                          | Equipment name                  |
| type              | EquipmentType | Default: UNKNOWN                  | Equipment type enum (see below) |
| siteId            | String        | Foreign Key → sites               | Site where equipment is located |
| modelId           | String?       | Foreign Key → models, Optional    | Product model reference         |
| parentEquipmentId | String?       | Foreign Key → equipment, Optional | Parent equipment (hierarchy)    |
| floorId           | String?       | Foreign Key → floors, Optional    | Floor location                  |
| positionX         | Float?        | Optional                          | X position coordinate           |
| positionY         | Float?        | Optional                          | Y position coordinate           |
| positionZ         | Float?        | Optional                          | Z position coordinate           |
| rotationX         | Float?        | Optional                          | X rotation (degrees)            |
| rotationY         | Float?        | Optional                          | Y rotation (degrees)            |
| rotationZ         | Float?        | Optional                          | Z rotation (degrees)            |
| width             | Float?        | Optional                          | Width dimension (meters)        |
| height            | Float?        | Optional                          | Height dimension (meters)       |
| depth             | Float?        | Optional                          | Depth dimension (meters)        |
| createdAt         | DateTime      | Auto                              | Creation timestamp              |
| updatedAt         | DateTime      | Auto                              | Last update timestamp           |

**Relationships:**

- `site`: Site (required)
- `model`: Model? (optional)
- `parent`: Equipment? (self-reference for hierarchy)
- `children`: Equipment[] (child equipment)
- `floor`: Floor? (optional)
- `electricalPanel`: ElectricalPanel? (one-to-one)
- `connectedPorts`: PanelPort[] (ports connected to this equipment)

### ElectricalPanel

Electrical panels (specialized equipment type).

**Table:** `electrical_panels`

| Field       | Type          | Constraints                     | Description                                |
| ----------- | ------------- | ------------------------------- | ------------------------------------------ |
| id          | String (UUID) | Primary Key                     | Unique panel identifier                    |
| equipmentId | String        | Foreign Key → equipment, Unique | Associated equipment (one-to-one)          |
| maxAmperage | Int           | Required                        | Maximum amperage capacity                  |
| phaseType   | String        | Required                        | Phase type (e.g., "single", "three-phase") |
| createdAt   | DateTime      | Auto                            | Creation timestamp                         |
| updatedAt   | DateTime      | Auto                            | Last update timestamp                      |

**Relationships:**

- `equipment`: Equipment (one-to-one, required)
- `ports`: PanelPort[]

### PanelPort

Ports on electrical panels for connecting equipment.

**Table:** `panel_ports`

| Field                | Type          | Constraints                       | Description             |
| -------------------- | ------------- | --------------------------------- | ----------------------- |
| id                   | String (UUID) | Primary Key                       | Unique port identifier  |
| name                 | String        | Required                          | Port name/identifier    |
| portNumber           | Int           | Required                          | Port number on panel    |
| panelId              | String        | Foreign Key → electrical_panels   | Parent electrical panel |
| connectedEquipmentId | String?       | Foreign Key → equipment, Optional | Connected equipment     |
| createdAt            | DateTime      | Auto                              | Creation timestamp      |
| updatedAt            | DateTime      | Auto                              | Last update timestamp   |

**Relationships:**

- `panel`: ElectricalPanel (required)
- `connectedEquipment`: Equipment? (optional)

## Enums

### LocationType

- `STREET` - Street-facing location
- `SHOPPING_MALL` - Shopping mall location
- `RETAIL_PARK` - Retail park location

### EquipmentType

Comprehensive enum with 100+ equipment types including:

- Display equipment (WALL_HANGER, MOBILE_HANGER, ACCESSORY_DISPLAY, etc.)
- Lighting (LED_SPOTLIGHT, AMBIENT_LIGHTING, LED_STRIP, etc.)
- Storage (METAL_SHELVING, MODULAR_SHELVING, STORAGE_BIN, etc.)
- Point of Sale (CASH_REGISTER, PAYMENT_TERMINAL, etc.)
- Security (SECURITY_CAMERA, ANTI_THEFT_GATE, etc.)
- And many more...

### AccessType

- `STREET` - Street access
- `MALL` - Mall access
- `INTERNAL` - Internal access

### ParkingType

- `PRIVATE` - Private parking
- `SHOPPING_CENTER` - Shopping center parking
- `PUBLIC` - Public parking

### SiteType

- `FLAGSHIP` - Flagship store
- `STORE` - Regular store
- `FRANCHISE` - Franchise location

### ActivityType

- `RETAIL` - Retail activity
- `FOOD_SERVICES` - Food services
- `GYM` - Gym/fitness

### SiteStatus

- `Open` - Site is open
- `Closed` - Site is closed
- `PlanningStage` - Site in planning stage

## Relationships Summary

### Hierarchical Structures

- **Categories**: Self-referential parent-child hierarchy
- **Equipment**: Self-referential parent-child hierarchy (for equipment assemblies)

### One-to-One Relationships

- Site ↔ SiteBuilding (one site has one building)
- Equipment ↔ ElectricalPanel (equipment can have one electrical panel)

### One-to-Many Relationships

- Company → Sites
- Company → Users
- Site → Equipment
- SiteBuilding → Floors
- Floor → Equipment
- ElectricalPanel → PanelPorts
- Brand → Models
- Category → Models
- Model → Equipment

### Many-to-Many Relationships

- User ↔ Role (via UserRole junction table)
- Company ↔ ServiceProvider (via CompanyServiceProvider junction table)

## Migration Strategy

- **Prisma Migrations**: Located in `apps/backend/prisma/migrations/`
- **Migration Files**: SQL files with incremental schema changes
- **Migration History**: Tracked in `_prisma_migrations` table

_Sources: Prisma schema.prisma (exhaustive scan)_
