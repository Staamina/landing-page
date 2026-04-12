import type { Meta, StoryObj } from '@storybook/react';
import { UserAvatar, UserAvatarWithInfo } from './user-avatar';

const meta: Meta<typeof UserAvatar> = {
  title: 'Atoms/UserAvatar',
  component: UserAvatar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    status: {
      control: 'select',
      options: ['online', 'offline', 'busy', 'away'],
    },
    showStatus: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof UserAvatar>;

export const Default: Story = {
  args: {
    name: 'John Doe',
  },
};

export const WithEmail: Story = {
  args: {
    email: 'john.doe@example.com',
  },
};

export const WithImage: Story = {
  args: {
    name: 'Jane Smith',
    src: 'https://i.pravatar.cc/150?img=12',
    alt: 'Jane Smith',
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <UserAvatar name="Extra Small" size="xs" />
      <UserAvatar name="Small" size="sm" />
      <UserAvatar name="Medium" size="md" />
      <UserAvatar name="Large" size="lg" />
      <UserAvatar name="Extra Large" size="xl" />
    </div>
  ),
};

export const WithStatus: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <UserAvatar name="Online User" status="online" showStatus />
      <UserAvatar name="Offline User" status="offline" showStatus />
      <UserAvatar name="Busy User" status="busy" showStatus />
      <UserAvatar name="Away User" status="away" showStatus />
    </div>
  ),
};

export const StatusSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <UserAvatar name="XS" size="xs" status="online" showStatus />
        <UserAvatar name="SM" size="sm" status="online" showStatus />
        <UserAvatar name="MD" size="md" status="online" showStatus />
        <UserAvatar name="LG" size="lg" status="online" showStatus />
        <UserAvatar name="XL" size="xl" status="online" showStatus />
      </div>
    </div>
  ),
};

export const FallbackInitials: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <UserAvatar name="John Doe" />
        <UserAvatar name="Jane" />
        <UserAvatar email="user@example.com" />
        <UserAvatar name="Jean-Pierre Dupont" />
      </div>
    </div>
  ),
};

export const WithInfo: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-64">
      <UserAvatarWithInfo
        name="John Doe"
        email="john.doe@example.com"
        subtitle="Site Manager"
      />
      <UserAvatarWithInfo
        name="Jane Smith"
        email="jane.smith@example.com"
        subtitle="Technician"
        showChevron
      />
      <UserAvatarWithInfo
        name="Bob Wilson"
        email="bob.wilson@example.com"
        subtitle="Administrator"
        onClick={() => alert('Clicked!')}
        showChevron
      />
    </div>
  ),
};

export const WithInfoSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-64">
      <UserAvatarWithInfo name="Small User" size="sm" subtitle="Small size" />
      <UserAvatarWithInfo name="Medium User" size="md" subtitle="Medium size" />
      <UserAvatarWithInfo name="Large User" size="lg" subtitle="Large size" />
    </div>
  ),
};

export const WithInfoAndImage: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-64">
      <UserAvatarWithInfo
        name="Alice Johnson"
        email="alice@example.com"
        src="https://i.pravatar.cc/150?img=5"
        subtitle="With profile image"
      />
      <UserAvatarWithInfo
        name="Bob Brown"
        email="bob@example.com"
        src="https://i.pravatar.cc/150?img=8"
        subtitle="With status indicator"
        status="online"
        showStatus
      />
    </div>
  ),
};
