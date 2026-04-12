/**
 * Role names as defined in the Zitadel project.
 * These are the canonical role identifiers used across the platform.
 * Role assignments live in Zitadel; this enum is the shared reference list.
 */
export enum RoleName {
  SUPER_ADMINISTRATOR = 'SuperAdministrator',
  ADMINISTRATOR = 'Administrator',
  SITE_MANAGER = 'SiteManager',
  SITE_STAFF = 'SiteStaff',
  SITE_DIRECTOR = 'SiteDirector',
  SITE_ASSISTANT = 'SiteAssistant',
  SITE_OPERATIONS = 'SiteOperations',
  SITE_LOGISTICS_COORDINATOR = 'SiteLogisticsCoordinator',
  MERCHANDISING_MANAGER = 'MerchandisingManager',
  SITE_IT_DIGITAL_COORDINATOR = 'SiteItDigitalCoordinator',
  SECURITY_COORDINATOR = 'SecurityCoordinator',
  LOSS_PREVENTION = 'LossPrevention',
  REGIONAL_MANAGER = 'RegionalManager',
  AREA_MANAGER = 'AreaManager',
  RETAIL_OPERATIONS = 'RetailOperations',
  HEADQUARTERS_SITE_SUPPORT = 'HeadquartersSiteSupport',
  EXTERNAL_SERVICE_PROVIDER = 'ExternalServiceProvider',
}

export const ROLE_NAMES: string[] = Object.values(RoleName);
