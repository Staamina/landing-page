'use client';

import * as React from 'react';
import { createPortal } from 'react-dom';

interface ExternalPortalProps {
  children: React.ReactNode;
  container?: HTMLElement;
}

export function ExternalPortal({ children, container }: ExternalPortalProps) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const targetContainer =
    container || (typeof document !== 'undefined' ? document.body : null);

  if (!targetContainer) {
    return null;
  }

  return createPortal(children, targetContainer);
}
