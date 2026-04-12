'use client';

import { ChevronRight, Home } from 'lucide-react';
import * as React from 'react';

import type { Category } from '@staamina/types';

import type { CategoryTreeNode } from '../category-picker.utils';
import {
  getCategoryBreadcrumb,
  ROOT_CATEGORY_ID,
} from '../category-picker.utils';
import { CategoryChip } from './category-chip';

export interface CategoryNavigationProps {
  selectedCategory: CategoryTreeNode;
  visibleCategories: Category[];
  onCategoryClick: (category: Category) => void;
  onHomeClick: () => void;
}

export const CategoryNavigation = React.memo<CategoryNavigationProps>(
  ({ selectedCategory, visibleCategories, onCategoryClick, onHomeClick }) => {
    const showCategories = visibleCategories.length > 0;
    const isRoot = selectedCategory.id === ROOT_CATEGORY_ID;

    // Build breadcrumb path: ancestors + current (if not root)
    const breadcrumbPath = React.useMemo(() => {
      if (isRoot) return [];
      return getCategoryBreadcrumb(selectedCategory);
    }, [selectedCategory, isRoot]);

    // Max height for 5 categories: 5 chips (44px each) + 4 gaps (8px each) = 252px
    const maxCategoriesHeight = 'max-h-[252px]';

    return (
      <div className="flex w-full flex-col gap-2">
        {!isRoot && (
          <nav
            aria-label="Breadcrumb"
            className="mb-2 flex items-center text-sm text-text-secondary overflow-x-auto whitespace-nowrap pb-2"
          >
            <button
              type="button"
              onClick={onHomeClick}
              className="flex items-center hover:text-text-primary transition-colors"
              aria-label="Clear selection"
            >
              <Home className="h-4 w-4 mr-1" />
            </button>

            {breadcrumbPath.map((node, index) => {
              const isLast = index === breadcrumbPath.length - 1;
              return (
                <React.Fragment key={node.id}>
                  <ChevronRight className="mx-1 h-4 w-4 text-text-tertiary" />
                  {isLast ? (
                    <span className="font-medium text-text-primary">
                      {node.name}
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => onCategoryClick(node)}
                      className="hover:text-text-primary hover:underline transition-colors"
                    >
                      {node.name}
                    </button>
                  )}
                </React.Fragment>
              );
            })}
          </nav>
        )}

        {showCategories && (
          <div
            className={`flex flex-col gap-2 overflow-y-auto ${maxCategoriesHeight}`}
          >
            {visibleCategories.map((category) => (
              <CategoryChip
                key={category.id}
                category={category}
                isSelected={selectedCategory.id === category.id}
                onClick={() => onCategoryClick(category)}
                className="w-full flex-shrink-0"
              />
            ))}
          </div>
        )}
      </div>
    );
  }
);

CategoryNavigation.displayName = 'CategoryNavigation';
