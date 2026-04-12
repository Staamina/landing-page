import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { UnifiedTimeline } from './unified-timeline';
import type { TimelineItem } from './timeline-types';
import { TimelineActorRole } from './timeline-types';

const meta: Meta<typeof UnifiedTimeline> = {
  title: 'Organisms/UnifiedTimeline',
  component: UnifiedTimeline,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof UnifiedTimeline>;

const sampleEvents: TimelineItem[] = [
  {
    id: '1',
    type: 'CREATED',
    timestamp: new Date('2024-01-15T09:00:00'),
    actor: { id: '1', name: 'Marie Dupont', role: TimelineActorRole.STORE },
    content: 'Incident created for equipment "Four combiné FC-2000"',
  },
  {
    id: '2',
    type: 'ASSIGNED',
    timestamp: new Date('2024-01-15T09:30:00'),
    actor: { id: '2', name: 'System', role: TimelineActorRole.SYSTEM },
    content: 'Assigned to technician Karine Martin',
  },
  {
    id: '3',
    type: 'MESSAGE',
    timestamp: new Date('2024-01-15T10:00:00'),
    author: {
      id: '3',
      name: 'Karine Martin',
      role: TimelineActorRole.TECHNICIAN,
    },
    content:
      'I will be there at 2 PM. Please make sure the equipment is accessible.',
  },
  {
    id: '4',
    type: 'RDV_CONFIRMED',
    timestamp: new Date('2024-01-15T10:15:00'),
    actor: { id: '1', name: 'Marie Dupont', role: TimelineActorRole.STORE },
    content: 'Appointment confirmed for 2:00 PM',
  },
  {
    id: '5',
    type: 'STARTED',
    timestamp: new Date('2024-01-15T14:00:00'),
    actor: {
      id: '3',
      name: 'Karine Martin',
      role: TimelineActorRole.TECHNICIAN,
    },
    content: 'Intervention started',
  },
  {
    id: '6',
    type: 'ATTACHMENT_ADDED',
    timestamp: new Date('2024-01-15T14:30:00'),
    actor: {
      id: '3',
      name: 'Karine Martin',
      role: TimelineActorRole.TECHNICIAN,
    },
    content: 'Photo added: diagnostic_photo.jpg',
  },
  {
    id: '7',
    type: 'MESSAGE',
    timestamp: new Date('2024-01-15T14:45:00'),
    author: {
      id: '3',
      name: 'Karine Martin',
      role: TimelineActorRole.TECHNICIAN,
    },
    content:
      'Found the issue - heating element needs replacement. I have the part in my van.',
    attachments: [
      {
        id: 'a1',
        url: '#',
        name: 'diagnostic_report.pdf',
        type: 'application/pdf',
      },
    ],
  },
  {
    id: '8',
    type: 'RESOLVED',
    timestamp: new Date('2024-01-15T15:30:00'),
    actor: {
      id: '3',
      name: 'Karine Martin',
      role: TimelineActorRole.TECHNICIAN,
    },
    content: 'Heating element replaced. Equipment tested and working.',
  },
  {
    id: '9',
    type: 'MESSAGE',
    timestamp: new Date('2024-01-15T16:00:00'),
    author: { id: '4', name: 'Sarah Leroy', role: TimelineActorRole.HQ },
    content: 'Great work! Please validate the intervention.',
  },
  {
    id: '10',
    type: 'VALIDATED',
    timestamp: new Date('2024-01-15T16:30:00'),
    actor: { id: '4', name: 'Sarah Leroy', role: TimelineActorRole.HQ },
    content: 'Resolution validated',
  },
  {
    id: '11',
    type: 'CLOSED',
    timestamp: new Date('2024-01-15T16:35:00'),
    actor: { id: '2', name: 'System', role: TimelineActorRole.SYSTEM },
    content: 'Incident closed automatically after validation',
  },
];

export const Default: Story = {
  args: {
    items: sampleEvents,
  },
};

export const WithMessageInput: Story = {
  args: {
    items: sampleEvents.slice(0, 5),
    canSendMessage: true,
    onSendMessage: fn(),
    messagePlaceholder: 'Add a comment...',
  },
};

export const SendingMessage: Story = {
  args: {
    items: sampleEvents.slice(0, 5),
    canSendMessage: true,
    onSendMessage: fn(),
    isSendingMessage: true,
  },
};

export const Loading: Story = {
  args: {
    items: [],
    isLoading: true,
  },
};

export const Empty: Story = {
  args: {
    items: [],
    emptyMessage: 'No events in the timeline yet',
  },
};

export const EmptyWithInput: Story = {
  args: {
    items: [],
    canSendMessage: true,
    onSendMessage: fn(),
    emptyMessage: 'No events yet. Be the first to comment!',
  },
};

export const OnlyEvents: Story = {
  args: {
    items: sampleEvents.filter((item) => item.type !== 'MESSAGE'),
  },
};

export const OnlyMessages: Story = {
  args: {
    items: sampleEvents.filter((item) => item.type === 'MESSAGE'),
    canSendMessage: true,
    onSendMessage: fn(),
  },
};

export const QuoteWorkflow: Story = {
  args: {
    items: [
      {
        id: '1',
        type: 'CREATED',
        timestamp: new Date('2024-01-15T09:00:00'),
        actor: { id: '1', name: 'Thomas', role: TimelineActorRole.STORE },
        content: 'Incident created',
      },
      {
        id: '2',
        type: 'ASSIGNED',
        timestamp: new Date('2024-01-15T09:30:00'),
        actor: { id: '2', name: 'System', role: TimelineActorRole.SYSTEM },
        content: 'Assigned to Karine',
      },
      {
        id: '3',
        type: 'QUOTE_REQUESTED',
        timestamp: new Date('2024-01-15T14:00:00'),
        actor: { id: '3', name: 'Karine', role: TimelineActorRole.TECHNICIAN },
        content: 'Quote requested for major repair',
      },
      {
        id: '4',
        type: 'QUOTE_SUBMITTED',
        timestamp: new Date('2024-01-15T15:00:00'),
        actor: { id: '3', name: 'Karine', role: TimelineActorRole.TECHNICIAN },
        content: 'Quote submitted: €450 for compressor replacement',
      },
      {
        id: '5',
        type: 'QUOTE_APPROVED',
        timestamp: new Date('2024-01-16T10:00:00'),
        actor: { id: '4', name: 'Sarah', role: TimelineActorRole.HQ },
        content: 'Quote approved',
      },
    ],
  },
};

export const RejectionWorkflow: Story = {
  args: {
    items: [
      {
        id: '1',
        type: 'CREATED',
        timestamp: new Date('2024-01-15T09:00:00'),
        actor: { id: '1', name: 'Thomas', role: TimelineActorRole.STORE },
        content: 'Incident created',
      },
      {
        id: '2',
        type: 'RESOLVED',
        timestamp: new Date('2024-01-15T14:00:00'),
        actor: { id: '3', name: 'Karine', role: TimelineActorRole.TECHNICIAN },
        content: 'Marked as resolved',
      },
      {
        id: '3',
        type: 'RESOLUTION_REJECTED',
        timestamp: new Date('2024-01-15T15:00:00'),
        actor: { id: '4', name: 'Sarah', role: TimelineActorRole.HQ },
        content: 'Resolution rejected: Missing photos',
      },
      {
        id: '4',
        type: 'ATTACHMENT_ADDED',
        timestamp: new Date('2024-01-15T15:30:00'),
        actor: { id: '3', name: 'Karine', role: TimelineActorRole.TECHNICIAN },
        content: 'Added missing photos',
      },
      {
        id: '5',
        type: 'RESOLVED',
        timestamp: new Date('2024-01-15T15:35:00'),
        actor: { id: '3', name: 'Karine', role: TimelineActorRole.TECHNICIAN },
        content: 'Marked as resolved again',
      },
      {
        id: '6',
        type: 'VALIDATED',
        timestamp: new Date('2024-01-15T16:00:00'),
        actor: { id: '4', name: 'Sarah', role: TimelineActorRole.HQ },
        content: 'Resolution validated',
      },
    ],
  },
};
