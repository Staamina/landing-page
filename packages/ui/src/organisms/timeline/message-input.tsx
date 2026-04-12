import {
  type FormEvent,
  type KeyboardEvent,
  useCallback,
  useState,
} from 'react';
import { Send } from 'lucide-react';
import { cn } from '@staamina/ui/utils';

export interface MessageInputProps {
  onSend: (message: string) => void;
  placeholder?: string;
  disabled?: boolean;
  isLoading?: boolean;
  className?: string;
}

export function MessageInput({
  onSend,
  placeholder = 'Write a message...',
  disabled = false,
  isLoading = false,
  className,
}: MessageInputProps) {
  const [message, setMessage] = useState('');

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      const trimmedMessage = message.trim();
      if (trimmedMessage && !disabled && !isLoading) {
        onSend(trimmedMessage);
        setMessage('');
      }
    },
    [message, disabled, isLoading, onSend]
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSubmit(e as unknown as FormEvent);
      }
    },
    [handleSubmit]
  );

  const isSubmitDisabled = disabled || isLoading || !message.trim();

  return (
    <form onSubmit={handleSubmit} className={cn('relative', className)}>
      <div className="flex items-end gap-2 rounded-lg border border-border-default bg-surface p-2 shadow-sm focus-within:border-brand-primary focus-within:ring-1 focus-within:ring-brand-primary">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled || isLoading}
          rows={1}
          className={cn(
            'flex-1 resize-none border-0 bg-transparent text-sm text-text-primary placeholder:text-text-placeholder',
            'focus:outline-none focus:ring-0',
            'min-h-[36px] max-h-[120px]',
            'disabled:cursor-not-allowed disabled:opacity-50'
          )}
          aria-label={placeholder}
        />
        <button
          type="submit"
          disabled={isSubmitDisabled}
          className={cn(
            'flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-md',
            'bg-brand-primary text-white',
            'hover:bg-brand-primary/90',
            'focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2',
            'disabled:cursor-not-allowed disabled:opacity-50',
            'transition-colors'
          )}
          aria-label="Send message"
        >
          {isLoading ? (
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
          ) : (
            <Send className="h-4 w-4" aria-hidden="true" />
          )}
        </button>
      </div>
      <p className="mt-1 text-xs text-text-tertiary">
        Press Enter to send, Shift+Enter for new line
      </p>
    </form>
  );
}
