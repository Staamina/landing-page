# Atomic Design – Classification @staamina/ui

## Atoms (building blocks indivisibles)

- **badge** – Badge (Radix Slot, variants sémantiques)
- **button** – Bouton de base
- **checkbox** – Case à cocher
- **input** – Champ de saisie
- **label** – Étiquette de formulaire
- **link-button** – Bouton stylé comme lien
- **loader** – Indicateur de chargement
- **progress-indicator** – Barre de progression
- **textarea** – Zone de texte multiligne
- **select** – Sélecteur Radix (primitif)
- **user-avatar** – Avatar utilisateur
- **criticality-indicator** – Point de criticité
- **highlight-text** – Texte surligné

## Molecules (combinaisons simples d’atoms)

- **button-group** – Groupe de boutons
- **form-group** – Label + champ + erreur
- **search-input** – Champ de recherche
- **dropdown** – Menu déroulant (trigger + liste)
- **card** – Carte (Card, CardHeader, CardContent…)
- **card-button** – Carte cliquable
- **selectable-card** – Carte sélectionnable
- **status-badge** – Badge de statut
- **criticality-badge** – Badge de criticité
- **date-picker** – Champ + calendrier
- **autocomplete** – Champ + suggestions
- **action-block** – Bloc titre + action
- **menu** – Menu (items + trigger)
- **modal** – Overlay + contenu
- **drawer** – Tiroir latéral
- **table** – Tableau (header + rows)
- **grid-layout** – Grille (GridRow, GridCol)
- **virtual-list** – Liste virtualisée
- **language-menu** – Menu de langue
- **country-dropdown** – Sélecteur de pays
- **country-autocomplete** – Autocomplete pays
- **places-autocomplete** – Autocomplete lieux
- **profile-menu** – Bloc profil utilisateur (avatar, nom, rôle)
- **picker-utils** – PickerSearchInput (SearchInput spécialisé)

## Organisms (sections complexes)

- **confirm-modal** – Modal de confirmation (contexte + actions)
- **equipment-picker** – Sélecteur d’équipement (recherche, catégories, liste)
- **header-portal** – Portail d’en-tête (contexte + cible)
- **landing-carousel** – Carrousel de landing
- **layout** – AppLayout, AppHeader, Page, Section, Center, Flex
- **sidebar** – Barre latérale de navigation
- **timeline** – Timeline unifiée (événements, messages)
- **site-3d-viewer** – Visualiseur 3D de site
- **splash-screen** – Écran de chargement initial
- **error-boundary** – Périmètre d’erreur React

## Hors composants (reste à la racine de src/)

- **hooks** – Hooks partagés
- **i18n** – Internationalisation
- **feature-flags** – Feature flags
- **user-provider** – Contexte utilisateur
- **tokens** – Design tokens (CSS)
- **test** – Setup tests
- **utils** – Utilitaires (cn, etc.)
