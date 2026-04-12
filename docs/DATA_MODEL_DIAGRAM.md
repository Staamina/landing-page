# Diagramme architectural du modèle de données

Ce document présente le diagramme ER (Entity-Relationship) du modèle de données de l'application Staamina.

## Modèle de données

```mermaid
---
config:
  layout: elk
---
erDiagram
    User {
        string id PK
        string logtoId UK
        string email UK
        string name
        datetime createdAt
        datetime updatedAt
        string companyId FK
        string siteId FK
        string serviceProviderId FK
    }

    Role {
        string id PK
        string name UK
        string description
        datetime createdAt
        datetime updatedAt
    }

    UserRole {
        string id PK
        string userId FK
        string roleId FK
        datetime createdAt
    }

    Address {
        string id PK
        string addressLine
        string secondAddressLine
        string city
        string postalCode
        string country
        string department "nullable"
        string floor "nullable"
        string commercialCenterName "nullable"
        string locationType "Enum: STREET, SHOPPING_MALL, RETAIL_PARK - nullable"
        float lat "nullable"
        float lng "nullable"
        datetime createdAt
        datetime updatedAt
    }

    Company {
        string id PK
        string name
        string addressId FK
        datetime createdAt
        datetime updatedAt
    }

    Site {
        string id PK
        string name
        string addressId FK
        string companyId FK
        datetime createdAt
        datetime updatedAt
    }

    SiteBuilding {
        string id PK
        string siteId FK UK
        int buildingFloorsCount
        int publicFloorsCount
        int technicalFloors "nullable"
        boolean isBasementPresent
        boolean isMezzaninePresent
        string accessType "Enum: STREET, MALL, INTERNAL"
        boolean isStreetVisibility "nullable"
        boolean isDeliveryAreaPresent
        boolean isWasteAreaPresent
        boolean isParkingAvailable
        string parkingType "Enum: PRIVATE, SHOPPING_CENTER, PUBLIC - nullable"
        int parkingSpotsCount "nullable"
        boolean hasFreeParking
        boolean hasEvCharging
        boolean hasDisabilityAccess
        boolean isElevatorPresent
        boolean isEscalatorPresent
        boolean isLoadingDockPresent
        float area "nullable"
        float salesArea "nullable"
        datetime createdAt
        datetime updatedAt
    }

    Equipment {
        string id PK
        string name
        string type "Enum: UNKNOWN, ELECTRICAL_PANEL, etc"
        string siteId FK
        string modelId FK
        string parentEquipmentId FK
    }

    ElectricalPanel {
        string id PK
        string equipmentId FK
        int maxAmperage
        string phaseType
    }

    PanelPort {
        string id PK
        string name
        int portNumber
        string panelId FK
        string connectedEquipmentId FK
    }

    Model {
        string id PK
        string name
        string categoryId FK
        string companyId FK
        string brandId FK
    }

    Category {
        string id PK
        string name
        string description
        string parentId FK
        string companyId FK
    }

    Brand {
        string id PK
        string name
    }

    ServiceProvider {
        string id PK
        string name
        string addressId FK
        datetime createdAt
        datetime updatedAt
    }

    CompanyServiceProvider {
        string id PK
        string companyId FK
        string serviceProviderId FK
        datetime createdAt
    }

    User ||--o{ UserRole : has
    Role ||--o{ UserRole : assigned_to
    User }o--o| Company : belongs_to
    User }o--o| Site : works_at
    User }o--o| ServiceProvider : works_for

    Address ||--o{ Company : locates
    Address ||--o{ Site : locates
    Address ||--o{ ServiceProvider : locates

    Company ||--o{ CompanyServiceProvider : contracts
    ServiceProvider ||--o{ CompanyServiceProvider : serves

    Company ||--o{ Site : owns
    Company ||--o{ User : employs

    Site ||--o{ Equipment : houses
    Site ||--o| SiteBuilding : has

    Category ||--o{ Category : contains
    Category ||--o{ Model : classifies
    Brand ||--o{ Model   : manufactures
    Model ||--o{ Equipment : instantiates

    Equipment ||--o{ Equipment : contains
    Equipment ||--|| ElectricalPanel : extends
    ElectricalPanel ||--o{ PanelPort : has
    PanelPort |o--o| Equipment : powers

```

