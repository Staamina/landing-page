'use client';

import { cva } from 'class-variance-authority';
import { ChevronRight } from 'lucide-react';
import * as React from 'react';

import { Tooltip } from '@staamina/ui/tooltip';

import {
  DidacticsContext,
  type DidacticsContextValue,
} from '../contexts/didactics-context';
import type { HierarchicalOption } from '../types';

export const optionRowVariants = cva(
  'flex w-full min-w-0 cursor-pointer items-center gap-2 border-b border-border-default py-4 text-left transition-colors last:border-b-0 hover:bg-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2',
  {
    variants: {
      selected: {
        true: 'bg-brand-primary/5 font-medium text-brand-primary',
        false: '',
      },
    },
    defaultVariants: {
      selected: false,
    },
  }
);

export interface OptionRowProps {
  node: HierarchicalOption;
  isSelected: boolean;
  onDrillDown: (value: string) => void;
  onSelect: (node: HierarchicalOption) => void;
}

export const OptionRow = React.memo<OptionRowProps>(function OptionRow({
  node,
  isSelected,
  onDrillDown,
  onSelect,
}) {
  const hasChildren = Boolean(node.children?.length);
  const { prefersHoverNone, openDidacticsValue, onDidacticsOpenChange } =
    React.useContext<DidacticsContextValue>(DidacticsContext);
  const isTooltipOpen = prefersHoverNone && openDidacticsValue === node.value;

  const handleRowClick = () => {
    if (hasChildren) {
      onDrillDown(node.value);
    } else {
      onSelect(node);
    }
  };

  const optionAriaLabel = hasChildren
    ? `${node.label}, has subcategories`
    : node.label;

  const handleDidacticsClick = React.useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      onDidacticsOpenChange(
        openDidacticsValue === node.value ? null : node.value
      );
    },
    [node.value, onDidacticsOpenChange, openDidacticsValue]
  );

  const handleTooltipOpenChange = React.useCallback(
    (open: boolean) => {
      if (!open) {
        onDidacticsOpenChange(null);
      }
    },
    [onDidacticsOpenChange]
  );

  const didacticsIcon = node.didactics ? (
    <Tooltip
      content={node.didactics.tooltip}
      side="top"
      open={prefersHoverNone ? isTooltipOpen : undefined}
      onOpenChange={prefersHoverNone ? handleTooltipOpenChange : undefined}
    >
      <span
        className="flex shrink-0 text-text-tertiary touch-manipulation"
        aria-hidden={prefersHoverNone ? undefined : true}
        role={prefersHoverNone ? 'button' : undefined}
        aria-label={prefersHoverNone ? node.didactics.tooltip : undefined}
        onClick={prefersHoverNone ? handleDidacticsClick : undefined}
      >
        {node.didactics.icon}
      </span>
    </Tooltip>
  ) : null;

  return (
    <div
      role="option"
      tabIndex={0}
      onClick={handleRowClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleRowClick();
        }
      }}
      className={optionRowVariants({ selected: isSelected })}
      aria-label={optionAriaLabel}
      aria-selected={isSelected}
    >
      {didacticsIcon}
      <span className="min-w-0 flex-1 truncate text-base text-text-primary">
        {node.label}
      </span>
      {hasChildren ? (
        <ChevronRight
          className="h-5 w-5 shrink-0 text-text-secondary"
          aria-hidden
        />
      ) : null}
    </div>
  );
});
