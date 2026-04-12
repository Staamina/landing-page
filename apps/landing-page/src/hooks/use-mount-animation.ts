'use client';

import { useEffect, useRef, useState } from 'react';

export function useMountAnimation(delay: number = 0) {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return { ref: elementRef, isVisible };
}
