'use client';

import { ChevronDown } from 'lucide-react';
import * as React from 'react';

import { Button, buttonVariants, type ButtonProps } from '@staamina/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@staamina/ui/menu';
import { cn } from '@staamina/ui/utils';

export interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
  ({ className, children, ...props }, ref) => {
    const childrenArray = React.Children.toArray(children);

    return (
      <div
        ref={ref}
        className={cn('inline-flex', className)}
        role="group"
        {...props}
      >
        {React.Children.map(children, (child, index) => {
          if (!React.isValidElement(child)) {
            return child;
          }

          const isFirst = index === 0;
          const isLast = index === childrenArray.length - 1;
          const isButtonWithDropdown =
            (child.type as React.ComponentType)?.displayName ===
              'ButtonWithDropdown' || child.props['data-button-with-dropdown'];

          if (isButtonWithDropdown) {
            return React.cloneElement(child as React.ReactElement, {
              isFirstInGroup: isFirst,
              isLastInGroup: isLast,
            });
          }

          const additionalStyles: React.CSSProperties = {};

          if (!isFirst) {
            additionalStyles.borderTopLeftRadius = '0';
            additionalStyles.borderBottomLeftRadius = '0';
          }
          if (!isLast) {
            additionalStyles.borderTopRightRadius = '0';
            additionalStyles.borderBottomRightRadius = '0';
          }

          return React.cloneElement(child as React.ReactElement, {
            className: cn(child.props.className, !isFirst && '-ml-px'),
            style: {
              ...child.props.style,
              ...additionalStyles,
            },
          });
        })}
      </div>
    );
  }
);
ButtonGroup.displayName = 'ButtonGroup';

export interface ButtonWithDropdownProps extends ButtonProps {
  dropdownItems: Array<{
    label: string;
    onClick: () => void;
    disabled?: boolean;
  }>;
  dropdownTriggerClassName?: string;
  isFirstInGroup?: boolean;
  isLastInGroup?: boolean;
}

export const ButtonWithDropdown = React.forwardRef<
  HTMLButtonElement,
  ButtonWithDropdownProps
>(
  (
    {
      className,
      dropdownItems,
      dropdownTriggerClassName,
      intent = 'neutral',
      appearance = 'solid',
      size = 'default',
      children,
      isFirstInGroup,
      isLastInGroup,
      ...props
    },
    ref
  ) => {
    const isStandalone =
      isFirstInGroup === undefined && isLastInGroup === undefined;
    const shouldRoundLeft = isStandalone || isFirstInGroup;
    const shouldRoundRight = isStandalone || isLastInGroup;

    return (
      <div className={cn('inline-flex', className)} data-button-with-dropdown>
        <Button
          ref={ref}
          className={cn(!shouldRoundLeft && '-ml-px')}
          style={{
            borderTopLeftRadius: shouldRoundLeft
              ? 'var(--button-primary-border-radius)'
              : '0',
            borderBottomLeftRadius: shouldRoundLeft
              ? 'var(--button-primary-border-radius)'
              : '0',
            borderTopRightRadius: '0',
            borderBottomRightRadius: '0',
          }}
          intent={intent}
          appearance={appearance}
          size={size}
          {...props}
        >
          {children}
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger
            className={cn(
              buttonVariants({ intent, appearance, size }),
              '-ml-px px-2',
              dropdownTriggerClassName
            )}
            style={{
              borderTopLeftRadius: '0',
              borderBottomLeftRadius: '0',
              borderTopRightRadius: shouldRoundRight
                ? 'var(--button-primary-border-radius)'
                : '0',
              borderBottomRightRadius: shouldRoundRight
                ? 'var(--button-primary-border-radius)'
                : '0',
            }}
            asChild
          >
            <button type="button" aria-label="Open dropdown menu">
              <ChevronDown className="h-4 w-4" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {dropdownItems.map((item, index) => (
              <DropdownMenuItem
                key={index}
                onClick={item.onClick}
                disabled={item.disabled}
              >
                {item.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  }
);
ButtonWithDropdown.displayName = 'ButtonWithDropdown';
