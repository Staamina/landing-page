# Template de Référentiel des Catégories d'Équipements

## Structure du Template

Ce template fournit une structure hiérarchique complète pour organiser les catégories d'équipements dans le système Staamina.

### Colonnes du Template

| Colonne                 | Type                  | Description                                                 | Exemple                          |
| ----------------------- | --------------------- | ----------------------------------------------------------- | -------------------------------- |
| `id`                    | String (UUID ou Code) | Identifiant unique de la catégorie                          | `CAT-001`                        |
| `parentId`              | String?               | Identifiant de la catégorie parente (null pour les racines) | `CAT-ROOT-001` ou `null`         |
| `name`                  | String                | Nom de la catégorie                                         | `Lighting Equipment`             |
| `description`           | String?               | Description détaillée                                       | `All lighting-related equipment` |
| `level`                 | Number                | Niveau dans la hiérarchie (0 = racine)                      | `0`, `1`, `2`, `3`               |
| `exampleEquipmentTypes` | String                | Types d'équipements associés (séparés par virgule)          | `LED_SPOTLIGHT,LED_STRIP`        |
| `companyId`             | String?               | ID de l'entreprise (null pour global)                       | UUID ou `null`                   |

## Hiérarchie Proposée

### Niveau 0 : Catégorie Racine

```
Equipment Categories (CAT-ROOT-001)
├── Toutes les catégories d'équipements
```

### Niveau 1 : Familles Principales

1. **Lighting Equipment** (CAT-001) - Équipements d'éclairage
2. **Display & Presentation** (CAT-002) - Présentation et affichage
3. **Security Equipment** (CAT-003) - Sécurité
4. **Point of Sale** (CAT-004) - Point de vente
5. **Storage & Organization** (CAT-005) - Stockage et organisation
6. **Technology & IT** (CAT-006) - Technologie et IT
7. **Maintenance & Operations** (CAT-007) - Maintenance et opérations
8. **Specialized Equipment** (CAT-008) - Équipements spécialisés
9. **Digital & Media** (CAT-009) - Numérique et média
10. **Electrical Infrastructure** (CAT-010) - Infrastructure électrique
11. **Facilities & Amenities** (CAT-011) - Installations et commodités
12. **Specialized Retail** (CAT-012) - Commerce spécialisé
13. **Communication & Monitoring** (CAT-013) - Communication et surveillance
14. **Environmental Control** (CAT-014) - Contrôle environnemental
15. **Specialized Facilities** (CAT-015) - Installations spécialisées
16. **Mirrors** (CAT-016) - Miroirs

## Exemples Concrets par Catégorie

### 1. Lighting Equipment (CAT-001)

**Sous-catégories :**

- **LED Lighting** (CAT-001-001)
  - Types : `LED_SPOTLIGHT`, `LED_STRIP`
  - Exemples : Spots LED, bandeaux LED, éclairage d'ambiance LED

- **Ambient Lighting** (CAT-001-002)
  - Types : `AMBIENT_LIGHTING`
  - Exemples : Éclairage d'ambiance général, éclairage indirect

### 2. Display & Presentation (CAT-002)

**Sous-catégories :**

- **Hanging Systems** (CAT-002-001)
  - Types : `WALL_HANGER`, `MOBILE_HANGER`
  - Exemples : Portants muraux, portants mobiles, cintres

- **Mannequins & Displays** (CAT-002-002)
  - Types : `MANNEQUIN`, `VALET`, `ACCESSORY_DISPLAY`
  - Exemples : Mannequins complets, valets, présentoirs d'accessoires

- **Tables & Surfaces** (CAT-002-003)
  - Types : `PRESENTATION_TABLE`
  - Exemples : Tables de présentation, comptoirs d'exposition

### 3. Security Equipment (CAT-003)

**Sous-catégories :**

- **Anti-Theft Systems** (CAT-003-001)
  - Types : `ANTI_THEFT_GATE`, `ANTI_THEFT_TAG`, `TAG_DEACTIVATOR`
  - Exemples : Portiques antivol, étiquettes antivol, désactivateurs

- **Surveillance Systems** (CAT-003-002)
  - Types : `SECURITY_CAMERA`, `DVR`
  - Exemples : Caméras de surveillance, enregistreurs vidéo

- **Safety Equipment** (CAT-003-003)
  - Types : `FIRE_EXTINGUISHER`, `SMOKE_DETECTOR`, `INTRUSION_ALARM`
  - Exemples : Extincteurs, détecteurs de fumée, alarmes d'intrusion

