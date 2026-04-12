'use client';

import { Button } from '@staamina/ui/button';
import {
  Modal,
  ModalHeader,
  ModalFooter,
  ModalTitle,
  ModalDescription,
} from '@staamina/ui/modal';

export interface ConfirmModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  body: string;
  onConfirm: () => void;
  onCancel?: () => void;
  confirmLabel?: string;
  cancelLabel?: string;
  confirmVariant?: 'solid' | 'outline' | 'ghost';
  confirmIntent?: 'primary' | 'danger';
  isLoading?: boolean;
}

export function ConfirmModal({
  open,
  onOpenChange,
  title,
  body,
  onConfirm,
  onCancel,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  confirmVariant = 'solid',
  confirmIntent = 'primary',
  isLoading = false,
}: ConfirmModalProps) {
  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
    onOpenChange(false);
  };

  const handleConfirm = () => {
    onConfirm();
  };

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      size="xs"
      className="flex max-h-[90vh] flex-col"
    >
      <ModalHeader>
        <ModalTitle>{title}</ModalTitle>
      </ModalHeader>
      <div className="min-h-0 flex-1 overflow-y-auto px-4 pb-4">
        <ModalDescription className="pt-0">{body}</ModalDescription>
      </div>
      <ModalFooter>
        <Button
          type="button"
          size="sm"
          intent="neutral"
          appearance="outline"
          onClick={handleCancel}
          disabled={isLoading}
        >
          {cancelLabel}
        </Button>
        <Button
          type="button"
          size="sm"
          intent={confirmIntent}
          appearance={confirmVariant}
          onClick={handleConfirm}
          disabled={isLoading}
        >
          {confirmLabel}
        </Button>
      </ModalFooter>
    </Modal>
  );
}
