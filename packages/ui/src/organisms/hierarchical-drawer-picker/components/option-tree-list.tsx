'use client';

import * as React from 'react';

import { cn } from '@staamina/ui/utils';

import {
  DidacticsContext,
  type DidacticsContextValue,
} from '../contexts/didactics-context';
import { usePrefersHoverNone } from '../hooks/use-prefers-hover-none';
import type { HierarchicalOption } from '../types';
import { getCurrentOptions } from '../utils/tree-utils';
import { OptionRow } from './option-row';

export interface OptionTreeListProps {
  options: HierarchicalOption[];
  selectedValue: string | null;
  onSelect: (node: HierarchicalOption) => void;
  currentPath: string[];
  onDrillDown: (value: string) => void;
  className?: string;
}

export const OptionTreeList = React.forwardRef<
  HTMLDivElement,
  OptionTreeListProps
>(
  (
    { options, selectedValue, onSelect, currentPath, onDrillDown, className },
    ref
  ) => {
    const prefersHoverNone = usePrefersHoverNone();

    const [openDidacticsValue, setOpenDidacticsValue] = React.useState<
      string | null
    >(null);

    React.useEffect(() => {
      setOpenDidacticsValue(null);
    }, [currentPath]);

    const currentOptions = React.useMemo(
      () => getCurrentOptions(options, currentPath),
      [options, currentPath]
    );

    const didacticsCtx = React.useMemo<DidacticsContextValue>(
      () => ({
        prefersHoverNone,
        openDidacticsValue,
        onDidacticsOpenChange: setOpenDidacticsValue,
      }),
      [prefersHoverNone, openDidacticsValue]
    );

    const content = React.useMemo(
      () =>
        currentOptions.map((node) => (
          <OptionRow
            key={node.value}
            node={node}
            isSelected={node.value === selectedValue}
            onDrillDown={onDrillDown}
            onSelect={onSelect}
          />
        )),
      [currentOptions, selectedValue, onSelect, onDrillDown]
    );

    return (
      <DidacticsContext.Provider value={didacticsCtx}>
        <div
          ref={ref}
          className={cn('flex flex-col', className)}
          role="listbox"
          aria-label="Options"
        >
          <div className="flex flex-col">{content}</div>
        </div>
      </DidacticsContext.Provider>
    );
  }
);

OptionTreeList.displayName = 'OptionTreeList';