### 4. Point of Sale (CAT-004)

**Sous-catégories :**

- **Payment Processing** (CAT-004-001)
  - Types : `PAYMENT_TERMINAL`, `CONTACTLESS_PAYMENT_TERMINAL`
  - Exemples : Terminaux de paiement, terminaux sans contact

- **Register Systems** (CAT-004-002)
  - Types : `CASH_REGISTER`, `CASH_DRAWER`
  - Exemples : Caisses enregistreuses, tiroirs-caisses

- **Peripheral Devices** (CAT-004-003)
  - Types : `BARCODE_READER`, `RECEIPT_PRINTER`
  - Exemples : Lecteurs de codes-barres, imprimantes de tickets

- **Additional Services** (CAT-004-004)
  - Types : `LOYALTY_SYSTEM`, `SAFE`
  - Exemples : Systèmes de fidélité, coffres-forts

### 5. Storage & Organization (CAT-005)

**Sous-catégories :**

- **Shelving Systems** (CAT-005-001)
  - Types : `METAL_SHELVING`, `MODULAR_SHELVING`
  - Exemples : Étagères métalliques, systèmes d'étagères modulaires

- **Storage Containers** (CAT-005-002)
  - Types : `STORAGE_BIN`
  - Exemples : Bacs de stockage, conteneurs

- **Work Surfaces** (CAT-005-003)
  - Types : `UNPACKING_TABLE`, `SORTING_CART`
  - Exemples : Tables de déballage, chariots de tri

### 6. Technology & IT (CAT-006)

**Sous-catégories :**

- **Hardware** (CAT-006-001)
  - Types : `COMPUTER`, `PRINTER`, `PHONE`, `TABLET`
  - Exemples : Ordinateurs, imprimantes, téléphones, tablettes

- **Software Solutions** (CAT-006-002)
  - Types : `ACCOUNTING_SOFTWARE`, `STOCK_MANAGEMENT_SOFTWARE`, `INTERNAL_MESSAGING_SOFTWARE`
  - Exemples : Logiciels de comptabilité, gestion de stock, messagerie interne

### 7. Maintenance & Operations (CAT-007)

**Sous-catégories :**

- **Cleaning Equipment** (CAT-007-001)
  - Types : `VACUUM_CLEANER`, `STEAM_CLEANER`
  - Exemples : Aspirateurs, nettoyeurs vapeur

- **Garment Care** (CAT-007-002)
  - Types : `STEAM_IRON`
  - Exemples : Fers à repasser vapeur, centrales vapeur

- **Waste Management** (CAT-007-003)
  - Types : `WASTE_BIN`, `RECYCLING_BIN`, `WASTE_COMPACTOR`
  - Exemples : Poubelles, bacs de recyclage, compacteurs

### 8. Specialized Equipment (CAT-008)

**Sous-catégories :**

- **Fitting Rooms** (CAT-008-001)
  - Types : `FITTING_ROOM`, `FITTING_ROOM_BENCH`
  - Exemples : Cabines d'essayage, bancs d'essayage

- **Customer Service** (CAT-008-002)
  - Types : `CALL_SYSTEM`, `ACCESS_RAMP`
  - Exemples : Systèmes d'appel, rampes d'accès

- **Workshop Equipment** (CAT-008-003)
  - Types : `SEWING_MACHINE`
  - Exemples : Machines à coudre, équipements d'atelier

### 9. Digital & Media (CAT-009)

**Sous-catégories :**

- **Digital Displays** (CAT-009-001)
  - Types : `DIGITAL_SCREEN`, `VIDEO_PROJECTOR`
  - Exemples : Écrans numériques, vidéoprojecteurs

- **Audio Systems** (CAT-009-002)
  - Types : `SOUND_SYSTEM`
  - Exemples : Systèmes audio, enceintes

- **Print Media** (CAT-009-003)
  - Types : `BANNER`, `PROMOTIONAL_POSTER`
  - Exemples : Bannières, affiches promotionnelles

### 10. Electrical Infrastructure (CAT-010)

**Sous-catégories :**

- **Power Distribution** (CAT-010-001)
  - Types : `ELECTRICAL_PANEL`
  - Exemples : Tableaux électriques, panneaux de distribution

### 11. Facilities & Amenities (CAT-011)

**Sous-catégories :**

