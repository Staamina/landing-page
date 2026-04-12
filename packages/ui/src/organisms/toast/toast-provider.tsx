'use client';

import * as React from 'react';
import * as ToastPrimitives from '@radix-ui/react-toast';

import { Toast, ToastDescription, ToastTitle, ToastViewport } from './toast';
import type {
  ShowToastParams,
  ToastContextValue,
  ToastItem,
} from './toast.types';

const DEFAULT_DURATION = 4000;
const MAX_TOASTS = 5;
const EXIT_ANIMATION_DURATION = 300;

const ToastContext = React.createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<ToastItem[]>([]);

  const onShowToast = React.useCallback(
    ({ message, title, type, duration }: ShowToastParams) => {
      const id = crypto.randomUUID();
      const newToast: ToastItem = {
        id,
        message,
        title,
        type,
        duration: duration ?? DEFAULT_DURATION,
        open: true,
      };

      setToasts((prev) => {
        const next = [newToast, ...prev];
        return next.slice(0, MAX_TOASTS);
      });
    },
    []
  );

  const dismissToast = React.useCallback((id: string) => {
    // Mark closed to trigger exit animation
    setToasts((prev) =>
      prev.map((t) => (t.id === id ? { ...t, open: false } : t))
    );
    // Remove after animation completes
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, EXIT_ANIMATION_DURATION);
  }, []);

  return (
    <ToastContext.Provider value={{ onShowToast }}>
      <ToastPrimitives.Provider swipeDirection="right">
        {children}
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            toastType={toast.type}
            duration={toast.duration}
            open={toast.open}
            onOpenChange={(open) => {
              if (!open) dismissToast(toast.id);
            }}
          >
            {toast.title !== undefined && (
              <ToastTitle>{toast.title}</ToastTitle>
            )}
            <ToastDescription>{toast.message}</ToastDescription>
          </Toast>
        ))}
        <ToastViewport />
      </ToastPrimitives.Provider>
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextValue {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
}
