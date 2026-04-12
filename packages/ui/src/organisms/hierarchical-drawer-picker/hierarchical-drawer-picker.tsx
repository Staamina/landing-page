'use client';

import { cva } from 'class-variance-authority';
import { ArrowLeft, X } from 'lucide-react';
import * as React from 'react';

import {
  DrawerContent,
  DrawerHeader,
  DrawerRoot,
  DrawerTitle,
} from '@staamina/ui/drawer';
import { Tooltip } from '@staamina/ui/tooltip';
import { cn } from '@staamina/ui/utils';

import { OptionTreeList } from './components/option-tree-list';
import { getNodeAtPath } from './utils/tree-utils';
import { usePrefersHoverNone } from './hooks/use-prefers-hover-none';
import { PickerTrigger } from './components/picker-trigger';
import type { HierarchicalOption, HierarchicalOptionValue } from './types';

const drawerContentVariants = cva(
  'fixed inset-0 z-50 flex h-screen max-h-none flex-col rounded-none border border-border-default bg-surface shadow-[0_-4px_20px_var(--color-shadow-md)] dark:shadow-[0_-4px_20px_var(--color-shadow-lg)] [&>div:first-of-type]:hidden'
);

const drawerHeaderVariants = cva(
  'flex flex-row items-center justify-between gap-4 border-b border-border-default p-4'
);

const drawerIconButtonVariants = cva(
  'flex shrink-0 items-center justify-center rounded text-text-secondary hover:bg-hover hover:text-text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2',
  {
    variants: {
      size: {
        back: 'size-10 rounded-lg',
        close: 'rounded p-2',
      },
    },
    defaultVariants: {
      size: 'close',
    },
  }
);

const drawerTitleVariants = cva(
  'min-w-0 truncate text-lg font-semibold leading-tight tracking-tight text-text-primary'
);

const drawerScrollAreaVariants = cva(
  'min-h-0 flex-1 overflow-y-auto overflow-x-hidden px-4 pb-[max(1.5rem,env(safe-area-inset-bottom))]'
);

const pickerRootVariants = cva('w-full min-w-0 max-w-full overflow-hidden');

export interface HierarchicalDrawerPickerProps {
  sectionLabel: string;
  sectionIcon?: React.ReactNode;
  value: HierarchicalOptionValue | null;
  options: HierarchicalOption[];
  onChange: (node: HierarchicalOption) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  isComplete?: boolean;
}

export const HierarchicalDrawerPicker = React.forwardRef<
  HTMLDivElement,
  HierarchicalDrawerPickerProps
>(
  (
    {
      sectionLabel,
      sectionIcon,
      value,
      options,
      onChange,
      placeholder = 'Choose…',
      className,
      disabled = false,
      isComplete,
    },
    ref
  ) => {
    const [open, setOpen] = React.useState(false);
    const [currentPath, setCurrentPath] = React.useState<string[]>([]);
    const [titleTooltipOpen, setTitleTooltipOpen] = React.useState(false);
    const prefersHoverNone = usePrefersHoverNone();

    const handleTriggerClick = () => {
      if (!disabled) {
        setCurrentPath([]);
        setOpen(true);
      }
    };

    const handleOpenChange = React.useCallback((nextOpen: boolean) => {
      setOpen(nextOpen);
      if (nextOpen) {
        setCurrentPath([]);
      }
    }, []);

    const handleSelect = (node: HierarchicalOption) => {
      onChange(node);
      setOpen(false);
    };

    const handleBack = React.useCallback(() => {
      setCurrentPath((prev) => prev.slice(0, -1));
    }, []);

    const handleDrillDown = React.useCallback((value: string) => {
      setTitleTooltipOpen(false);
      setCurrentPath((prev) => [...prev, value]);
    }, []);

    const valueLabel = value?.label ?? null;
    const showBackButton = currentPath.length > 0;
    const currentNode = getNodeAtPath(options, currentPath);
    const drawerTitle =
      currentPath.length === 0
        ? sectionLabel
        : (currentNode?.label ?? sectionLabel);
    const drawerTitleIcon =
      currentPath.length === 0 ? sectionIcon : currentNode?.didactics?.icon;

    return (
      <div ref={ref} className={cn(pickerRootVariants(), className)}>
        <PickerTrigger
          sectionLabel={sectionLabel}
          sectionIcon={sectionIcon}
          valueLabel={valueLabel}
          placeholder={placeholder}
          disabled={disabled}
          isComplete={isComplete}
          onClick={handleTriggerClick}
          aria-label={
            value
              ? `${sectionLabel}: ${value.label}`
              : `${sectionLabel}, ${placeholder}`
          }
        />
        <DrawerRoot open={open} onOpenChange={handleOpenChange}>
          <DrawerContent
            className={drawerContentVariants()}
            role="dialog"
            aria-modal="true"
            aria-label={drawerTitle}
          >
            <DrawerHeader className={drawerHeaderVariants()}>
              <div className="flex min-w-0 flex-1 items-center gap-2">
                {showBackButton && (
                  <button
                    type="button"
                    onClick={handleBack}
                    className={drawerIconButtonVariants({ size: 'back' })}
                    aria-label="Back"
                  >
                    <ArrowLeft className="h-5 w-5" />
                  </button>
                )}
                {drawerTitleIcon ? (
                  currentNode?.didactics?.tooltip ? (
                    <Tooltip
                      content={currentNode.didactics.tooltip}
                      side="bottom"
                      open={prefersHoverNone ? titleTooltipOpen : undefined}
                      onOpenChange={
                        prefersHoverNone
                          ? (v) => setTitleTooltipOpen(v)
                          : undefined
                      }
                    >
                      <span
                        className="flex shrink-0 text-text-secondary touch-manipulation"
                        aria-hidden={prefersHoverNone ? undefined : true}
                        role={prefersHoverNone ? 'button' : undefined}
                        aria-label={
                          prefersHoverNone
                            ? currentNode.didactics.tooltip
                            : undefined
                        }
                        onClick={
                          prefersHoverNone
                            ? () => setTitleTooltipOpen((v) => !v)
                            : undefined
                        }
                      >
                        {drawerTitleIcon}
                      </span>
                    </Tooltip>
                  ) : (
                    <span
                      className="flex shrink-0 text-text-secondary"
                      aria-hidden
                    >
                      {drawerTitleIcon}
                    </span>
                  )
                ) : null}
                <DrawerTitle className={drawerTitleVariants()}>
                  {drawerTitle}
                </DrawerTitle>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className={drawerIconButtonVariants({ size: 'close' })}
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </DrawerHeader>
            <div className={drawerScrollAreaVariants()}>
              <OptionTreeList
                options={options}
                selectedValue={value?.value ?? null}
                onSelect={handleSelect}
                currentPath={currentPath}
                onDrillDown={handleDrillDown}
              />
            </div>
          </DrawerContent>
        </DrawerRoot>
      </div>
    );
  }
);

HierarchicalDrawerPicker.displayName = 'HierarchicalDrawerPicker';
