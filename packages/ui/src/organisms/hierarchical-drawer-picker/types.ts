import type { ReactNode } from 'react';

export interface HierarchicalOptionDidactics {
  tooltip: string;
  icon: ReactNode;
}

export interface HierarchicalOption {
  value: string;
  label: string;
  children?: HierarchicalOption[];
  didactics?: HierarchicalOptionDidactics;
}

export interface HierarchicalOptionValue {
  value: string;
  label: string;
}
