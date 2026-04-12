# 🎨 Analyse et Proposition - Design System Staamina

## 📋 Ce qui a été fait

### ✅ Analyse Complète du Projet

J'ai analysé votre monorepo Staamina et identifié :

1. **4 configurations Tailwind** dans :
   - `packages/ui/tailwind.config.js`
   - `apps/landing-page/tailwind.config.ts`
   - `apps/headquarter-system/tailwind.config.js`
   - `apps/field-maintenance-system/tailwind.config.js`

2. **3 fichiers CSS avec variables dupliquées** :
   - `packages/ui/src/storybook.css`
   - `apps/landing-page/src/app/globals.css`
   - `apps/headquarter-system/src/index.css`

3. **Problèmes identifiés** :
   - Duplication de code
   - Mélange de niveaux d'abstraction
   - Pas de source unique de vérité
   - Incohérence HEX vs HSL
   - Pas de documentation

### ✅ Architecture Proposée

**Système en 3 couches** inspiré des meilleures pratiques (Material Design, Radix, Chakra UI) :

```
COMPONENT TOKENS (Couche 3)
    ↓ référence
SEMANTIC TOKENS (Couche 2)
    ↓ référence
PRIMITIVE TOKENS (Couche 1)
```

### ✅ Fichiers Créés

| Fichier                                 | Description                          |
| --------------------------------------- | ------------------------------------ |
| **Documentation**                       |
| `docs/design-system-architecture.md`    | Documentation complète (600+ lignes) |
| `docs/design-system-summary.md`         | Résumé exécutif                      |
| **Tokens**                              |
| `packages/ui/src/tokens/primitives.css` | Couche 1 : Palette de couleurs brute |
| `packages/ui/src/tokens/semantic.css`   | Couche 2 : Tokens métier + dark mode |
| `packages/ui/src/tokens/components.css` | Couche 3 : Tokens de composants      |
| `packages/ui/src/tokens/index.css`      | Point d'entrée                       |
| `packages/ui/src/tokens/README.md`      | Guide d'utilisation détaillé         |
| **Configuration**                       |
| `packages/ui/tailwind.config.base.js`   | Config Tailwind centralisée          |

## 🎯 Prochaines Étapes Recommandées

### Option 1 : Migration Progressive (Recommandé)

1. **Semaine 1 : POC sur landing-page**
   - Importer les nouveaux tokens dans `globals.css`
   - Migrer 2-3 composants clés
   - Valider l'approche avec l'équipe

2. **Semaine 2 : Migration packages/ui**
   - Migrer tous les composants UI
   - Mettre à jour Storybook
   - Créer une page de visualisation des tokens

3. **Semaine 3-4 : Migration des apps**
   - Migrer headquarter-system
   - Migrer field-maintenance-system
   - Supprimer les anciennes variables

### Option 2 : Migration Rapide

1. **Jour 1-2 : Setup**
   - Importer les tokens dans tous les fichiers CSS
   - Mettre à jour les configs Tailwind

2. **Jour 3-5 : Migration**
   - Remplacer toutes les références
   - Tester en dark mode

3. **Jour 6-7 : Validation**
   - Tests visuels
   - Documentation finale

## 📖 Comment Utiliser

### Pour les Développeurs

#### 1. Importer les tokens

Dans votre fichier CSS principal :

```css
@import '@staamina/ui/src/tokens/index.css';
@tailwind base;
@tailwind components;
@tailwind utilities;
```

#### 2. Utiliser avec Tailwind

```tsx
<button className="bg-action-primary text-on-primary hover:bg-action-primary-hover">
  Click me
</button>
```

#### 3. Utiliser avec CSS Variables

```tsx
<button
  style={{
    backgroundColor: 'var(--button-primary-bg)',
    color: 'var(--button-primary-text)',
  }}
>
  Click me
</button>
```

### Pour les Designers

#### Figma → Code

1. **Primitives** = Votre palette de couleurs de base
2. **Semantic** = Vos styles de couleurs nommés
3. **Components** = Vos styles de composants

