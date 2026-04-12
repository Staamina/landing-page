# Analyse du Modèle Prisma des Catégories d'Équipements

## 1. Structure du Modèle Category

### Schéma Prisma

```336:351:apps/backend/prisma/schema.prisma
model Category {
  id          String   @id @default(uuid())
  name        String
  description String?
  parentId    String?
  companyId   String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  parent   Category?  @relation("CategoryHierarchy", fields: [parentId], references: [id], onDelete: SetNull)
  children Category[] @relation("CategoryHierarchy")
  company  Company?   @relation(fields: [companyId], references: [id], onDelete: SetNull)
  models   Model[]

  @@map("categories")
}
```

### Champs du Modèle

| Champ         | Type            | Contraintes                         | Description                                           |
| ------------- | --------------- | ----------------------------------- | ----------------------------------------------------- |
| `id`          | `String (UUID)` | Primary Key, Auto-généré            | Identifiant unique de la catégorie                    |
| `name`        | `String`        | Requis                              | Nom de la catégorie                                   |
| `description` | `String?`       | Optionnel                           | Description détaillée de la catégorie                 |
| `parentId`    | `String?`       | Optionnel, Foreign Key → categories | Identifiant de la catégorie parente (pour hiérarchie) |
| `companyId`   | `String?`       | Optionnel, Foreign Key → companies  | Identifiant de l'entreprise associée                  |
| `createdAt`   | `DateTime`      | Auto-généré                         | Date de création                                      |
| `updatedAt`   | `DateTime`      | Auto-généré                         | Date de dernière modification                         |

### Relations

- **`parent`** : `Category?` - Catégorie parente (auto-référence pour la hiérarchie)
- **`children`** : `Category[]` - Catégories enfants
- **`company`** : `Company?` - Entreprise associée (optionnel)
- **`models`** : `Model[]` - Modèles d'équipements associés à cette catégorie

## 2. Caractéristiques de la Hiérarchie

### Structure Hiérarchique

Le modèle supporte une **hiérarchie arborescente** via la relation `parentId` :

- Une catégorie peut avoir **un seul parent** (`parentId`)
- Une catégorie peut avoir **plusieurs enfants** (`children`)
- La hiérarchie peut avoir **plusieurs niveaux** (racine → niveau 1 → niveau 2 → ...)
- Les catégories racines ont `parentId = null`

### Validations Implémentées

Le service `CategoriesService` implémente les validations suivantes :

1. **Vérification de l'existence du parent** : Avant d'assigner un `parentId`, le système vérifie que la catégorie parente existe
2. **Prévention des références circulaires** : Une catégorie ne peut pas être son propre parent
3. **Prévention des références descendantes** : Une catégorie ne peut pas avoir comme parent l'un de ses descendants
4. **Protection à la suppression** : Une catégorie ne peut pas être supprimée si :
   - Elle a des catégories enfants
   - Elle est utilisée par des modèles d'équipements

### Comportement de Suppression

- **`onDelete: SetNull`** : Si une catégorie parente est supprimée, le `parentId` des catégories enfants est mis à `null` (elles deviennent des catégories racines)

## 3. Intégration avec les Modèles d'Équipements

### Relation Category → Model → Equipment

```
Category (1) ──→ (N) Model (1) ──→ (N) Equipment
```

- Une **Category** peut contenir plusieurs **Model**
- Un **Model** appartient à une **Category** (optionnel)
- Un **Equipment** est associé à un **Model** (optionnel)

### Types d'Équipements (EquipmentType)

Le système définit un enum `EquipmentType` avec plus de 70 types d'équipements différents, organisés en grandes familles :

- **Éclairage** : LED_SPOTLIGHT, AMBIENT_LIGHTING, LED_STRIP
- **Présentation** : WALL_HANGER, MOBILE_HANGER, MANNEQUIN, PRESENTATION_TABLE
- **Sécurité** : ANTI_THEFT_GATE, SECURITY_CAMERA, FIRE_EXTINGUISHER
- **Caisse** : CASH_REGISTER, PAYMENT_TERMINAL, BARCODE_READER
- **Stockage** : METAL_SHELVING, MODULAR_SHELVING, STORAGE_BIN
- **Technologie** : COMPUTER, PRINTER, TABLET, DIGITAL_SCREEN
- Et bien d'autres...

## 4. Multi-Tenancy

### Support Multi-Entreprise

- Le champ `companyId` permet d'associer une catégorie à une entreprise spécifique
- Les catégories peuvent être :
  - **Globales** : `companyId = null` (partagées entre toutes les entreprises)
  - **Spécifiques à une entreprise** : `companyId` défini

### Cas d'Usage

- Catégories standards partagées par toutes les entreprises
- Catégories personnalisées pour une entreprise spécifique
- Hiérarchie mixte : catégories globales avec sous-catégories spécifiques à une entreprise

## 5. API et Services

### Endpoints Disponibles

- `POST /categories` - Créer une catégorie
- `GET /categories` - Lister toutes les catégories
- `GET /categories/:id` - Obtenir une catégorie avec ses relations
- `PATCH /categories/:id` - Mettre à jour une catégorie
- `DELETE /categories/:id` - Supprimer une catégorie
- `GET /categories/company/:companyId` - Lister les catégories d'une entreprise

### Service Methods

- `create()` - Création avec validation du parent et de l'entreprise
- `findAll()` - Liste triée par nom
- `findOne()` - Détails avec relations (parent, children, company)
- `update()` - Mise à jour avec validation de la hiérarchie
- `remove()` - Suppression avec vérification des dépendances
- `findByCompany()` - Filtrage par entreprise
- `isDescendant()` - Vérification de la relation descendante (privé)

## 6. Recommandations d'Utilisation

### Structure Hiérarchique Recommandée

```
Niveau 0 (Racine)
├── Niveau 1 (Famille principale)
│   ├── Niveau 2 (Sous-famille)
│   │   └── Niveau 3 (Catégorie spécifique)
│   └── Niveau 2 (Sous-famille)
└── Niveau 1 (Famille principale)
```

### Bonnes Pratiques

1. **Nommage** : Utiliser des noms clairs et descriptifs
2. **Hiérarchie** : Limiter à 3-4 niveaux maximum pour la lisibilité
3. **Description** : Toujours remplir la description pour les catégories importantes
4. **Multi-tenancy** : Préférer les catégories globales quand possible
5. **Cohérence** : Maintenir une structure cohérente dans toute l'application
