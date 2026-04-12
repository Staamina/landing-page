# Design Tokens - Guide d'Utilisation

## Vue d'ensemble

Ce dossier contient les **Design Tokens** du système de design Staamina.
Les tokens sont définis via la directive Tailwind v4 `@theme`, ce qui les expose automatiquement comme classes utilitaires.

## Architecture en 3 Couches

```
┌─────────────────────────────────────────────────────────┐
│                    COMPONENT TOKENS                      │
│  Tokens spécifiques aux composants UI                   │
│  Fichier: components.css                                │
└─────────────────────────────────────────────────────────┘
                            ↓ référence
┌─────────────────────────────────────────────────────────┐
│                    SEMANTIC TOKENS                       │
│  Tokens avec signification métier/UX                    │
│  Fichier: theme.css (@theme)                            │
└─────────────────────────────────────────────────────────┘
                            ↓ référence
┌─────────────────────────────────────────────────────────┐
│                    PRIMITIVE TOKENS                      │
│  Valeurs brutes, palette de base                        │
│  Fichier: theme.css (@theme)                            │
└─────────────────────────────────────────────────────────┘
```

## Fichiers

### `theme.css` — Couche 1 + 2

Contient à la fois les **primitives** (palette brute) et les **semantic tokens** (couleurs avec signification), tous définis dans `@theme`.

**Primitives** — échelles de couleurs brutes :

```css
--color-primitive-purple-600: #9333ea;
--color-primitive-neutral-0: #ffffff;
```

**Semantic tokens** — signification métier/UX :

```css
--color-brand-primary: var(--color-primitive-purple-600);
--color-surface: var(--color-primitive-neutral-0);
--color-text-primary: var(--color-primitive-neutral-900);
```

**Règles :**

- ❌ Les primitives ne sont **jamais** utilisées directement dans les composants
- ✅ Les semantic tokens sont utilisés via les classes Tailwind auto-générées

### `components.css` — Couche 3

Tokens spécifiques aux composants pour une cohérence maximale.

```css
--button-primary-bg: var(--color-action-primary);
--input-bg: var(--color-surface);
--card-bg: var(--color-surface);
```

**Règles :**

- ✅ Toujours référencer des semantic tokens, jamais des primitives
- ✅ Permettent de restyler un composant sans toucher au code JSX

### `index.css` — Point d'entrée

Importe `theme.css` puis `components.css` dans le bon ordre.

---

## Comment Tailwind v4 génère les classes

Toute variable `--color-X` définie dans `@theme` génère automatiquement :

- `bg-X` (background)
- `text-X` (couleur de texte)
- `border-X` (couleur de bordure)
- `ring-X`, `fill-X`, `stroke-X`...

```css
/* Définition dans theme.css */
--color-surface: #ffffff;

/* Classes disponibles automatiquement */
bg-surface       /* background-color: #ffffff */
text-surface     /* color: #ffffff */
border-surface   /* border-color: #ffffff */
```

> Le nom de la classe = le nom de la variable sans le préfixe `--color-`.

---

## Classes Tailwind disponibles

### Backgrounds de surface

| Classe         | Usage                                        |
| -------------- | -------------------------------------------- |
| `bg-app`       | Fond global de l'application                 |
| `bg-surface`   | Fond des cartes, panneaux, formulaires       |
| `bg-elevated`  | Surfaces flottantes (popovers, dropdowns)    |
| `bg-subtle`    | Fond légèrement contrasté, zones secondaires |
| `bg-overlay`   | Overlay de modales (`rgba`)                  |
| `bg-highlight` | Mise en surbrillance de texte                |

### Backgrounds d'état interactif

| Classe        | Usage                             |
| ------------- | --------------------------------- |
| `bg-hover`    | État hover d'un élément cliquable |
| `bg-active`   | État actif/pressé                 |
| `bg-disabled` | Élément désactivé                 |

### Marque

- `bg-brand-primary`, `text-brand-primary`, `border-brand-primary`
- `bg-brand-secondary`, `bg-brand-tertiary`

### Sémantiques (feedback)

- `bg-semantic-success`, `text-semantic-success`, `border-semantic-success`
- Même pattern pour `error`, `warning`, `info`

### Texte

- `text-text-primary`, `text-text-secondary`, `text-text-tertiary`
- `text-text-disabled`, `text-text-placeholder`
- `text-text-on-primary`, `text-text-on-dark`

### Bordures

- `border-border-default`, `border-border-strong`, `border-border-subtle`
- `border-border-hover`, `border-border-focus`
- `border-border-error`, `border-border-success`

---

## Guide d'utilisation

### ❌ À ne pas faire

```tsx
// Couleur en dur
<div className="bg-[#4f2eb0]">

// Primitive directement dans un composant
<div style={{ color: 'var(--color-primitive-purple-600)' }}>

// Classe Tailwind générique (hors design system)
<div className="bg-blue-500">

// Ancien nommage supprimé (bg-background-surface)
<div className="bg-background-surface">
```

### ✅ À faire

```tsx
// Classes Tailwind depuis les semantic tokens
<div className="bg-surface text-text-primary border-border-default">

// État hover
<button className="bg-surface hover:bg-hover">

// Feedback sémantique
<div className="bg-semantic-error-bg text-semantic-error border-semantic-error">

// var() pour les cas non couverts par les utilitaires (shadows, etc.)
<div style={{ boxShadow: 'var(--card-shadow)' }}>
```

---

## Dark Mode

Le dark mode est géré via la classe `.dark` sur l'élément racine. Tous les semantic et component tokens sont automatiquement redéfinis.

```tsx
// Activer
document.documentElement.classList.add('dark');
// Désactiver
document.documentElement.classList.remove('dark');
```

---

## Ajouter de nouveaux tokens

### Nouveau semantic token de background

```css
/* Dans theme.css, section @theme */
--color-my-token: var(--color-primitive-neutral-200);

/* Dans .dark { ... } */
--color-my-token: var(--color-primitive-neutral-700);
```

Disponible immédiatement comme `bg-my-token`.

### Nouveau component token

```css
/* Dans components.css — toujours référencer un semantic token */
--chip-bg: var(--color-subtle);
--chip-text: var(--color-text-secondary);
--chip-border: var(--color-border-default);
```

---

## Maintenance

- Tous les component tokens doivent référencer des semantic tokens (jamais des primitives)
- Pas de valeurs en dur dans `components.css`
- Vérifier les contrastes en dark mode (WCAG AA minimum)
- Documenter les nouveaux tokens dans ce README
