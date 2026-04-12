'use client';

import * as React from 'react';
import * as ToastPrimitives from '@radix-ui/react-toast';
import { cva } from 'class-variance-authority';
import { AlertTriangle, CheckCircle2, Info, X, XCircle } from 'lucide-react';

import { cn } from '@staamina/ui/utils';

import type { ToastType } from './toast.types';

export const ToastProvider = ToastPrimitives.Provider;

export const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Viewport
    ref={ref}
    className={cn(
      // Desktop: top-right stacked column
      'fixed top-4 right-4 z-[100] flex max-h-screen w-full max-w-[420px] flex-col gap-2',
      // Mobile: top-center strip
      'max-sm:bottom-auto max-sm:right-0 max-sm:top-4 max-sm:max-w-full max-sm:flex-col max-sm:items-center max-sm:px-4',
      className
    )}
    {...props}
  />
));
ToastViewport.displayName = ToastPrimitives.Viewport.displayName;

const toastVariants = cva(
  [
    'group pointer-events-auto relative flex w-full items-start gap-3 overflow-hidden rounded-lg border p-4 shadow-lg',
    'bg-surface transition-all',
    'data-[state=open]:animate-in data-[state=closed]:animate-out',
    'data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full',
    'data-[state=open]:slide-in-from-top-full',
    'data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)]',
    'data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-[transform_200ms_ease-out]',
    'data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=end]:animate-out',
  ].join(' '),
  {
    variants: {
      // Named 'toastType' to avoid collision with Radix Root's native 'type' prop
      toastType: {
        success: 'border-semantic-success/30',
        error: 'border-semantic-error/30',
        warning: 'border-semantic-warning/30',
        info: 'border-brand-primary/30',
      },
    },
    defaultVariants: { toastType: 'info' },
  }
);

const TOAST_ICONS: Record<ToastType, React.ElementType> = {
  success: CheckCircle2,
  error: XCircle,
  warning: AlertTriangle,
  info: Info,
};

const ICON_CLASSES: Record<ToastType, string> = {
  success: 'text-semantic-success mt-0.5 shrink-0',
  error: 'text-semantic-error mt-0.5 shrink-0',
  warning: 'text-semantic-warning mt-0.5 shrink-0',
  info: 'text-brand-primary mt-0.5 shrink-0',
};

export interface ToastProps extends Omit<
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root>,
  'type'
> {
  toastType?: ToastType;
  className?: string;
}

export const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Root>,
  ToastProps
>(({ className, toastType = 'info', children, ...props }, ref) => {
  const Icon = TOAST_ICONS[toastType];

  return (
    <ToastPrimitives.Root
      ref={ref}
      className={cn(toastVariants({ toastType }), className)}
      {...props}
    >
      <Icon className={cn('h-5 w-5', ICON_CLASSES[toastType])} />
      <div className="min-w-0 flex-1">{children}</div>
      <ToastClose />
    </ToastPrimitives.Root>
  );
});
Toast.displayName = ToastPrimitives.Root.displayName;

export const ToastClose = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Close>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Close
    ref={ref}
    className={cn(
      'shrink-0 rounded-md p-1 text-text-tertiary opacity-0 transition-opacity',
      'hover:text-text-primary hover:opacity-100',
      'group-hover:opacity-100 focus:opacity-100 focus:outline-none focus:ring-1 focus:ring-border',
      className
    )}
    {...props}
  >
    <X className="h-4 w-4" />
  </ToastPrimitives.Close>
));
ToastClose.displayName = ToastPrimitives.Close.displayName;

export const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Title
    ref={ref}
    className={cn('text-sm font-semibold text-text-primary', className)}
    {...props}
  />
));
ToastTitle.displayName = ToastPrimitives.Title.displayName;

export const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Description
    ref={ref}
    className={cn('text-sm text-text-secondary', className)}
    {...props}
  />
));
ToastDescription.displayName = ToastPrimitives.Description.displayName;
