# Architecture du Design System Staamina 🎨

## 📋 Analyse de l'Existant

### État Actuel

Après analyse du projet, voici ce qui existe actuellement :

#### ✅ Points Positifs

1. **Variables CSS déjà en place** - Utilisation de CSS custom properties (`--color-brand-primary`, etc.)
2. **Tailwind configuré** - Présent dans `packages/ui` et les apps (`landing-page`, `headquarter-system`)
3. **Début de structure sémantique** :
   - Couleurs de marque : `brand-primary`, `brand-secondary`, `brand-tertiary`
   - Couleurs sémantiques : `semantic-error`, `semantic-warning`, `semantic-success`, etc.
   - Couleurs de composants : `background`, `foreground`, `card`, `popover`, etc.

#### ⚠️ Problèmes Identifiés

1. **Duplication de code** - Les mêmes variables CSS sont répétées dans :
   - `packages/ui/src/storybook.css`
   - `apps/landing-page/src/app/globals.css`
   - `apps/headquarter-system/src/index.css`

2. **Mélange de niveaux d'abstraction** :
   - Valeurs primitives en dur (`#4f2eb0`)
   - Tokens sémantiques (`--color-brand-primary`)
   - Tokens de composants (`--primary`, `--card`)
   - Tout dans le même fichier

3. **Pas de source unique de vérité** - Chaque app définit ses propres variables

4. **Incohérence des formats** :
   - Certaines couleurs en HEX (`#4f2eb0`)
   - D'autres en HSL (`260 58% 43%`)

5. **Pas de documentation** - Aucune doc sur quand utiliser quelle couleur

---

## 🏗️ Architecture Proposée : Système en 3 Couches

### Vue d'ensemble

```
┌─────────────────────────────────────────────────────────┐
│                    COMPONENT TOKENS                      │
│  (Tokens spécifiques aux composants UI)                 │
│  Ex: --button-primary-bg, --card-border                 │
└─────────────────────────────────────────────────────────┘
                            ↓ référence
┌─────────────────────────────────────────────────────────┐
│                    SEMANTIC TOKENS                       │
│  (Tokens avec signification métier/UX)                  │
│  Ex: --color-brand-primary, --color-action-primary      │
└─────────────────────────────────────────────────────────┘
                            ↓ référence
┌─────────────────────────────────────────────────────────┐
│                    PRIMITIVE TOKENS                      │
│  (Valeurs brutes, palette de base)                      │
│  Ex: --primitive-purple-500, --primitive-teal-400       │
└─────────────────────────────────────────────────────────┘
```

---

## 📦 Couche 1 : Primitive Tokens

### Objectif

Définir la **palette de couleurs brute** sans contexte d'utilisation.

### Localisation

`packages/ui/src/tokens/primitives.css`

### Structure

```css
:root {
  /* Purple Scale (Brand) */
  --primitive-purple-50: #f5f3ff;
  --primitive-purple-100: #ede9fe;
  --primitive-purple-200: #ddd6fe;
  --primitive-purple-300: #c4b5fd;
  --primitive-purple-400: #a78bfa;
  --primitive-purple-500: #8b5cf6; /* Base */
  --primitive-purple-600: #7c3aed;
  --primitive-purple-700: #6d28d9;
  --primitive-purple-800: #5b21b6;
  --primitive-purple-900: #4c1d95;
  --primitive-purple-950: #2e1065;

  /* Teal Scale (Secondary) */
  --primitive-teal-50: #f0fdfa;
  --primitive-teal-100: #ccfbf1;
  --primitive-teal-200: #99f6e4;
  --primitive-teal-300: #5eead4;
  --primitive-teal-400: #2dd4bf;
  --primitive-teal-500: #14b8a6; /* Base */
  --primitive-teal-600: #0d9488;
  --primitive-teal-700: #0f766e;
  --primitive-teal-800: #115e59;
  --primitive-teal-900: #134e4a;

  /* Amber Scale (Tertiary) */
  --primitive-amber-50: #fffbeb;
  --primitive-amber-100: #fef3c7;
  --primitive-amber-200: #fde68a;
  --primitive-amber-300: #fcd34d;
  --primitive-amber-400: #fbbf24;
  --primitive-amber-500: #f59e0b;
  --primitive-amber-600: #d97706;
  --primitive-amber-700: #b45309;
  --primitive-amber-800: #92400e;
  --primitive-amber-900: #78350f;

  /* Neutral Scale (Grays) */
  --primitive-neutral-0: #ffffff;
  --primitive-neutral-50: #fafafa;
  --primitive-neutral-100: #f5f5f5;
  --primitive-neutral-200: #e5e5e5;
  --primitive-neutral-300: #d4d4d4;
  --primitive-neutral-400: #a3a3a3;
  --primitive-neutral-500: #737373;
  --primitive-neutral-600: #525252;
  --primitive-neutral-700: #404040;
  --primitive-neutral-800: #262626;
  --primitive-neutral-900: #171717;
  --primitive-neutral-950: #0a0a0a;

  /* Semantic Colors (Status) */
  --primitive-red-400: #f87171;
  --primitive-red-500: #ef4444;
  --primitive-red-600: #dc2626;

  --primitive-orange-400: #fb923c;
  --primitive-orange-500: #f97316;

  --primitive-green-400: #4ade80;
  --primitive-green-500: #22c55e;
  --primitive-green-600: #16a34a;

  --primitive-blue-400: #60a5fa;
  --primitive-blue-500: #3b82f6;
  --primitive-blue-600: #2563eb;
}
```