Vous pouvez utiliser le plugin [Figma Tokens](https://www.figma.com/community/plugin/843461159747178978) pour synchroniser.

## 🎨 Exemples Concrets

### Créer un bouton

**Avant :**

```tsx
<button className="bg-[#4f2eb0] text-white px-4 py-2 rounded-lg hover:opacity-90">
```

**Après :**

```tsx
<button className="bg-action-primary text-on-primary px-md py-sm rounded-lg hover:bg-action-primary-hover">
```

### Créer une carte avec statut d'erreur

**Avant :**

```tsx
<div className="bg-white border border-gray-200 rounded-lg p-6 shadow-md">
  <div className="bg-red-100 text-red-800 p-2 rounded">Error message</div>
</div>
```

**Après :**

```tsx
<div className="bg-background-surface border border-default rounded-lg p-lg shadow-card">
  <div className="bg-semantic-error-lighter text-semantic-error-dark p-sm rounded">
    Error message
  </div>
</div>
```

## 📊 Mapping des Couleurs Actuelles

| Couleur Actuelle        | →   | Nouveau Token                           |
| ----------------------- | --- | --------------------------------------- |
| `#4f2eb0`               | →   | `var(--primitive-purple-600)`           |
| `--color-brand-primary` | →   | `var(--color-brand-primary)` (semantic) |
| `bg-brand-primary`      | →   | `bg-brand-primary` (Tailwind)           |
| Button background       | →   | `var(--button-primary-bg)` (component)  |

## ❓ FAQ

### Q: Dois-je supprimer les anciennes variables ?

**R:** Pas tout de suite. Gardez-les pendant la migration, puis supprimez-les une fois tout migré.

### Q: Comment gérer le dark mode ?

**R:** Ajoutez simplement la classe `dark` sur `<html>` ou `<body>`. Tous les tokens s'ajustent automatiquement.

### Q: Puis-je utiliser les deux systèmes en parallèle ?

**R:** Oui ! C'est recommandé pendant la migration.

### Q: Comment ajouter une nouvelle couleur ?

**R:**

1. Ajoutez la primitive dans `primitives.css`
2. Créez un semantic token dans `semantic.css`
3. Si nécessaire, créez un component token dans `components.css`
4. Mettez à jour `tailwind.config.base.js`

### Q: Ça va casser mon code existant ?

**R:** Non ! Les nouveaux tokens sont additifs. Votre code actuel continue de fonctionner.

## 🔗 Ressources

### Documentation

- [Architecture complète](./design-system-architecture.md) - Guide détaillé
- [Résumé exécutif](./design-system-summary.md) - Vue d'ensemble rapide
- [Guide des tokens](../packages/ui/src/tokens/README.md) - Utilisation pratique

### Inspiration

- [Tailwind CSS](https://tailwindcss.com/docs/customizing-colors)
- [Material Design Tokens](https://m3.material.io/foundations/design-tokens/overview)
- [Radix Colors](https://www.radix-ui.com/colors)
- [Chakra UI](https://chakra-ui.com/docs/styled-system/theme)

### Outils

- [Coolors](https://coolors.co/) - Générateur de palettes
- [Contrast Checker](https://webaim.org/resources/contrastchecker/) - Accessibilité
- [Figma Tokens](https://www.figma.com/community/plugin/843461159747178978) - Sync Figma

## 💬 Besoin d'Aide ?

Si vous avez des questions ou besoin d'aide pour la migration :

1. Consultez la [documentation complète](./design-system-architecture.md)
2. Regardez les exemples dans le [guide des tokens](../packages/ui/src/tokens/README.md)
3. Demandez à Sally (UX Designer) 🎨

## ✨ Résumé en 3 Points

1. **3 couches de tokens** : Primitives → Semantic → Components
2. **Source unique de vérité** : `packages/ui/src/tokens/`
3. **Migration progressive** : Commencez par une app, puis étendez

---

**Créé par Sally (UX Designer) 🎨**  
_Date : 2026-01-24_  
_Statut : Prêt pour migration ✅_

**Fichiers créés : 7**  
**Lignes de code : ~2000+**  
**Temps estimé de migration : 8-10 jours**
