import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { SidebarMenuItem } from '../sidebar/sidebar';

export interface SidebarLayoutContextValue {
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
  selectedMenuItem: SidebarMenuItem | null;
  onSelectMenuItem: (item: SidebarMenuItem | null) => void;
}

const SidebarLayoutContext = createContext<SidebarLayoutContextValue | null>(
  null
);

export function useSidebarLayout(): SidebarLayoutContextValue | null {
  return useContext(SidebarLayoutContext);
}

export function useSidebarLayoutOrThrow(): SidebarLayoutContextValue {
  const value = useContext(SidebarLayoutContext);
  if (!value) {
    throw new Error(
      'useSidebarLayoutOrThrow must be used within SidebarLayoutProvider'
    );
  }
  return value;
}

interface SidebarLayoutProviderProps {
  children: ReactNode;
  defaultCollapsed?: boolean;
}

export function SidebarLayoutProvider({
  children,
  defaultCollapsed = true,
}: SidebarLayoutProviderProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(defaultCollapsed);
  const [selectedMenuItem, setSelectedMenuItem] =
    useState<SidebarMenuItem | null>(null);

  const value = useMemo<SidebarLayoutContextValue>(
    () => ({
      sidebarCollapsed,
      setSidebarCollapsed,
      selectedMenuItem,
      onSelectMenuItem: setSelectedMenuItem,
    }),
    [sidebarCollapsed, selectedMenuItem]
  );

  return (
    <SidebarLayoutContext.Provider value={value}>
      {children}
    </SidebarLayoutContext.Provider>
  );
}