### Règles d'utilisation

- ❌ **JAMAIS** utilisées directement dans les composants
- ✅ Uniquement référencées par les semantic tokens
- ✅ Peuvent être modifiées pour rebranding complet

---

## 🎯 Couche 2 : Semantic Tokens

### Objectif

Donner un **sens métier et UX** aux couleurs primitives.

### Localisation

`packages/ui/src/tokens/semantic.css`

### Structure

```css
:root {
  /* === BRAND COLORS === */
  --color-brand-primary: var(--primitive-purple-600);
  --color-brand-primary-light: var(--primitive-purple-400);
  --color-brand-primary-dark: var(--primitive-purple-800);
  --color-brand-primary-hover: var(--primitive-purple-700);

  --color-brand-secondary: var(--primitive-teal-500);
  --color-brand-secondary-light: var(--primitive-teal-400);
  --color-brand-secondary-dark: var(--primitive-teal-700);

  --color-brand-tertiary: var(--primitive-amber-400);
  --color-brand-tertiary-dark: var(--primitive-amber-600);

  /* === SEMANTIC COLORS (Status/Feedback) === */
  --color-semantic-error: var(--primitive-red-500);
  --color-semantic-error-light: var(--primitive-red-400);
  --color-semantic-error-dark: var(--primitive-red-600);

  --color-semantic-warning: var(--primitive-orange-500);
  --color-semantic-warning-light: var(--primitive-orange-400);

  --color-semantic-success: var(--primitive-green-500);
  --color-semantic-success-light: var(--primitive-green-400);
  --color-semantic-success-dark: var(--primitive-green-600);

  --color-semantic-info: var(--primitive-blue-500);
  --color-semantic-info-light: var(--primitive-blue-400);

  /* === BACKGROUND COLORS === */
  --color-background-app: var(--primitive-neutral-50);
  --color-background-surface: var(--primitive-neutral-0);
  --color-background-elevated: var(--primitive-neutral-0);
  --color-background-overlay: rgba(0, 0, 0, 0.5);

  /* === TEXT COLORS === */
  --color-text-primary: var(--primitive-neutral-900);
  --color-text-secondary: var(--primitive-neutral-600);
  --color-text-tertiary: var(--primitive-neutral-500);
  --color-text-disabled: var(--primitive-neutral-400);
  --color-text-on-primary: var(--primitive-neutral-0);
  --color-text-on-dark: var(--primitive-neutral-0);

  /* === BORDER COLORS === */
  --color-border-default: var(--primitive-neutral-200);
  --color-border-strong: var(--primitive-neutral-300);
  --color-border-subtle: var(--primitive-neutral-100);

  /* === ACTION COLORS === */
  --color-action-primary: var(--color-brand-primary);
  --color-action-primary-hover: var(--color-brand-primary-hover);
  --color-action-secondary: var(--color-brand-secondary);
  --color-action-destructive: var(--color-semantic-error);
}

/* Dark Mode */
.dark {
  --color-background-app: var(--primitive-neutral-950);
  --color-background-surface: var(--primitive-neutral-900);
  --color-background-elevated: var(--primitive-neutral-800);

  --color-text-primary: var(--primitive-neutral-50);
  --color-text-secondary: var(--primitive-neutral-400);
  --color-text-tertiary: var(--primitive-neutral-500);

  --color-border-default: var(--primitive-neutral-700);
  --color-border-strong: var(--primitive-neutral-600);
  --color-border-subtle: var(--primitive-neutral-800);
}
```

