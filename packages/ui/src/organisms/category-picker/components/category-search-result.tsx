'use client';

import { ChevronRight } from 'lucide-react';
import * as React from 'react';

import type { CategoryTreeNode } from '../category-picker.utils';
import { cn } from '@staamina/ui/utils';

export interface CategorySearchResultProps {
  breadcrumb: CategoryTreeNode[];
  matchedQuery: string;
  onCategoryClick: (category: CategoryTreeNode) => void;
}

/**
 * Highlights the matched query in the text with a yellow background
 */
function highlightMatch(text: string, query: string): React.ReactNode {
  if (!query.trim()) return text;

  const lowerText = text.toLowerCase();
  const lowerQuery = query.toLowerCase();
  const index = lowerText.indexOf(lowerQuery);

  if (index === -1) return text;

  const before = text.slice(0, index);
  const match = text.slice(index, index + query.length);
  const after = text.slice(index + query.length);

  return (
    <>
      {before}
      <mark className="bg-highlight rounded px-0.5">{match}</mark>
      {after}
    </>
  );
}

export const CategorySearchResult = React.memo<CategorySearchResultProps>(
  ({ breadcrumb, matchedQuery, onCategoryClick }) => {
    if (breadcrumb.length === 0) return null;

    // For a root category (single item in breadcrumb), just show the name
    if (breadcrumb.length === 1) {
      const category = breadcrumb[0];
      return (
        <button
          type="button"
          onClick={() => onCategoryClick(category)}
          className={cn(
            'flex w-full items-center gap-2 rounded-md border border-border-default bg-surface px-3 py-2.5',
            'text-sm text-left transition-colors hover:bg-hover hover:border-border-hover',
            'focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-1'
          )}
        >
          <span className="font-medium text-text-primary">
            {highlightMatch(category.name, matchedQuery)}
          </span>
        </button>
      );
    }

    // For subcategories, show the full breadcrumb
    return (
      <div
        className={cn(
          'flex w-full flex-wrap items-center gap-1 rounded-md border border-border-default bg-surface px-3 py-2.5',
          'text-sm transition-colors hover:border-border-hover'
        )}
      >
        {breadcrumb.map((category, index) => {
          const isLast = index === breadcrumb.length - 1;

          return (
            <React.Fragment key={category.id}>
              <button
                type="button"
                onClick={() => onCategoryClick(category)}
                className={cn(
                  'inline-flex items-center rounded px-1 py-0.5 transition-colors',
                  'hover:bg-hover focus:outline-none focus:ring-2 focus:ring-brand-primary',
                  isLast
                    ? 'font-medium text-text-primary'
                    : 'text-text-secondary'
                )}
              >
                {highlightMatch(category.name, matchedQuery)}
              </button>
              {!isLast && (
                <ChevronRight className="h-3 w-3 flex-shrink-0 text-text-tertiary" />
              )}
            </React.Fragment>
          );
        })}
      </div>
    );
  }
);

CategorySearchResult.displayName = 'CategorySearchResult';
