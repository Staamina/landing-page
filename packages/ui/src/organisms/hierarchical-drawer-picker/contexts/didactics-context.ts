import { createContext } from 'react';

export interface DidacticsContextValue {
  prefersHoverNone: boolean;
  openDidacticsValue: string | null;
  onDidacticsOpenChange: (value: string | null) => void;
}

export const DidacticsContext = createContext<DidacticsContextValue>({
  prefersHoverNone: false,
  openDidacticsValue: null,
  onDidacticsOpenChange: () => {},
});
