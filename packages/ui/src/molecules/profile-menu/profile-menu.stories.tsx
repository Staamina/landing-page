import type { Meta, StoryObj } from '@storybook/react';
import { ProfileMenu } from './profile-menu';

const meta: Meta<typeof ProfileMenu> = {
  title: 'Molecules/ProfileMenu',
  component: ProfileMenu,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    showRole: {
      control: 'boolean',
    },
    onClick: { action: 'clicked' },
  },
};

export default meta;
type Story = StoryObj<typeof ProfileMenu>;

export const Default: Story = {
  args: {
    name: 'John Doe',
    email: 'john.doe@example.com',
    roles: ['SiteManager'],
  },
};

export const WithMultipleRoles: Story = {
  args: {
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    roles: ['SuperAdministrator', 'Administrator', 'SiteManager', 'SiteStaff'],
  },
};

export const SuperAdministrator: Story = {
  args: {
    name: 'Admin User',
    email: 'admin@example.com',
    roles: ['SuperAdministrator'],
  },
};

export const Administrator: Story = {
  args: {
    name: 'Manager User',
    email: 'manager@example.com',
    roles: ['Administrator'],
  },
};

export const SiteManager: Story = {
  args: {
    name: 'Site Manager',
    email: 'sitemanager@example.com',
    roles: ['SiteManager'],
  },
};

export const SiteStaff: Story = {
  args: {
    name: 'Staff Member',
    email: 'staff@example.com',
    roles: ['SiteStaff'],
  },
};

export const WithoutRole: Story = {
  args: {
    name: 'User Without Role',
    email: 'user@example.com',
    roles: [],
  },
};

export const WithoutRoleDisplay: Story = {
  args: {
    name: 'User',
    email: 'user@example.com',
    roles: ['SiteManager'],
    showRole: false,
  },
};

export const WithImage: Story = {
  args: {
    name: 'Alice Johnson',
    email: 'alice@example.com',
    src: 'https://i.pravatar.cc/150?img=5',
    roles: ['Administrator'],
  },
};

export const Clickable: Story = {
  args: {
    name: 'Clickable User',
    email: 'clickable@example.com',
    roles: ['SiteManager'],
    onClick: () => {
      console.log('Profile menu clicked');
    },
  },
};

export const DifferentSizes: Story = {
  render: () => (
    <div className="flex w-64 flex-col gap-4">
      <ProfileMenu name="Extra Small" size="xs" roles={['SiteManager']} />
      <ProfileMenu name="Small" size="sm" roles={['SiteManager']} />
      <ProfileMenu name="Medium" size="md" roles={['SiteManager']} />
      <ProfileMenu name="Large" size="lg" roles={['SiteManager']} />
      <ProfileMenu name="Extra Large" size="xl" roles={['SiteManager']} />
    </div>
  ),
};

export const WithEmailOnly: Story = {
  args: {
    email: 'user@example.com',
    roles: ['SiteManager'],
  },
};

export const ComplexRoleNames: Story = {
  args: {
    name: 'Complex Role User',
    email: 'complex@example.com',
    roles: ['SiteItDigitalCoordinator'],
  },
};
