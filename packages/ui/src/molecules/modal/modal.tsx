'use client';

import * as DialogPrimitive from '@radix-ui/react-dialog';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@staamina/ui/utils';

const modalContentVariants = cva(
  'fixed z-50 flex w-full flex-col modal-content duration-200 overflow-hidden data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]',
  {
    variants: {
      size: {
        xs: 'max-w-xs min-w-[18rem]',
        sm: 'max-w-sm min-w-[20rem]',
        md: 'max-w-md min-w-[24rem]',
        lg: 'max-w-lg min-w-[28rem]',
        xl: 'max-w-xl min-w-[32rem]',
        '2xl': 'max-w-2xl min-w-[min(100vw-2rem,36rem)]',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

const ModalRoot = DialogPrimitive.Root;

type ModalRootOwnProps = Pick<
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Root>,
  'open' | 'onOpenChange' | 'defaultOpen' | 'modal'
>;

interface ModalProps extends ModalRootOwnProps, ModalContentProps {}

const Modal = ({
  open,
  onOpenChange,
  defaultOpen,
  modal,
  children,
  ...contentProps
}: ModalProps) => (
  <ModalRoot
    open={open}
    onOpenChange={onOpenChange}
    defaultOpen={defaultOpen}
    modal={modal}
  >
    <ModalContent {...contentProps}>{children}</ModalContent>
  </ModalRoot>
);

const ModalTrigger = DialogPrimitive.Trigger;

const ModalPortal = DialogPrimitive.Portal;

const ModalClose = DialogPrimitive.Close;

const ModalOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      'fixed inset-0 z-50 modal-overlay data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      className
    )}
    {...props}
  />
));
ModalOverlay.displayName = DialogPrimitive.Overlay.displayName;

interface ModalContentProps
  extends
    React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>,
    VariantProps<typeof modalContentVariants> {}

const MODAL_IGNORE_OUTSIDE_SELECTOR = '[data-staamina-dropdown-content]';

const ModalContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  ModalContentProps
>(
  (
    { className, size, style, children, onPointerDownOutside, ...props },
    ref
  ) => {
    type PointerDownOutsideEvent = Parameters<
      NonNullable<ModalContentProps['onPointerDownOutside']>
    >[0];
    const handlePointerDownOutside = (e: PointerDownOutsideEvent) => {
      const target = e.detail?.originalEvent?.target;
      const el = target instanceof HTMLElement ? target : null;

      if (el?.closest?.(MODAL_IGNORE_OUTSIDE_SELECTOR)) {
        e.preventDefault();
        return;
      }

      onPointerDownOutside?.(e);
    };

    return (
      <ModalPortal>
        <ModalOverlay />
        <DialogPrimitive.Content
          ref={ref}
          className={cn(modalContentVariants({ size }), className)}
          style={{
            position: 'fixed',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            borderRadius: 'var(--radius-md, 6px)',
            backgroundColor: 'var(--color-surface)',
            gap: 'var(--modal-gap)',
            ...style,
          }}
          onPointerDownOutside={handlePointerDownOutside}
          {...props}
        >
          {children}
        </DialogPrimitive.Content>
      </ModalPortal>
    );
  }
);
ModalContent.displayName = DialogPrimitive.Content.displayName;

const ModalHeader = ({
  className,
  style,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn('flex flex-col gap-1 text-center sm:text-left', className)}
    style={style}
    {...props}
  />
);
ModalHeader.displayName = 'ModalHeader';

const ModalFooter = ({
  className,
  style,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'flex flex-col-reverse sm:flex-row sm:justify-center gap-3 border-t border-border-default',
      className
    )}
    style={style}
    {...props}
  />
);
ModalFooter.displayName = 'ModalFooter';

const ModalTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      'text-lg font-semibold leading-tight tracking-tight text-text-primary',
      className
    )}
    {...props}
  />
));
ModalTitle.displayName = DialogPrimitive.Title.displayName;

const ModalDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn('text-sm text-text-secondary leading-snug', className)}
    {...props}
  />
));
ModalDescription.displayName = DialogPrimitive.Description.displayName;

export {
  Modal,
  ModalRoot,
  ModalPortal,
  ModalOverlay,
  ModalClose,
  ModalTrigger,
  ModalHeader,
  ModalFooter,
  ModalTitle,
  ModalDescription,
};
export type { ModalProps };
