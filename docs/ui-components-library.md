# UI Components Library

**Generated:** 2026-01-07  
**Part:** packages/ui  
**Package:** @staamina/ui

## Overview

The UI component library is a shared React component library built with TypeScript, Tailwind CSS, and Radix UI primitives. It provides reusable, accessible components used across all frontend applications in the monorepo.

## Technology Stack

- **React:** 18.2.0
- **TypeScript:** 5.3.3
- **Tailwind CSS:** 3.4.1
- **Radix UI:** Various primitives for accessible components
- **Storybook:** 8.1.0 for component documentation
- **React Three Fiber:** 8.15.0 for 3D components
- **Three.js:** 0.158.0 for 3D rendering
- **TanStack Table:** 8.11.0 for table components
- **Lucide React:** 0.309.0 for icons

## Component Categories

### Form Components

#### Button

- **File:** `src/button/button.tsx`
- **Variants:**
  - Intent: primary, secondary, tertiary, success, danger, alert, neutral
  - Appearance: solid, outline, ghost
  - Size: default, sm, lg, icon
- **Features:** Compound variants, CVA (class-variance-authority)

#### Input

- **File:** `src/input/input.tsx`
- **Features:** Standard text input with Tailwind styling, focus states

#### Select

- **File:** `src/select.tsx`
- **Base:** Radix UI Select primitive
- **Components:** Select, SelectGroup, SelectValue, SelectTrigger, SelectContent, SelectItem, SelectLabel, SelectSeparator
- **Features:** Scrollable lists, keyboard navigation

#### Autocomplete

- **File:** `src/autocomplete/autocomplete.tsx`
- **Features:** Searchable dropdown with suggestions

#### DatePicker

- **File:** `src/date-picker/date-picker.tsx`
- **Features:** Date selection component

#### CountryDropdown / CountryAutocomplete

- **Files:** `src/country-dropdown/`, `src/country-autocomplete/`
- **Features:** Country selection components

#### PlacesAutocomplete

- **File:** `src/places-autocomplete/places-autocomplete.tsx`
- **Features:** Address autocomplete (likely integrates with location API)

#### FormGroup

- **File:** `src/form-group/form-group.tsx`
- **Features:** Form field grouping with labels and error handling

### Layout Components

#### GridLayout

- **File:** `src/grid-layout/grid-layout.tsx`
- **Features:** Responsive grid layout system

#### Sidebar

- **File:** `src/sidebar/sidebar.tsx`
- **Features:** Navigation sidebar component

#### Card

- **File:** `src/card.tsx`
- **Features:** Card container component

#### ActionBlock

- **File:** `src/action-block/action-block.tsx`
- **Features:** Action block component

### Overlay Components

#### Modal

- **File:** `src/modal/modal.tsx`
- **Base:** Radix UI Dialog
- **Components:** Modal, ModalTrigger, ModalContent, ModalHeader, ModalFooter, ModalTitle, ModalDescription, ModalOverlay, ModalClose
- **Variants:** Size (xs, sm, md, lg, xl, 2xl)
- **Features:** Accessible modal dialogs with animations

#### Drawer

- **File:** `src/drawer/drawer.tsx`
- **Features:** Slide-out drawer component

#### ConfirmModal

- **File:** `src/confirm-modal/confirm-modal.tsx`
- **Features:** Confirmation dialog with context provider

#### Dropdown

- **File:** `src/dropdown/dropdown.tsx`
- **Features:** Dropdown menu component

#### Menu

- **File:** `src/menu/menu.tsx`
- **Base:** Radix UI Menu
- **Features:** Context menu component

### Data Display Components

#### Table

- **File:** `src/table/table.tsx`
- **Base:** TanStack Table (React Table)
- **Features:**
  - Client-side and server-side pagination
  - Sorting (client and manual)
  - Filtering (client and manual)
  - Column visibility
  - Customizable styling
  - Pagination controls
- **Modes:** `client` (default) or `manual` for server-side operations

#### Loader

- **File:** `src/loader/loader.tsx`
- **Features:** Loading spinner/indicator

### Navigation Components

#### ButtonGroup

- **File:** `src/button-group/button-group.tsx`
- **Features:** Group of buttons with dropdown support

