import type { Category, Equipment } from '@staamina/types';
import type { Meta, StoryObj } from '@storybook/react';

import { EquipmentPicker } from './equipment-picker';

const meta: Meta<typeof EquipmentPicker> = {
  title: 'Organisms/EquipmentPicker',
  component: EquipmentPicker,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '500px', maxWidth: '100%' }}>
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
  argTypes: {
    placeholder: {
      control: 'text',
      description: 'Placeholder text for search input',
    },
  },
};

export default meta;
type Story = StoryObj<typeof EquipmentPicker>;

const mockCategories: Category[] = [
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
    id: 'cat-electrical',
    name: 'Electrical',
    parentId: null,
  },
  {
    id: 'cat-electrical-panel',
    name: 'Electrical Panels',
    parentId: 'cat-electrical',
  },
  {
    id: 'cat-electrical-lighting',
    name: 'Lighting',
    parentId: 'cat-electrical',
  },
  {
    id: 'cat-plumbing',
    name: 'Plumbing',
    parentId: null,
  },
  {
    id: 'cat-plumbing-fixtures',
    name: 'Fixtures',
    parentId: 'cat-plumbing',
  },
  {
    id: 'cat-plumbing-pumps',
    name: 'Pumps',
    parentId: 'cat-plumbing',
  },
  {
    id: 'cat-security',
    name: 'Security',
    parentId: null,
  },
  {
    id: 'cat-security-cameras',
    name: 'Cameras',
    parentId: 'cat-security',
  },
  {
    id: 'cat-security-access',
    name: 'Access Control',
    parentId: 'cat-security',
  },
];

