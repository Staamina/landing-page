import { createPortal } from 'react-dom';
import { type ReactNode } from 'react';
import { useHeaderPortalContextOptional } from './header-portal-context';

type HeaderSlot = 'left' | 'right';

export interface HeaderPortalProps {
  children: ReactNode;
  slot?: HeaderSlot;
}

export function HeaderPortal({ children, slot = 'left' }: HeaderPortalProps) {
  const context = useHeaderPortalContextOptional();
  const container = context?.getContainer(slot);

  if (!container) {
    return null;
  }

  return createPortal(children, container);
}