### Règles d'utilisation

- ✅ Peuvent être utilisées directement dans les composants simples
- ✅ Référencées par les component tokens
- 📝 Documentées avec leur cas d'usage

---

## 🧩 Couche 3 : Component Tokens

### Objectif

Tokens **spécifiques aux composants** pour une cohérence maximale.

### Localisation

`packages/ui/src/tokens/components.css`

### Structure

```css
:root {
  /* === BUTTON TOKENS === */
  --button-primary-bg: var(--color-action-primary);
  --button-primary-bg-hover: var(--color-action-primary-hover);
  --button-primary-text: var(--color-text-on-primary);
  --button-primary-border: transparent;

  --button-secondary-bg: var(--color-action-secondary);
  --button-secondary-bg-hover: var(--color-brand-secondary-dark);
  --button-secondary-text: var(--color-text-on-primary);

  --button-outline-bg: transparent;
  --button-outline-border: var(--color-border-strong);
  --button-outline-text: var(--color-text-primary);
  --button-outline-hover-bg: var(--color-background-elevated);

  --button-destructive-bg: var(--color-action-destructive);
  --button-destructive-text: var(--color-text-on-primary);

  /* === CARD TOKENS === */
  --card-bg: var(--color-background-surface);
  --card-border: var(--color-border-default);
  --card-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  --card-shadow-hover: 0 4px 6px -1px rgba(0, 0, 0, 0.1);

  /* === INPUT TOKENS === */
  --input-bg: var(--color-background-surface);
  --input-border: var(--color-border-default);
  --input-border-focus: var(--color-action-primary);
  --input-text: var(--color-text-primary);
  --input-placeholder: var(--color-text-tertiary);
  --input-disabled-bg: var(--color-background-app);
  --input-disabled-text: var(--color-text-disabled);

  /* === MODAL/POPOVER TOKENS === */
  --modal-bg: var(--color-background-surface);
  --modal-overlay: var(--color-background-overlay);
  --modal-border: var(--color-border-subtle);

  --popover-bg: var(--color-background-elevated);
  --popover-border: var(--color-border-default);
  --popover-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);

  /* === SIDEBAR TOKENS === */
  --sidebar-bg: var(--color-background-surface);
  --sidebar-border: var(--color-border-default);
  --sidebar-item-hover: var(--color-background-app);
  --sidebar-item-active: var(--color-brand-primary-light);
  --sidebar-item-active-text: var(--color-brand-primary-dark);

  /* === TABLE TOKENS === */
  --table-header-bg: var(--color-background-app);
  --table-row-hover: var(--color-background-app);
  --table-border: var(--color-border-default);
}
```

### Règles d'utilisation

- ✅ **TOUJOURS** utilisées dans les composants UI
- ✅ Permettent de changer le style d'un composant sans toucher au code
- ✅ Facilitent les variantes de composants

---

## 📁 Structure de Fichiers Proposée

```
packages/ui/src/
├── tokens/
│   ├── index.css                 # Import de tous les tokens
│   ├── primitives.css            # Couche 1 : Primitives
│   ├── semantic.css              # Couche 2 : Semantic
│   ├── components.css            # Couche 3 : Components
│   └── README.md                 # Documentation des tokens
│
├── tailwind/
│   ├── tailwind.config.base.js   # Config Tailwind partagée
│   └── README.md                 # Doc Tailwind
│
└── components/
    └── [vos composants existants]
```

### Fichier `tokens/index.css`

```css
/* Import des tokens dans l'ordre */
@import './primitives.css';
@import './semantic.css';
@import './components.css';

/* Tailwind directives */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Base styles */
@layer base {
  * {
    @apply border-border;
  }

  body {
    @apply bg-background text-foreground;
  }

  html {
    scroll-behavior: smooth;
  }
}
```

