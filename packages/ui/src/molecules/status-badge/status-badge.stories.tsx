import type { Meta, StoryObj } from '@storybook/react';
import { StatusBadge } from './status-badge';

const meta: Meta<typeof StatusBadge> = {
  title: 'Molecules/StatusBadge',
  component: StatusBadge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    status: {
      control: 'select',
      options: [
        'NEW',
        'DRAFT',
        'OPEN',
        'ASSIGNED',
        'IN_PROGRESS',
        'PENDING',
        'RESOLVED',
        'VALIDATED',
        'CLOSED',
        'REJECTED',
        'DISPUTED',
        'CANCELLED',
      ],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof StatusBadge>;

export const New: Story = {
  args: {
    status: 'NEW',
  },
};

export const Draft: Story = {
  args: {
    status: 'DRAFT',
  },
};

export const Open: Story = {
  args: {
    status: 'OPEN',
  },
};

export const Assigned: Story = {
  args: {
    status: 'ASSIGNED',
  },
};

export const InProgress: Story = {
  args: {
    status: 'IN_PROGRESS',
  },
};

export const Pending: Story = {
  args: {
    status: 'PENDING',
  },
};

export const Resolved: Story = {
  args: {
    status: 'RESOLVED',
  },
};

export const Validated: Story = {
  args: {
    status: 'VALIDATED',
  },
};

export const Closed: Story = {
  args: {
    status: 'CLOSED',
  },
};

export const Cancelled: Story = {
  args: {
    status: 'CANCELLED',
  },
};

export const Rejected: Story = {
  args: {
    status: 'REJECTED',
  },
};

export const Disputed: Story = {
  args: {
    status: 'DISPUTED',
  },
};

export const Small: Story = {
  args: {
    status: 'OPEN',
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    status: 'IN_PROGRESS',
    size: 'lg',
  },
};

export const AllStatuses: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <span className="w-16 text-sm text-text-tertiary">Small:</span>
        <StatusBadge status="NEW" size="sm" />
        <StatusBadge status="DRAFT" size="sm" />
        <StatusBadge status="OPEN" size="sm" />
        <StatusBadge status="ASSIGNED" size="sm" />
        <StatusBadge status="IN_PROGRESS" size="sm" />
        <StatusBadge status="PENDING" size="sm" />
        <StatusBadge status="RESOLVED" size="sm" />
        <StatusBadge status="VALIDATED" size="sm" />
        <StatusBadge status="CLOSED" size="sm" />
        <StatusBadge status="REJECTED" size="sm" />
        <StatusBadge status="DISPUTED" size="sm" />
        <StatusBadge status="CANCELLED" size="sm" />
      </div>
      <div className="flex items-center gap-2">
        <span className="w-16 text-sm text-text-tertiary">Medium:</span>
        <StatusBadge status="NEW" size="md" />
        <StatusBadge status="DRAFT" size="md" />
        <StatusBadge status="OPEN" size="md" />
        <StatusBadge status="ASSIGNED" size="md" />
        <StatusBadge status="IN_PROGRESS" size="md" />
        <StatusBadge status="PENDING" size="md" />
        <StatusBadge status="RESOLVED" size="md" />
        <StatusBadge status="VALIDATED" size="md" />
        <StatusBadge status="CLOSED" size="md" />
        <StatusBadge status="REJECTED" size="md" />
        <StatusBadge status="DISPUTED" size="md" />
        <StatusBadge status="CANCELLED" size="md" />
      </div>
      <div className="flex items-center gap-2">
        <span className="w-16 text-sm text-text-tertiary">Large:</span>
        <StatusBadge status="NEW" size="lg" />
        <StatusBadge status="DRAFT" size="lg" />
        <StatusBadge status="OPEN" size="lg" />
        <StatusBadge status="ASSIGNED" size="lg" />
        <StatusBadge status="IN_PROGRESS" size="lg" />
        <StatusBadge status="PENDING" size="lg" />
        <StatusBadge status="RESOLVED" size="lg" />
        <StatusBadge status="VALIDATED" size="lg" />
        <StatusBadge status="CLOSED" size="lg" />
        <StatusBadge status="REJECTED" size="lg" />
        <StatusBadge status="DISPUTED" size="lg" />
        <StatusBadge status="CANCELLED" size="lg" />
      </div>
    </div>
  ),
};

export const IncidentWorkflow: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <p className="text-sm text-text-secondary mb-2">
        Typical incident workflow:
      </p>
      <div className="flex items-center gap-2">
        <StatusBadge status="DRAFT" />
        <span className="text-text-disabled">→</span>
        <StatusBadge status="OPEN" />
        <span className="text-text-disabled">→</span>
        <StatusBadge status="ASSIGNED" />
        <span className="text-text-disabled">→</span>
        <StatusBadge status="IN_PROGRESS" />
        <span className="text-text-disabled">→</span>
        <StatusBadge status="RESOLVED" />
        <span className="text-text-disabled">→</span>
        <StatusBadge status="VALIDATED" />
        <span className="text-text-disabled">→</span>
        <StatusBadge status="CLOSED" />
      </div>
    </div>
  ),
};
