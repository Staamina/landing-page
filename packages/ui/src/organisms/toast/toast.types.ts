export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastItem {
  id: string;
  message: string;
  title?: string;
  type: ToastType;
  duration: number;
  open: boolean;
}

export interface ShowToastParams {
  message: string;
  title?: string;
  type: ToastType;
  duration?: number;
}

export interface ToastContextValue {
  onShowToast: (params: ShowToastParams) => void;
}