---

## 🎨 Configuration Tailwind Centralisée

### Fichier `packages/ui/tailwind.config.base.js`

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  theme: {
    extend: {
      colors: {
        // Brand colors
        brand: {
          primary: 'var(--color-brand-primary)',
          'primary-light': 'var(--color-brand-primary-light)',
          'primary-dark': 'var(--color-brand-primary-dark)',
          'primary-hover': 'var(--color-brand-primary-hover)',
          secondary: 'var(--color-brand-secondary)',
          'secondary-light': 'var(--color-brand-secondary-light)',
          'secondary-dark': 'var(--color-brand-secondary-dark)',
          tertiary: 'var(--color-brand-tertiary)',
          'tertiary-dark': 'var(--color-brand-tertiary-dark)',
        },

        // Semantic colors
        semantic: {
          error: 'var(--color-semantic-error)',
          'error-light': 'var(--color-semantic-error-light)',
          'error-dark': 'var(--color-semantic-error-dark)',
          warning: 'var(--color-semantic-warning)',
          'warning-light': 'var(--color-semantic-warning-light)',
          success: 'var(--color-semantic-success)',
          'success-light': 'var(--color-semantic-success-light)',
          'success-dark': 'var(--color-semantic-success-dark)',
          info: 'var(--color-semantic-info)',
          'info-light': 'var(--color-semantic-info-light)',
        },

        // Background colors
        background: {
          DEFAULT: 'var(--color-background-app)',
          surface: 'var(--color-background-surface)',
          elevated: 'var(--color-background-elevated)',
          overlay: 'var(--color-background-overlay)',
        },

        // Text colors
        text: {
          primary: 'var(--color-text-primary)',
          secondary: 'var(--color-text-secondary)',
          tertiary: 'var(--color-text-tertiary)',
          disabled: 'var(--color-text-disabled)',
          'on-primary': 'var(--color-text-on-primary)',
          'on-dark': 'var(--color-text-on-dark)',
        },

        // Border colors
        border: {
          DEFAULT: 'var(--color-border-default)',
          strong: 'var(--color-border-strong)',
          subtle: 'var(--color-border-subtle)',
        },

        // Action colors
        action: {
          primary: 'var(--color-action-primary)',
          'primary-hover': 'var(--color-action-primary-hover)',
          secondary: 'var(--color-action-secondary)',
          destructive: 'var(--color-action-destructive)',
        },
      },

      // Spacing basé sur des tokens
      spacing: {
        xs: '0.25rem', // 4px
        sm: '0.5rem', // 8px
        md: '1rem', // 16px
        lg: '1.5rem', // 24px
        xl: '2rem', // 32px
        '2xl': '3rem', // 48px
        '3xl': '4rem', // 64px
      },

      // Border radius
      borderRadius: {
        sm: '0.25rem', // 4px
        md: '0.5rem', // 8px
        lg: '0.75rem', // 12px
        xl: '1rem', // 16px
        '2xl': '1.5rem', // 24px
      },

      // Shadows
      boxShadow: {
        card: 'var(--card-shadow)',
        'card-hover': 'var(--card-shadow-hover)',
        popover: 'var(--popover-shadow)',
      },
    },
  },
  plugins: [],
};
```

### Utilisation dans les apps

**`apps/landing-page/tailwind.config.ts`**

```typescript
import type { Config } from 'tailwindcss';
import baseConfig from '@staamina/ui/tailwind.config.base';

const config = {
  ...baseConfig,
  content: ['./src/**/*.{ts,tsx}', '../../packages/ui/src/**/*.{ts,tsx}'],
  plugins: [...baseConfig.plugins, require('tailwindcss-animate')],
} satisfies Config;

