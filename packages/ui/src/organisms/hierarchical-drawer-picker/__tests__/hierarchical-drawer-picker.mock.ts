import * as React from 'react';
import type { HierarchicalOption } from '../types';

export const mockOptions: HierarchicalOption[] = [
  {
    value: 'hvac',
    label: 'HVAC',
    didactics: {
      tooltip: 'Heating, ventilation and air conditioning',
      icon: React.createElement('span', { 'data-testid': 'didactics-icon' }),
    },
    children: [
      { value: 'hvac-split', label: 'Split Systems' },
      { value: 'hvac-central', label: 'Central Air' },
    ],
  },
  {
    value: 'electrical',
    label: 'Electrical',
    children: [
      { value: 'electrical-panel', label: 'Electrical Panels' },
      { value: 'electrical-lighting', label: 'Lighting' },
    ],
  },
  {
    value: 'plumbing',
    label: 'Plumbing',
    children: [
      { value: 'plumbing-fixtures', label: 'Fixtures' },
      { value: 'plumbing-pumps', label: 'Pumps' },
    ],
  },
];

export const deepOptions: HierarchicalOption[] = [
  {
    value: 'a',
    label: 'Level 1 A',
    children: [
      {
        value: 'a1',
        label: 'Level 2 A1',
        children: [
          {
            value: 'a1x',
            label: 'Level 3 A1X',
            children: [{ value: 'a1x-leaf', label: 'Level 4 Leaf' }],
          },
        ],
      },
    ],
  },
];