#### LanguageMenu

- **File:** `src/language-menu/language-menu.tsx`
- **Features:** Language selection menu

### 3D Components

#### Site3DViewer

- **File:** `src/site-3d-viewer/site-3d-viewer.tsx`
- **Base:** React Three Fiber + Three.js
- **Features:**
  - 3D visualization of sites and equipment
  - Floor navigation
  - Equipment highlighting and selection
  - Search functionality
  - Equipment info panel
  - Custom 3D models for equipment types
- **Equipment Models:**
  - CashRegister3D
  - Mannequin3D
  - MetalShelving3D
  - SecurityCamera3D
  - Default fallback model
- **Components:**
  - Building (3D building structure)
  - Floor (3D floor rendering)
  - EquipmentHighlight (equipment interaction)
  - FloorSelector (floor navigation UI)
  - SearchBar (equipment search)
  - EquipmentInfoPanel (equipment details)
- **Hooks:**
  - `useFloorNavigation` - Floor switching logic
  - `useEquipmentTransform` - Spatial transformation calculations

### Utility Components

#### SplashScreen

- **File:** `src/splash-screen/SplashScreen.tsx`
- **Features:** Loading splash screen with logo

#### UserProvider

- **File:** `src/user-provider/user-provider.tsx`
- **Features:** User context provider

### Internationalization

#### TranslationContext

- **File:** `src/i18n/translation-context.tsx`
- **Features:** i18n context provider
- **Default Translations:** `src/i18n/default-translations.ts`
- **Types:** `src/i18n/types.ts`

## Design System

### Color Palette

Defined in `src/storybook.css`:

**Brand Colors:**

- Primary: `#4F2EB0` (purple)
- Primary Light: `#7D5FD8`
- Primary Dark: `#3A2280`
- Secondary: `#5DD4C6` (teal)
- Secondary Dark: `#2EB0A2`
- Tertiary: `#E8D099` (gold)
- Tertiary Dark: `#C4A855`

**Semantic Colors:**

- Error: `#E87878`
- Warning: `#F5C77E`
- Success: `#52C485`
- Info: `#6B9FE8`
- Alert: `#F5C77E`

**Theme Variables:**

- Supports light and dark modes
- CSS custom properties for theming
- Tailwind CSS integration

### Typography

- Uses system fonts with Tailwind typography utilities
- Responsive text sizing

### Spacing

- Tailwind spacing scale
- Consistent padding and margins

## Storybook Integration

All components have Storybook stories for:

- Visual testing
- Component documentation
- Interactive examples
- Props documentation

**Story Files Pattern:** `*.stories.tsx`

## Usage

### Installation

```bash
# In consuming apps
pnpm add @staamina/ui
```

### Import Example

```typescript
import { Button, Modal, Table } from '@staamina/ui';
```

### Component Example

```typescript
<Button intent="primary" appearance="solid" size="lg">
  Click Me
</Button>
```

## Accessibility

- **Radix UI Primitives:** All overlay components use Radix UI for accessibility
- **Keyboard Navigation:** Full keyboard support
- **ARIA Attributes:** Proper ARIA labels and roles
- **Focus Management:** Proper focus trapping in modals
- **Screen Reader Support:** Semantic HTML and ARIA

## Styling

- **Tailwind CSS:** Utility-first CSS framework
- **CVA (class-variance-authority):** For component variants
- **CSS Custom Properties:** For theming
- **Responsive Design:** Mobile-first approach

## TypeScript

- **Strict Mode:** Full TypeScript strict mode
- **Type Safety:** All components fully typed
- **Generic Components:** Table and other components use generics
- **Shared Types:** Uses `@staamina/types` package

## Development

### Storybook

```bash
pnpm --filter @staamina/ui storybook
```

### Build

```bash
pnpm --filter @staamina/ui build
```

## Component List Summary

**Total Components:** ~30+ components

**By Category:**

- Form Components: 8
- Layout Components: 4
- Overlay Components: 5
- Data Display: 2
- Navigation: 2
- 3D Components: 1 (complex with sub-components)
- Utility: 2
- i18n: 1

_Sources: packages/ui source code analysis (exhaustive scan)_