export default config;
```

---

## 🚀 Plan de Migration

### Phase 1 : Mise en place de la structure (1-2 jours)

1. ✅ Créer la structure de dossiers `packages/ui/src/tokens/`
2. ✅ Créer les fichiers de tokens (primitives, semantic, components)
3. ✅ Créer la config Tailwind centralisée
4. ✅ Documenter les tokens dans un README

### Phase 2 : Migration des variables existantes (2-3 jours)

1. ✅ Mapper les couleurs actuelles vers les primitives
2. ✅ Créer les semantic tokens correspondants
3. ✅ Créer les component tokens pour les composants existants
4. ✅ Mettre à jour `storybook.css` pour importer les nouveaux tokens

### Phase 3 : Migration des apps (3-5 jours)

1. ✅ Migrer `packages/ui` pour utiliser les nouveaux tokens
2. ✅ Migrer `apps/landing-page`
3. ✅ Migrer `apps/headquarter-system`
4. ✅ Migrer `apps/field-maintenance-system`
5. ✅ Supprimer les anciennes définitions de variables

### Phase 4 : Documentation et tests (1-2 jours)

1. ✅ Créer une page Storybook pour visualiser tous les tokens
2. ✅ Documenter les guidelines d'utilisation
3. ✅ Tester le dark mode
4. ✅ Valider la cohérence visuelle

---

## 📚 Guidelines d'Utilisation

### Pour les Développeurs

#### ❌ À NE PAS FAIRE

```tsx
// ❌ Utiliser des couleurs en dur
<div className="bg-[#4f2eb0]">

// ❌ Utiliser des primitives directement
<div style={{ color: 'var(--primitive-purple-600)' }}>

// ❌ Créer des couleurs custom sans passer par les tokens
<div className="bg-blue-500">
```

#### ✅ À FAIRE

```tsx
// ✅ Utiliser les component tokens pour les composants
<button className="bg-[var(--button-primary-bg)] text-[var(--button-primary-text)]">

// ✅ Ou mieux, utiliser les classes Tailwind configurées
<button className="bg-action-primary text-on-primary hover:bg-action-primary-hover">

// ✅ Pour des cas spécifiques, utiliser les semantic tokens
<div className="border-l-4 border-semantic-error bg-semantic-error-light">
```

### Quand utiliser quelle couche ?

| Situation                     | Couche à utiliser | Exemple                           |
| ----------------------------- | ----------------- | --------------------------------- |
| Créer un nouveau composant UI | Component Tokens  | `--button-primary-bg`             |
| Afficher un statut/feedback   | Semantic Tokens   | `--color-semantic-success`        |
| Texte ou background général   | Semantic Tokens   | `--color-text-primary`            |
| Rebranding complet            | Primitives        | Modifier `--primitive-purple-600` |
| Ajuster le dark mode          | Semantic Tokens   | Redéfinir dans `.dark`            |

---

## 🎯 Bénéfices Attendus

### 1. **Maintenabilité** 🔧

- Une seule source de vérité pour les couleurs
- Changement global en modifiant un seul token
- Pas de duplication de code

### 2. **Cohérence** 🎨

- Tous les composants utilisent les mêmes couleurs
- Dark mode cohérent automatiquement
- Respect de la charte graphique garanti

### 3. **Scalabilité** 📈

- Facile d'ajouter de nouvelles couleurs
- Facile de créer des variantes de composants
- Facile d'ajouter de nouveaux thèmes

### 4. **Developer Experience** 💻

- Autocomplete dans l'IDE pour les tokens
- Documentation claire
- Moins de décisions à prendre

### 5. **Performance** ⚡

- CSS variables = pas de re-render React
- Changement de thème instantané
- Pas de JavaScript pour les couleurs

---

## 📖 Ressources et Références

### Inspirations

- [Tailwind CSS Color System](https://tailwindcss.com/docs/customizing-colors)
- [Material Design Tokens](https://m3.material.io/foundations/design-tokens/overview)
- [Radix Colors](https://www.radix-ui.com/colors)
- [Chakra UI Theme Tokens](https://chakra-ui.com/docs/styled-system/theme)

### Outils Recommandés

- [Coolors](https://coolors.co/) - Générateur de palettes
- [Contrast Checker](https://webaim.org/resources/contrastchecker/) - Vérifier l'accessibilité
- [Figma Tokens](https://www.figma.com/community/plugin/843461159747178978) - Sync avec Figma

---

## 🤝 Prochaines Étapes

1. **Validation** - Valider cette architecture avec l'équipe
2. **Priorisation** - Décider quelle phase commencer en premier
3. **Prototypage** - Créer un POC avec un composant
4. **Migration** - Suivre le plan de migration
5. **Documentation** - Créer un guide pour l'équipe

---

**Créé par Sally (UX Designer) 🎨**  
_Date : 2026-01-24_
