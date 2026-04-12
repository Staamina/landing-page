export { EquipmentPicker } from './equipment-picker';
export type { EquipmentPickerProps } from './equipment-picker';
export { CategoryChip } from './components/category-chip';
export type { CategoryChipProps } from './components/category-chip';
export { CategoryNavigation } from './components/category-navigation';
export type { CategoryNavigationProps } from './components/category-navigation';
export { CategorySearchResult } from './components/category-search-result';
export type { CategorySearchResultProps } from './components/category-search-result';
export { CategorySearchResults } from './components/category-search-results';
export type { CategorySearchResultsProps } from './components/category-search-results';
export { EquipmentCard } from './components/equipment-card';
export type { EquipmentCardProps } from './components/equipment-card';
export { EquipmentSearchResults } from './components/equipment-search-results';
export type { EquipmentSearchResultsProps } from './components/equipment-search-results';
export { EquipmentCategoryList } from './components/equipment-category-list';
export type { EquipmentCategoryListProps } from './components/equipment-category-list';
export { useEquipmentByCategory } from './hooks/use-equipment-by-category';
export type { UseEquipmentByCategoryOptions } from './hooks/use-equipment-by-category';
export {
  useEquipmentPicker,
  EquipmentPickerActionType,
} from './hooks/use-equipment-picker';
export type { UseEquipmentPickerOptions } from './hooks/use-equipment-picker';
export {
  buildCategoryHierarchy,
  createRootNode,
  filterCategoriesBySearch,
  getCategoryBreadcrumb,
  getAllDescendantIds,
  getAllAncestorIds,
  isLeafCategory,
  ROOT_CATEGORY_ID,
} from './equipment-picker.utils';
export type {
  CategoryTreeNode,
  CategorySearchMatch,
} from './equipment-picker.utils';
export type { Equipment, Category } from '@staamina/types';
