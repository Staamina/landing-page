'use client';

import * as React from 'react';

import { useTranslation } from '@staamina/ui/i18n';
import type {
  CategorySearchMatch,
  CategoryTreeNode,
} from '../category-picker.utils';
import { CategorySearchResult } from './category-search-result';

export interface CategorySearchResultsProps {
  matches: CategorySearchMatch[];
  onCategoryClick: (category: CategoryTreeNode) => void;
  isLoading?: boolean;
  searchQuery?: string;
}

export const CategorySearchResults = React.memo<CategorySearchResultsProps>(
  ({ matches, onCategoryClick, isLoading, searchQuery }) => {
    const { t } = useTranslation();

    if (isLoading) {
      return null;
    }

    if (!searchQuery || searchQuery.trim() === '') {
      return null;
    }

    if (matches.length === 0) {
      return (
        <div className="flex items-center justify-center py-8 text-sm text-text-secondary">
          {t.ui.noCategoriesFound}
        </div>
      );
    }

    return (
      <div className="flex w-full min-w-0 flex-col gap-2">
        <div className="text-xs font-medium text-text-secondary px-1">
          {t.ui.categorySearchResults} ({matches.length})
        </div>
        <div className="flex max-h-96 w-full min-w-0 flex-col gap-2 overflow-x-hidden overflow-y-auto scrollbar-hide">
          {matches.map((match) => (
            <CategorySearchResult
              key={match.category.id}
              breadcrumb={match.breadcrumb}
              matchedQuery={match.matchedQuery}
              onCategoryClick={onCategoryClick}
            />
          ))}
        </div>
      </div>
    );
  }
);

CategorySearchResults.displayName = 'CategorySearchResults';