- **Kitchen Equipment** (CAT-011-001)
  - Types : `COFFEE_MACHINE`, `REFRIGERATOR`, `MICROWAVE`, `DRINK_DISPENSER`
  - Exemples : Machines à café, réfrigérateurs, micro-ondes, distributeurs de boissons

- **Storage Facilities** (CAT-011-002)
  - Types : `LOCKER`
  - Exemples : Casiers, vestiaires

### 12. Specialized Retail (CAT-012)

**Sous-catégories :**

- **Customer Tools** (CAT-012-001)
  - Types : `SHOPPING_CART`, `INTERACTIVE_KIOSK`
  - Exemples : Chariots de courses, kiosques interactifs

- **Product Display** (CAT-012-002)
  - Types : `DISPLAY_CASE`, `PRICE_TAG`
  - Exemples : Vitrines, étiquettes de prix

### 13. Communication & Monitoring (CAT-013)

**Sous-catégories :**

- **Communication Devices** (CAT-013-001)
  - Types : `WALKIE_TALKIE`
  - Exemples : Talkies-walkies, radios

- **Photography Equipment** (CAT-013-002)
  - Types : `CAMERA`, `PHOTO_EDITING_SOFTWARE`
  - Exemples : Caméras, logiciels de retouche photo

### 14. Environmental Control (CAT-014)

**Sous-catégories :**

- **Climate Control** (CAT-014-001)
  - Types : `AIR_CONDITIONING`
  - Exemples : Climatisation, ventilation

### 15. Specialized Facilities (CAT-015)

**Sous-catégories :**

- **Recreation Areas** (CAT-015-001)
  - Types : `RUNNING_TRACK`, `PLAY_AREA`
  - Exemples : Pistes de course, aires de jeu

### 16. Mirrors (CAT-016)

**Sous-catégories :**

- **Floor Mirrors** (CAT-016-001)
  - Types : `FLOOR_MIRROR`
  - Exemples : Miroirs au sol, miroirs debout

- **Wall Mirrors** (CAT-016-002)
  - Types : `WALL_MIRROR`
  - Exemples : Miroirs muraux

## Guide d'Utilisation du Template

### 1. Importation des Données

Le fichier CSV (`category-repository-template.csv`) peut être utilisé pour :

- **Import manuel** : Création des catégories via l'API
- **Import automatisé** : Script de seed pour initialiser la base de données
- **Référence** : Documentation pour les administrateurs

### 2. Personnalisation par Entreprise

Pour créer des catégories spécifiques à une entreprise :

1. Copier la structure de base
2. Modifier le `companyId` avec l'UUID de l'entreprise
3. Adapter les noms et descriptions selon les besoins
4. Ajouter des sous-catégories supplémentaires si nécessaire

### 3. Extension de la Hiérarchie

Pour ajouter de nouveaux niveaux :

1. Identifier la catégorie parente
2. Utiliser son `id` comme `parentId`
3. Créer un nouvel `id` unique (ex: `CAT-001-001-001`)
4. Incrémenter le `level` de 1

### 4. Mapping avec EquipmentType

Chaque catégorie peut être associée à un ou plusieurs types d'équipements de l'enum `EquipmentType`. Cette association est documentée dans la colonne `exampleEquipmentTypes` du template CSV.

## Exemples d'Utilisation

### Exemple 1 : Créer une Catégorie Racine

```json
{
  "name": "Equipment Categories",
  "description": "Root category for all equipment classifications",
  "parentId": null,
  "companyId": null
}
```

### Exemple 2 : Créer une Sous-Catégorie

```json
{
  "name": "LED Lighting",
  "description": "LED-based lighting solutions",
  "parentId": "CAT-001",
  "companyId": null
}
```

### Exemple 3 : Catégorie Spécifique à une Entreprise

```json
{
  "name": "Custom Display Systems",
  "description": "Company-specific display equipment",
  "parentId": "CAT-002",
  "companyId": "550e8400-e29b-41d4-a716-446655440000"
}
```

## Notes Importantes

1. **Identifiants** : Les IDs dans le template CSV sont des exemples. En production, utilisez des UUIDs générés automatiquement
2. **Hiérarchie** : Respectez la structure parent-enfant pour éviter les références circulaires
3. **Validation** : Le système valide automatiquement l'existence des parents et prévient les références circulaires
4. **Suppression** : Une catégorie ne peut être supprimée que si elle n'a pas d'enfants et n'est pas utilisée par des modèles
