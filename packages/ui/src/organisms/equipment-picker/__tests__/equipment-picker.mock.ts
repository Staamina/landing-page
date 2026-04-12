import type { Category, Equipment } from '@staamina/types';

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

export const mockEquipment: Equipment[] = [
  {
    id: 'eq-1',
    name: 'Air Conditioner Unit 1',
    type: 'HVAC',
    category: {
      id: 'cat-hvac-split',
      name: 'Split Systems',
      parentId: 'cat-hvac',
    },
    model: {
      id: 'model-1',
      name: 'AC Model X',
      categoryId: 'cat-hvac-split',
      brand: {
        id: 'brand-1',
        name: 'CoolBrand',
      },
    },
    floor: {
      id: 'floor-1',
      number: 2,
      siteBuilding: {
        site: {
          id: 'site-1',
          name: 'Main Site',
        },
      },
    },
    siteId: 'site-1',
  },
  {
    id: 'eq-2',
    name: 'Heating Unit 1',
    type: 'HVAC',
    category: {
      id: 'cat-hvac-central',
      name: 'Central Air',
      parentId: 'cat-hvac',
    },
    model: {
      id: 'model-2',
      name: 'Heat Model Y',
      categoryId: 'cat-hvac-central',
      brand: {
        id: 'brand-2',
        name: 'WarmBrand',
      },
    },
    floor: {
      id: 'floor-2',
      number: 1,
      siteBuilding: {
        site: {
          id: 'site-1',
          name: 'Main Site',
        },
      },
    },
    siteId: 'site-1',
  },
  {
    id: 'eq-3',
    name: 'Water Heater 1',
    type: 'PLUMBING',
    category: {
      id: 'cat-plumbing-water',
      name: 'Water Heaters',
      parentId: 'cat-plumbing',
    },
    model: {
      id: 'model-3',
      name: 'Water Model Z',
      categoryId: 'cat-plumbing-water',
      brand: {
        id: 'brand-3',
        name: 'WaterBrand',
      },
    },
    floor: {
      id: 'floor-3',
      number: 3,
      siteBuilding: {
        site: {
          id: 'site-1',
          name: 'Main Site',
        },
      },
    },
    siteId: 'site-1',
  },
];
