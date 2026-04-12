---
section: 'domain-overview'
parent: 'project-context'
rule_count: 4
last_updated: '2026-01-16'
---

# Project Domain: GMAIA

**Gestion de Maintenance Assistee par Intelligence Artificielle**

## Core Business

- Multi-tenant maintenance incident management platform
- Target sectors: Retail, Food Services, Gym, Hotel, Warehouse, Office
- NOT a sports facility management system

## Key Concepts

- **Company** = Tenant (multi-tenant with row-level isolation via `companyId`)
- **Site** = Physical location (store, restaurant, gym, etc.)
- **Equipment** = Assets requiring maintenance
- **Incident** = Maintenance request/issue
