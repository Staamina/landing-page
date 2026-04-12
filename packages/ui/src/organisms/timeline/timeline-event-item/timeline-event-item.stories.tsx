import type { Meta, StoryObj } from '@storybook/react';
import { TimelineEventItem } from './timeline-event-item';
import { TimelineActorRole } from '../timeline-types';

const meta: Meta<typeof TimelineEventItem> = {
  title: 'Organisms/TimelineEventItem',
  component: TimelineEventItem,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof TimelineEventItem>;

const technician = {
  id: 'tech-1',
  name: 'Karine Martin',
  role: TimelineActorRole.TECHNICIAN,
};

export const ResolvedRemoteSupport: Story = {
  name: 'RESOLVED — Remote Support',
  args: {
    event: {
      id: 'ev-1',
      type: 'RESOLVED',
      timestamp: new Date('2024-01-15T16:00:00'),
      actor: technician,
      content: 'Remote Support',
      metadata: {
        resolutionType: 'REMOTE_SUPPORT',
        resolvedBy: 'tech-1',
        resolvedByName: 'Karine Martin',
      },
    },
    isLast: false,
  },
};

export const ResolvedRemoteSupportWithNotes: Story = {
  name: 'RESOLVED — Remote Support (with notes)',
  args: {
    event: {
      id: 'ev-2',
      type: 'RESOLVED',
      timestamp: new Date('2024-01-15T16:00:00'),
      actor: technician,
      content: 'Remote Support',
      metadata: {
        resolutionType: 'REMOTE_SUPPORT',
        resolvedBy: 'tech-1',
        resolvedByName: 'Karine Martin',
        notes:
          'Guided the site user through the reset procedure via video call.',
      },
    },
    isLast: false,
  },
};

export const ResolvedOnSiteIntervention: Story = {
  name: 'RESOLVED — On-Site Intervention',
  args: {
    event: {
      id: 'ev-3',
      type: 'RESOLVED',
      timestamp: new Date('2024-01-15T17:30:00'),
      actor: technician,
      content: 'On-Site Intervention',
      metadata: {
        resolutionType: 'ON_SITE_INTERVENTION',
        resolvedBy: 'tech-1',
        resolvedByName: 'Karine Martin',
        notes: 'Replaced the heating element on-site.',
      },
    },
    isLast: true,
  },
};

export const ResolutionTypeChanged: Story = {
  name: 'RESOLUTION_TYPE_CHANGED — Remote → On-Site',
  args: {
    event: {
      id: 'ev-4',
      type: 'RESOLUTION_TYPE_CHANGED',
      timestamp: new Date('2024-01-15T11:00:00'),
      actor: technician,
      content: 'Remote Support → On-Site Intervention',
      metadata: {
        previousResolutionType: 'REMOTE_SUPPORT',
        newResolutionType: 'ON_SITE_INTERVENTION',
        changedBy: 'tech-1',
        scheduledAt: '2024-01-16T09:00:00',
      },
    },
    isLast: false,
  },
};

export const ResolutionTypeChangedWithReason: Story = {
  name: 'RESOLUTION_TYPE_CHANGED — with scheduled date & reason',
  args: {
    event: {
      id: 'ev-5',
      type: 'RESOLUTION_TYPE_CHANGED',
      timestamp: new Date('2024-01-15T11:00:00'),
      actor: technician,
      content:
        'Remote Support → On-Site Intervention — Scheduled on 16 January 2024 at 09:00',
      metadata: {
        previousResolutionType: 'REMOTE_SUPPORT',
        newResolutionType: 'ON_SITE_INTERVENTION',
        changedBy: 'tech-1',
        scheduledAt: '2024-01-16T09:00:00',
        reason: 'Hardware replacement required on-site.',
      },
    },
    isLast: false,
  },
};
