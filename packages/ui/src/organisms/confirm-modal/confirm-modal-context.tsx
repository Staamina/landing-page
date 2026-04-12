'use client';

import * as React from 'react';

import { Button } from '@staamina/ui/button';
import {
  Modal,
  ModalHeader,
  ModalFooter,
  ModalTitle,
  ModalDescription,
} from '@staamina/ui/modal';

interface ConfirmModalState {
  open: boolean;
  title: string;
  body: string;
  confirmLabel: string;
  cancelLabel: string;
  confirmVariant:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link';
  resolve: ((value: boolean) => void) | null;
}

interface ConfirmModalContextValue {
  confirm: (options: {
    title: string;
    body: string;
    confirmLabel?: string;
    cancelLabel?: string;
    confirmVariant?:
      | 'default'
      | 'destructive'
      | 'outline'
      | 'secondary'
      | 'ghost'
      | 'link';
  }) => Promise<boolean>;
}

const ConfirmModalContext =
  React.createContext<ConfirmModalContextValue | null>(null);

export function ConfirmModalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, setState] = React.useState<ConfirmModalState>({
    open: false,
    title: '',
    body: '',
    confirmLabel: 'Confirm',
    cancelLabel: 'Cancel',
    confirmVariant: 'default',
    resolve: null,
  });

  const confirm = React.useCallback(
    (options: {
      title: string;
      body: string;
      confirmLabel?: string;
      cancelLabel?: string;
      confirmVariant?:
        | 'default'
        | 'destructive'
        | 'outline'
        | 'secondary'
        | 'ghost'
        | 'link';
    }): Promise<boolean> => {
      return new Promise<boolean>((resolve) => {
        setState({
          open: true,
          title: options.title,
          body: options.body,
          confirmLabel: options.confirmLabel ?? 'Confirm',
          cancelLabel: options.cancelLabel ?? 'Cancel',
          confirmVariant: options.confirmVariant ?? 'default',
          resolve,
        });
      });
    },
    []
  );

  const handleConfirm = () => {
    if (state.resolve) {
      state.resolve(true);
    }
    setState((prev) => ({ ...prev, open: false, resolve: null }));
  };

  const handleCancel = () => {
    if (state.resolve) {
      state.resolve(false);
    }
    setState((prev) => ({ ...prev, open: false, resolve: null }));
  };

  const handleOpenChange = (open: boolean) => {
    if (!open && state.resolve) {
      state.resolve(false);
    }
    setState((prev) => ({
      ...prev,
      open,
      resolve: open ? prev.resolve : null,
    }));
  };

  return (
    <ConfirmModalContext.Provider value={{ confirm }}>
      {children}
      <Modal
        open={state.open}
        onOpenChange={handleOpenChange}
        size="xs"
        className="flex max-h-[90vh] flex-col"
      >
        <ModalHeader>
          <ModalTitle>{state.title}</ModalTitle>
        </ModalHeader>
        <div className="min-h-0 flex-1 overflow-y-auto px-4 pb-4">
          <ModalDescription className="pt-0">{state.body}</ModalDescription>
        </div>
        <ModalFooter>
          <Button
            type="button"
            size="sm"
            intent="neutral"
            appearance="outline"
            onClick={handleCancel}
          >
            {state.cancelLabel}
          </Button>
          <Button
            type="button"
            size="sm"
            intent={
              state.confirmVariant === 'destructive'
                ? 'danger'
                : state.confirmVariant === 'secondary'
                  ? 'secondary'
                  : 'primary'
            }
            appearance={
              state.confirmVariant === 'outline'
                ? 'outline'
                : state.confirmVariant === 'ghost'
                  ? 'ghost'
                  : 'solid'
            }
            onClick={handleConfirm}
          >
            {state.confirmLabel}
          </Button>
        </ModalFooter>
      </Modal>
    </ConfirmModalContext.Provider>
  );
}

export function useConfirm(): ConfirmModalContextValue {
  const context = React.useContext(ConfirmModalContext);
  if (!context) {
    throw new Error('useConfirm must be used within ConfirmModalProvider');
  }
  return context;
}
