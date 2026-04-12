'use client';

import { useEffect, useState } from 'react';

const HOVER_NONE_MEDIA = '(hover: none)';

export function usePrefersHoverNone(): boolean {
  const [prefersHoverNone, setPrefersHoverNone] = useState(false);
  useEffect(() => {
    if (
      typeof window === 'undefined' ||
      typeof window.matchMedia !== 'function'
    ) {
      return;
    }
    const mql = window.matchMedia(HOVER_NONE_MEDIA);
    setPrefersHoverNone(mql.matches);
    const handler = () => setPrefersHoverNone(mql.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);
  return prefersHoverNone;
}