const mockEquipment: Equipment[] = [
  {
    id: 'eq-1',
    name: 'HVAC Unit - Main Floor',
    type: 'HVAC',
    category: {
      id: 'cat-hvac-central',
      name: 'Central Air',
      parentId: 'cat-hvac',
    },
    model: {
      id: 'model-1',
      name: 'AC-5000',
      categoryId: 'cat-hvac-central',
      brand: {
        id: 'brand-1',
        name: 'CoolAir',
      },
    },
    floor: {
      id: 'floor-1',
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
    id: 'eq-2',
    name: 'Split AC - Office 101',
    type: 'HVAC',
    category: {
      id: 'cat-hvac-split',
      name: 'Split Systems',
      parentId: 'cat-hvac',
    },
    model: {
      id: 'model-2',
      name: 'Split-3000',
      categoryId: 'cat-hvac-split',
      brand: {
        id: 'brand-2',
        name: 'FrostTech',
      },
    },
    floor: {
      id: 'floor-1',
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
    name: 'Split AC - Office 205',
    type: 'HVAC',
    category: {
      id: 'cat-hvac-split',
      name: 'Split Systems',
      parentId: 'cat-hvac',
    },
    model: {
      id: 'model-2',
      name: 'Split-3000',
      categoryId: 'cat-hvac-split',
      brand: {
        id: 'brand-2',
        name: 'FrostTech',
      },
    },
    floor: {
      id: 'floor-2',
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
    id: 'eq-4',
    name: 'Main Electrical Panel',
    type: 'ELECTRICAL_PANEL',
    category: {
      id: 'cat-electrical-panel',
      name: 'Electrical Panels',
      parentId: 'cat-electrical',
    },
    model: {
      id: 'model-3',
      name: 'Panel-200A',
      categoryId: 'cat-electrical-panel',
      brand: {
        id: 'brand-3',
        name: 'PowerGrid',
      },
    },
    floor: {
      id: 'floor-1',
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
    id: 'eq-5',
    name: 'Sub Panel - Floor 2',
    type: 'ELECTRICAL_PANEL',
    category: {
      id: 'cat-electrical-panel',
      name: 'Electrical Panels',
      parentId: 'cat-electrical',
    },
    model: {
      id: 'model-4',
      name: 'Panel-100A',
      categoryId: 'cat-electrical-panel',
      brand: {
        id: 'brand-3',
        name: 'PowerGrid',
      },
    },
    floor: {
      id: 'floor-2',
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
    id: 'eq-6',
    name: 'LED Strip - Reception',
    type: 'LED_STRIP',
    category: {
      id: 'cat-electrical-lighting',
      name: 'Lighting',
      parentId: 'cat-electrical',
    },
    model: {
      id: 'model-5',
      name: 'LED-Pro-5M',
      categoryId: 'cat-electrical-lighting',
      brand: {
        id: 'brand-4',
        name: 'BrightLight',
      },
    },
    floor: {
      id: 'floor-1',
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
    id: 'eq-7',
    name: 'LED Spotlight - Hallway',
    type: 'LED_SPOTLIGHT',
    category: {
      id: 'cat-electrical-lighting',
      name: 'Lighting',
      parentId: 'cat-electrical',
    },
    model: {
      id: 'model-6',
      name: 'Spot-50W',
      categoryId: 'cat-electrical-lighting',
      brand: {
        id: 'brand-4',
        name: 'BrightLight',
      },
    },
    floor: {
      id: 'floor-1',
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
    id: 'eq-8',
    name: 'Sink - Kitchen',
    type: 'PLUMBING',
    category: {
      id: 'cat-plumbing-fixtures',
      name: 'Fixtures',
      parentId: 'cat-plumbing',
    },
    model: {
      id: 'model-7',
      name: 'Sink-Stainless-60',
      categoryId: 'cat-plumbing-fixtures',
      brand: {
        id: 'brand-5',
        name: 'AquaFlow',
      },
    },
    floor: {
      id: 'floor-1',
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
    id: 'eq-9',
    name: 'Water Pump - Basement',
    type: 'PUMP',
    category: {
      id: 'cat-plumbing-pumps',
      name: 'Pumps',
      parentId: 'cat-plumbing',
    },
    model: {
      id: 'model-8',
      name: 'Pump-5000GPH',
      categoryId: 'cat-plumbing-pumps',
      brand: {
        id: 'brand-5',
        name: 'AquaFlow',
      },
    },
    floor: {
      id: 'floor-0',
      number: 0,
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
    id: 'eq-10',
    name: 'Security Camera - Entrance',
    type: 'SECURITY_CAMERA',
    category: {
      id: 'cat-security-cameras',
      name: 'Cameras',
      parentId: 'cat-security',
    },
    model: {
      id: 'model-9',
      name: 'Cam-4K-Pro',
      categoryId: 'cat-security-cameras',
      brand: {
        id: 'brand-6',
        name: 'SecureView',
      },
    },
    floor: {
      id: 'floor-1',
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
    id: 'eq-11',
    name: 'Security Camera - Parking',
    type: 'SECURITY_CAMERA',
    category: {
      id: 'cat-security-cameras',
      name: 'Cameras',
      parentId: 'cat-security',
    },
    model: {
      id: 'model-9',
      name: 'Cam-4K-Pro',
      categoryId: 'cat-security-cameras',
      brand: {
        id: 'brand-6',
        name: 'SecureView',
      },
    },
    floor: {
      id: 'floor-0',
      number: 0,
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
    id: 'eq-12',
    name: 'Access Control - Main Door',
    type: 'ACCESS_CONTROL',
    category: {
      id: 'cat-security-access',
      name: 'Access Control',
      parentId: 'cat-security',
    },
    model: {
      id: 'model-10',
      name: 'Access-Pro-X',
      categoryId: 'cat-security-access',
      brand: {
        id: 'brand-6',
        name: 'SecureView',
      },
    },
    floor: {
      id: 'floor-1',
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
    id: 'eq-13',
    name: 'HVAC Unit - Basement',
    type: 'HVAC',
    category: {
      id: 'cat-hvac-central',
      name: 'Central Air',
      parentId: 'cat-hvac',
    },
    model: {
      id: 'model-1',
      name: 'AC-5000',
      categoryId: 'cat-hvac-central',
      brand: {
        id: 'brand-1',
        name: 'CoolAir',
      },
    },
    floor: {
      id: 'floor-0',
      number: 0,
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
    id: 'eq-14',
    name: 'LED Strip - Conference Room',
    type: 'LED_STRIP',
    category: {
      id: 'cat-electrical-lighting',
      name: 'Lighting',
      parentId: 'cat-electrical',
    },
    model: {
      id: 'model-5',
      name: 'LED-Pro-5M',
      categoryId: 'cat-electrical-lighting',
      brand: {
        id: 'brand-4',
        name: 'BrightLight',
      },
    },
    floor: {
      id: 'floor-2',
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
];

export const Default: Story = {
  args: {
    onChange: () => {},
    categories: mockCategories,
    equipmentByCategory: mockEquipment,
  },
};

export const WithValue: Story = {
  args: {
    value: mockEquipment[0],
    onChange: () => {},
    categories: mockCategories,
    equipmentByCategory: mockEquipment,
  },
};

export const WithMultipleCategories: Story = {
  args: {
    onChange: () => {},
    categories: mockCategories,
    equipmentByCategory: mockEquipment,
  },
};

export const Loading: Story = {
  args: {
    onChange: () => {},
    categories: [],
    isLoadingCategories: true,
    equipmentByCategory: [],
  },
};

export const EmptyState: Story = {
  args: {
    onChange: () => {},
    categories: [],
    equipmentByCategory: [],
  },
};

export const WithCategorySearch: Story = {
  args: {
    onChange: () => {},
    categories: mockCategories,
    equipmentByCategory: mockEquipment,
  },
};

export const WithCategoryFilter: Story = {
  args: {
    onChange: () => {},
    categories: mockCategories,
    equipmentByCategory: mockEquipment,
  },
};

const manyItemsCategory: Category = {
  id: 'cat-many',
  name: 'Large Category (15 Items)',
  parentId: null,
};

const manyItemsEquipment: Equipment[] = Array.from({ length: 15 }).map(
  (_, i) => ({
    id: `eq-many-${i}`,
    name: `Equipment ${i + 1} - High Performance`,
    type: 'HVAC',
    category: manyItemsCategory,
    model: {
      id: 'model-demo',
      name: 'Demo Model',
      categoryId: manyItemsCategory.id,
      brand: {
        id: 'brand-demo',
        name: 'Demo Brand',
      },
    },
    floor: {
      id: 'floor-1',
      number: 1,
      siteBuilding: {
        site: {
          id: 'site-1',
          name: 'Main Site',
        },
      },
    },
    siteId: 'site-1',
  })
);

export const WithManyItems: Story = {
  args: {
    onChange: () => {},
    categories: [...mockCategories, manyItemsCategory],
    equipmentByCategory: [...mockEquipment, ...manyItemsEquipment],
  },
};
