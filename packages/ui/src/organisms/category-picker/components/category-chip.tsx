'use client';

import * as React from 'react';

import type { Category } from '@staamina/types';

import { cn } from '@staamina/ui/utils';
import { CardButton } from '@staamina/ui/card-button';

export interface CategoryChipProps {
  category: Category;
  isSelected?: boolean;
  onClick: () => void;
  className?: string;
}

export const CategoryChip = React.forwardRef<
  HTMLButtonElement,
  CategoryChipProps
>(({ category, isSelected, onClick, className }, ref) => {
  return (
    <CardButton
      ref={ref}
      onClick={onClick}
      isSelected={isSelected}
      className={cn(
        'category-chip h-11 min-h-[44px] justify-center px-4 font-medium',
        className
      )}
    >
      {category.name}
    </CardButton>
  );
});

CategoryChip.displayName = 'CategoryChip';