## Description des entités

### User

Représente les utilisateurs du système avec authentification via Logto.

- **logtoId** : Identifiant unique de l'utilisateur dans Logto (sub)
- **email** : Adresse email unique
- Un utilisateur peut être assigné à une Company, un Site, ou un ServiceProvider (optionnel)
- Relation many-to-many avec Role via UserRole

### Role

Définit les rôles système (SuperAdministrator, Administrator, etc.)

- **name** : Nom unique du rôle
- **description** : Description optionnelle du rôle

### UserRole

Table de jonction pour la relation many-to-many entre User et Role.

- Contrainte unique sur (userId, roleId)
- Suppression en cascade si User ou Role est supprimé

### Address

Adresses partagées par plusieurs entités (Company, Site, ServiceProvider).

- **addressLine** : Ligne d'adresse principale
- **secondAddressLine** : Ligne d'adresse secondaire (optionnelle)
- **city** : Ville
- **postalCode** : Code postal
- **country** : Pays
- **department** : Département (optionnel)
- **floor** : Étage (optionnel)
- **commercialCenterName** : Nom du centre commercial (optionnel)
- **locationType** : Type de localisation (STREET, SHOPPING_MALL, RETAIL_PARK)
- **lat** : Latitude (optionnel)
- **lng** : Longitude (optionnel)

### Company

Entreprises clientes du système.

- **name** : Nom de l'entreprise
- Possède une adresse (Address)
- Peut posséder plusieurs Sites
- Peut contracter plusieurs ServiceProviders via CompanyServiceProvider (relation many-to-many)
- Peut employer plusieurs Users
- Peut avoir plusieurs Categories et Models

### Site

Sites appartenant à une entreprise.

- **name** : Nom du site
- Possède une adresse (Address)
- Appartient à une Company (suppression en cascade)
- Peut avoir plusieurs Users assignés
- Peut contenir plusieurs Equipment
- Peut avoir un SiteBuilding (relation 0 ou 1)

### SiteBuilding

Informations détaillées sur le bâtiment d'un site.

- **buildingFloorsCount** : Nombre total d'étages du bâtiment
- **publicFloorsCount** : Nombre d'étages publics
- **technicalFloors** : Nombre d'étages techniques (optionnel)
- **isBasementPresent** : Présence d'un sous-sol
- **isMezzaninePresent** : Présence d'un mezzanine
- **accessType** : Type d'accès (STREET, MALL, INTERNAL)
- **isStreetVisibility** : Visibilité depuis la rue (optionnel)
- **isDeliveryAreaPresent** : Présence d'une zone de livraison
- **isWasteAreaPresent** : Présence d'une zone de déchets
- **isParkingAvailable** : Disponibilité de parking
- **parkingType** : Type de parking (PRIVATE, SHOPPING_CENTER, PUBLIC) (optionnel)
- **parkingSpotsCount** : Nombre de places de parking (optionnel)
- **hasFreeParking** : Parking gratuit disponible
- **hasEvCharging** : Bornes de recharge électrique disponibles
- **hasDisabilityAccess** : Accès pour personnes handicapées
- **isElevatorPresent** : Présence d'un ascenseur
- **isEscalatorPresent** : Présence d'un escalator
- **isLoadingDockPresent** : Présence d'un quai de chargement
- **area** : Surface totale en m² (optionnel)
- **salesArea** : Surface de vente en m² (optionnel)
- Relation 0 ou 1 avec Site (suppression en cascade)

### ServiceProvider

Prestataires de service.

- **name** : Nom du prestataire
- Possède une adresse (Address)
- Peut être lié à plusieurs Companies via CompanyServiceProvider (relation many-to-many)
- Peut avoir plusieurs Users assignés

### CompanyServiceProvider

Table de jonction pour la relation many-to-many entre Company et ServiceProvider.

- Contrainte unique sur (companyId, serviceProviderId)
- Permet à un ServiceProvider de travailler pour plusieurs Companies

### Equipment

Équipements installés sur les sites.

