'use client';

import * as React from 'react';
import { Drawer as DrawerPrimitive } from 'vaul';

import { cn } from '@staamina/ui/utils';

export const DrawerRoot = ({
  shouldScaleBackground = true,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Root>) => (
  <DrawerPrimitive.Root
    shouldScaleBackground={shouldScaleBackground}
    {...props}
  />
);

export const DrawerPortal = DrawerPrimitive.Portal;

export const DrawerOverlay = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Overlay
    ref={ref}
    className={cn('fixed inset-0 z-50 bg-overlay', className)}
    {...props}
  />
));

export const DrawerContent = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content>
>(({ className, style, children, ...props }, ref) => (
  <DrawerPortal>
    <DrawerOverlay />
    <DrawerPrimitive.Content
      ref={ref}
      className={cn(
        'fixed inset-x-0 bottom-0 z-50 flex max-h-[90vh] flex-col rounded-t-[10px] border border-border-default bg-surface shadow-[0_-4px_20px_var(--color-shadow-md)] dark:shadow-[0_-4px_20px_var(--color-shadow-lg)]',
        className
      )}
      style={{
        ...style,
        backgroundColor: 'var(--color-surface)',
      }}
      {...props}
    >
      <div
        className="mx-auto mt-3 h-1.5 w-16 shrink-0 rounded-full bg-border-strong"
        aria-hidden
      />
      {children}
    </DrawerPrimitive.Content>
  </DrawerPortal>
));
DrawerContent.displayName = 'DrawerContent';

export const DrawerHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'grid shrink-0 gap-1 p-4 pb-2 text-center sm:text-left',
      className
    )}
    {...props}
  />
);
DrawerHeader.displayName = 'DrawerHeader';

export const DrawerFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'shrink-0 flex flex-col gap-3 p-4 pt-3 border-t border-border-default',
      className
    )}
    {...props}
  />
);
DrawerFooter.displayName = 'DrawerFooter';

export const DrawerTitle = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Title
    ref={ref}
    className={cn(
      'text-lg font-semibold leading-tight tracking-tight text-text-primary',
      className
    )}
    {...props}
  />
));
DrawerTitle.displayName = DrawerPrimitive.Title.displayName;

export const DrawerDescription = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Description
    ref={ref}
    className={cn('text-sm text-text-secondary leading-snug', className)}
    {...props}
  />
));
DrawerDescription.displayName = DrawerPrimitive.Description.displayName;

type DrawerComposantProps = {
  isOpen: boolean;
  Title?: React.ReactNode;
  Description?: React.ReactNode;
  children?: React.ReactNode;
  Footer?: React.ReactNode;
  onClose?: () => void;
};

export const Drawer = ({
  isOpen,
  Title,
  Description,
  children,
  Footer,
  onClose,
}: DrawerComposantProps) => {
  return (
    <DrawerRoot open={isOpen} onOpenChange={(open) => !open && onClose?.()}>
      <DrawerContent>
        <DrawerHeader>
          {Title && <DrawerTitle>{Title}</DrawerTitle>}
          {Description && <DrawerDescription>{Description}</DrawerDescription>}
        </DrawerHeader>
        {/*
         * data-vaul-no-drag prevents vaul from intercepting pointer events.
         * select-text overrides [data-vaul-drawer]{ user-select: none } which
         * vaul applies on desktop (hover:hover and pointer:fine media query).
         */}
        <div
          className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden px-4 pb-6 select-text"
          data-vaul-no-drag
        >
          {children}
        </div>
        {Footer && <DrawerFooter>{Footer}</DrawerFooter>}
      </DrawerContent>
    </DrawerRoot>
  );
};
