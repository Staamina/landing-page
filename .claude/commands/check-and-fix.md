---
description: Vérifie que pnpm check passe (lint + type-check) et corrige automatiquement les erreurs si échec
---

# Check and Fix

Exécute `pnpm check` pour vérifier le lint et le type-check de tous les packages du monorepo.
Si des erreurs sont détectées, corrige-les automatiquement.

## Instructions

1. **Exécuter la vérification complète**
   - Lance `pnpm check` à la racine du projet
   - Capture la sortie complète (stdout et stderr)

2. **Analyser les résultats**
   - Si la commande réussit (exit code 0) : affiche un message de succès
   - Si la commande échoue (exit code != 0) : passe à l'étape de correction

3. **En cas d'échec - Corriger les erreurs**
   - Pour les erreurs ESLint auto-fixables : exécute `pnpm lint:fix`
   - Pour les erreurs TypeScript : analyse les erreurs et corrige les fichiers concernés
   - Après correction, relance `pnpm check` pour vérifier

4. **Rapport final**
   - Liste les fichiers modifiés
   - Indique si toutes les erreurs ont été corrigées
   - S'il reste des erreurs non auto-fixables, liste-les clairement

## Notes importantes

- Ne corrige PAS les warnings, seulement les erreurs bloquantes
- Privilégie les corrections minimales et ciblées
- Ne modifie pas la logique métier, uniquement les problèmes de style/typage
- Si une erreur nécessite une décision architecturale, demande confirmation à l'utilisateur