- **name** : Nom de l'équipement
- **type** : Type d'équipement (UNKNOWN, ELECTRICAL_PANEL, etc.)
- Appartient à un Site
- Peut être lié à un Model
- Peut avoir un parent Equipment (hiérarchie)
- Peut avoir plusieurs enfants Equipment
- Peut avoir un ElectricalPanel (relation 1:1)
- Peut être connecté à plusieurs PanelPort

### ElectricalPanel

Panneau électrique, extension spécialisée d'Equipment.

- **maxAmperage** : Ampérage maximum
- **phaseType** : Type de phase (ex: "3-phase")
- Relation 1:1 avec Equipment
- Peut avoir plusieurs PanelPort

### PanelPort

Ports d'un panneau électrique.

- **name** : Nom du port
- **portNumber** : Numéro du port
- Appartient à un ElectricalPanel
- Peut être connecté à un Equipment (optionnel)

### Model

Modèles d'équipements.

- **name** : Nom du modèle
- Peut être lié à une Category
- Peut être lié à une Company
- Peut être lié à une Brand
- Peut être utilisé par plusieurs Equipment

### Category

Catégories hiérarchiques d'équipements.

- **name** : Nom de la catégorie
- **description** : Description (optionnelle)
- Peut avoir un parent Category (hiérarchie)
- Peut avoir plusieurs enfants Category
- Peut être liée à une Company (optionnel)
- Peut classifier plusieurs Model

### Brand

Marques d'équipements.

- **name** : Nom de la marque (unique)
- Peut fabriquer plusieurs Model

## Relations et contraintes

### Relations User

- **User ↔ Role** : Many-to-many via UserRole (Cascade)
- **User → Company** : Many-to-one, optionnel (SetNull)
- **User → Site** : Many-to-one, optionnel (SetNull)
- **User → ServiceProvider** : Many-to-one, optionnel (SetNull)

### Relations Address

- **Address → Company** : One-to-many (Restrict)
- **Address → Site** : One-to-many (Restrict)
- **Address → ServiceProvider** : One-to-many (Restrict)

### Relations Company

- **Company → Site** : One-to-many (Cascade)
- **Company ↔ ServiceProvider** : Many-to-many via CompanyServiceProvider (Cascade)
- **Company → User** : One-to-many
- **Company → Category** : One-to-many (SetNull)
- **Company → Model** : One-to-many (SetNull)

### Relations Site

- **Site → Equipment** : One-to-many (Cascade)
- **Site → SiteBuilding** : One-to-one, optionnel (Cascade)

### Relations Equipment

- **Site → Equipment** : One-to-many (Cascade)
- **Model → Equipment** : One-to-many (SetNull)
- **Equipment → Equipment** : Auto-référence pour hiérarchie (SetNull)
- **Equipment → ElectricalPanel** : One-to-one (Cascade)
- **PanelPort → Equipment** : Many-to-one, optionnel (SetNull)

### Relations Model

- **Category → Model** : One-to-many (SetNull)
- **Brand → Model** : One-to-many (SetNull)

### Relations Category

- **Category → Category** : Auto-référence pour hiérarchie (SetNull)

## Contraintes de suppression

- **Cascade** : La suppression de l'entité parent supprime automatiquement les entités enfants
  - User/Role → UserRole
  - Company → Site
  - Site → Equipment
  - Site → SiteBuilding
  - Equipment → ElectricalPanel
  - ElectricalPanel → PanelPort
  - Company ↔ ServiceProvider (via CompanyServiceProvider)

- **SetNull** : La suppression de l'entité parent met à null la clé étrangère dans les entités enfants
  - Company → User (companyId)
  - Site → User (siteId)
  - ServiceProvider → User (serviceProviderId)
  - Company → Category (companyId)
  - Company → Model (companyId)
  - Category → Category (parentId)
  - Category → Model (categoryId)
  - Brand → Model (brandId)
  - Model → Equipment (modelId)
  - Equipment → Equipment (parentEquipmentId)
  - PanelPort → Equipment (connectedEquipmentId)

- **Restrict** : Empêche la suppression de l'entité parent si des entités enfants existent
  - Address → Company
  - Address → Site
  - Address → ServiceProvider
