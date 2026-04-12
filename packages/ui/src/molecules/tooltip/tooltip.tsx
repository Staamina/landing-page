import {
  Tooltip as TooltipPrimitive,
  TooltipContent,
  TooltipPortal,
  TooltipProvider,
  TooltipTrigger,
} from '@radix-ui/react-tooltip';
import { type ReactNode } from 'react';

export { TooltipProvider };

export interface TooltipProps {
  content: ReactNode;
  children: ReactNode;
  side?: 'top' | 'right' | 'bottom' | 'left';
  sideOffset?: number;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function Tooltip({
  content,
  children,
  side = 'right',
  sideOffset = 8,
  open,
  onOpenChange,
}: TooltipProps) {
  return (
    <TooltipPrimitive open={open} onOpenChange={onOpenChange}>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipPortal>
        <TooltipContent
          side={side}
          sideOffset={sideOffset}
          className="tooltip-content z-[100] max-w-[var(--radix-tooltip-content-available-width)] text-sm"
          avoidCollisions
        >
          {content}
        </TooltipContent>
      </TooltipPortal>
    </TooltipPrimitive>
  );
}
