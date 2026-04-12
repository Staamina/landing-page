import {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  type ReactNode,
  type RefCallback,
} from 'react';

type HeaderSlot = 'left' | 'right';

interface HeaderPortalContextValue {
  getContainerRef: (slot: HeaderSlot) => RefCallback<HTMLElement>;
  getContainer: (slot: HeaderSlot) => HTMLElement | null;
}

const HeaderPortalContext = createContext<HeaderPortalContextValue | null>(
  null
);

export interface HeaderPortalProviderProps {
  children: ReactNode;
}

export function HeaderPortalProvider({ children }: HeaderPortalProviderProps) {
  const [containers, setContainers] = useState<
    Record<HeaderSlot, HTMLElement | null>
  >({
    left: null,
    right: null,
  });

  const refCallbacksRef = useRef<Record<HeaderSlot, RefCallback<HTMLElement>>>({
    left: (element) => {
      setContainers((prev) => {
        if (prev.left === element) return prev;
        return { ...prev, left: element };
      });
    },
    right: (element) => {
      setContainers((prev) => {
        if (prev.right === element) return prev;
        return { ...prev, right: element };
      });
    },
  });

  const getContainerRef = useCallback(
    (slot: HeaderSlot): RefCallback<HTMLElement> =>
      refCallbacksRef.current[slot],
    []
  );

  const getContainer = useCallback(
    (slot: HeaderSlot) => containers[slot],
    [containers]
  );

  return (
    <HeaderPortalContext.Provider value={{ getContainerRef, getContainer }}>
      {children}
    </HeaderPortalContext.Provider>
  );
}

export function useHeaderPortalContext() {
  const context = useContext(HeaderPortalContext);
  if (!context) {
    throw new Error(
      'useHeaderPortalContext must be used within a HeaderPortalProvider'
    );
  }
  return context;
}

export function useHeaderPortalContextOptional() {
  return useContext(HeaderPortalContext);
}
