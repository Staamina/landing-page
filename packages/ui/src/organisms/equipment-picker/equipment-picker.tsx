'use client';

import * as React from 'react';

import type { Equipment, Category } from '@staamina/types';

import { SearchInput } from '@staamina/ui/search-input';
import { useTranslation } from '@staamina/ui/i18n';
import { useDebounce } from '@staamina/ui/hooks';
import { cn } from '@staamina/ui/utils';
import { CategoryNavigation } from './components/category-navigation';
import { CategorySearchResults } from './components/category-search-results';
import { EquipmentCategoryList } from './components/equipment-category-list';
import {
  buildCategoryHierarchy,
  buildCategorySearchIndex,
  createRootNode,
  filterCategoriesBySearch,
  isLeafCategory,
  ROOT_CATEGORY_ID,
} from './equipment-picker.utils';
import { useEquipmentPicker } from './hooks/use-equipment-picker';

export interface EquipmentPickerProps {
  value?: Equipment | null;
  onChange: (equipment: Equipment | null) => void;
  placeholder?: string;
  className?: string;
  categories?: Category[];
  isLoadingCategories?: boolean;
  onRetryCategories?: () => void;
  equipmentByCategory?: Equipment[];
  isLoadingEquipmentByCategory?: boolean;
  equipmentByCategoryError?: { message?: string } | null;
  onSelectedCategoryChange?: (categoryId: string | null) => void;
}

export const EquipmentPicker = React.forwardRef<
  HTMLDivElement,
  EquipmentPickerProps
>(
  (
    {
      value,
      onChange,
      placeholder,
      className,
      categories = [],
      isLoadingCategories = false,
      onRetryCategories,
      equipmentByCategory = [],
      isLoadingEquipmentByCategory = false,
      equipmentByCategoryError,
      onSelectedCategoryChange,
    },
    ref
  ) => {
    const { t } = useTranslation();

    const defaultPlaceholder = placeholder ?? t.ui.searchEquipment;

    const categoryHierarchy = React.useMemo(
      () => buildCategoryHierarchy(categories),
      [categories]
    );

    const rootNode = React.useMemo(
      () => createRootNode(categoryHierarchy),
      [categoryHierarchy]
    );

    const { state, handlers } = useEquipmentPicker({
      rootNode,
      categoryHierarchy,
      value,
      onChange,
      onRetry: onRetryCategories || (() => {}),
    });

    const {
      handleSearchChange,
      handleSearchKeyDown,
      handleDebouncedSearchChange,
      handleClearAll,
      handleCategoryClick,
      handleCategorySearchClick,
      handleEquipmentClick,
    } = handlers;

    const { searchQuery, debouncedSearchQuery } = state;

    const selectedCategoryValue =
      state.selectedCategory.id === ROOT_CATEGORY_ID
        ? null
        : state.selectedCategory.id;

    const lastSelectedCategoryValue = React.useRef(selectedCategoryValue);

    const onSelectedCategoryChangeRef = React.useRef(onSelectedCategoryChange);

    React.useEffect(() => {
      onSelectedCategoryChangeRef.current = onSelectedCategoryChange;
    }, [onSelectedCategoryChange]);

    React.useEffect(() => {
      if (lastSelectedCategoryValue.current !== selectedCategoryValue) {
        lastSelectedCategoryValue.current = selectedCategoryValue;
        onSelectedCategoryChangeRef.current?.(selectedCategoryValue);
      }
    }, [selectedCategoryValue]);

    useDebounce(searchQuery, 300, handleDebouncedSearchChange);

    const isLoading = isLoadingCategories;
    const isSearching = searchQuery !== debouncedSearchQuery;

    const visibleCategories = React.useMemo(() => {
      return state.selectedCategory.children.map((child) => ({
        id: child.id,
        name: child.name,
        parentId: child.parentId,
      }));
    }, [state.selectedCategory]);

    const searchIndex = React.useMemo(
      () => buildCategorySearchIndex(categoryHierarchy),
      [categoryHierarchy]
    );

    const categorySearchMatches = React.useMemo(() => {
      if (!debouncedSearchQuery.trim()) return [];
      return filterCategoriesBySearch(searchIndex, debouncedSearchQuery);
    }, [searchIndex, debouncedSearchQuery]);

    const isSearchMode = debouncedSearchQuery.trim() !== '';
    const isCategorySelected = state.selectedCategory.id !== ROOT_CATEGORY_ID;
    const isSelectedCategoryLeaf =
      isCategorySelected && isLeafCategory(state.selectedCategory);
    const showEquipmentList =
      isCategorySelected && isSelectedCategoryLeaf && !isSearchMode;

    return (
      <div
        ref={ref}
        className={cn(
          'equipment-picker flex w-full min-w-0 flex-col gap-2 overflow-x-hidden',
          className
        )}
      >
        <SearchInput
          value={searchQuery}
          onChange={handleSearchChange}
          onKeyDown={handleSearchKeyDown}
          onClear={handleClearAll}
          placeholder={defaultPlaceholder}
          className="min-h-[44px]"
          isLoading={isSearching || isLoading}
          showClearButton={
            (!!searchQuery || state.selectedCategory.id !== ROOT_CATEGORY_ID) &&
            !isSearching &&
            !isLoading
          }
        />

        {isSearchMode && (
          <CategorySearchResults
            matches={categorySearchMatches}
            onCategoryClick={handleCategorySearchClick}
            isLoading={isLoading}
            searchQuery={debouncedSearchQuery}
          />
        )}

        {categories.length > 0 && !isSearchMode && (
          <CategoryNavigation
            selectedCategory={state.selectedCategory}
            visibleCategories={visibleCategories}
            onCategoryClick={handleCategoryClick}
            onHomeClick={handleClearAll}
          />
        )}

        {showEquipmentList && (
          <EquipmentCategoryList
            selectedEquipment={value}
            onEquipmentClick={handleEquipmentClick}
            selectedCategory={state.selectedCategory}
            equipmentByCategory={equipmentByCategory}
            isLoadingEquipmentByCategory={isLoadingEquipmentByCategory}
            equipmentByCategoryError={equipmentByCategoryError}
          />
        )}

        {!isSearchMode && !isCategorySelected && !isLoading && (
          <div className="flex items-center justify-center py-8 text-sm text-text-secondary">
            {t.ui.selectCategoryOrSearch}
          </div>
        )}
      </div>
    );
  }
);
