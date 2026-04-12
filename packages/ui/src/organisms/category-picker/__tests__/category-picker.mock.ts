import type { Category } from '@staamina/types';

export const mockCategories: Category[] = [
  {
    id: 'cat-hvac',
    name: 'HVAC',
    parentId: null,
  },
  {
    id: 'cat-hvac-split',
    name: 'Split Systems',
    parentId: 'cat-hvac',
  },
  {
    id: 'cat-hvac-central',
    name: 'Central Air',
    parentId: 'cat-hvac',
  },
  {
    id: 'cat-plumbing',
    name: 'Plumbing',
    parentId: null,
  },
  {
    id: 'cat-plumbing-water',
    name: 'Water Heaters',
    parentId: 'cat-plumbing',
  },
];
