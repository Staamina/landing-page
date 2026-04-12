import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { UnifiedTimeline } from '../unified-timeline';
import { TimelineActorRole, TimelineItem } from '../timeline-types';

const mockTimelineItems: TimelineItem[] = [
  {
    id: '1',
    type: 'CREATED',
    timestamp: new Date('2024-01-15T09:00:00'),
    actor: { id: '1', name: 'Marie Dupont', role: TimelineActorRole.STORE },
    content: 'Incident created',
  },
  {
    id: '2',
    type: 'ASSIGNED',
    timestamp: new Date('2024-01-15T10:00:00'),
    actor: { id: '2', name: 'System', role: TimelineActorRole.SYSTEM },
    content: 'Assigned to technician',
  },
  {
    id: '3',
    type: 'MESSAGE',
    timestamp: new Date('2024-01-15T11:00:00'),
    author: {
      id: '3',
      name: 'Karine Martin',
      role: TimelineActorRole.TECHNICIAN,
    },
    content: 'I will be there at 2 PM',
  },
];

describe('UnifiedTimeline', () => {
  it('should render timeline items', () => {
    render(<UnifiedTimeline items={mockTimelineItems} />);

    expect(screen.getByText('Created')).toBeInTheDocument();
    expect(screen.getByText('Assigned')).toBeInTheDocument();
    expect(screen.getByText('I will be there at 2 PM')).toBeInTheDocument();
  });

  it('should render empty state when no items', () => {
    render(<UnifiedTimeline items={[]} emptyMessage="No events yet" />);

    expect(screen.getByText('No events yet')).toBeInTheDocument();
  });

  it('should render loading state', () => {
    render(<UnifiedTimeline items={[]} isLoading={true} />);

    expect(
      screen.getByRole('status', { name: 'Loading timeline' })
    ).toBeInTheDocument();
  });

  it('should render message input when canSendMessage is true', () => {
    const onSendMessage = vi.fn();
    render(
      <UnifiedTimeline
        items={mockTimelineItems}
        canSendMessage={true}
        onSendMessage={onSendMessage}
        messagePlaceholder="Add a comment..."
      />
    );

    expect(
      screen.getByRole('textbox', { name: 'Add a comment...' })
    ).toBeInTheDocument();
  });

  it('should not render message input when canSendMessage is false', () => {
    render(
      <UnifiedTimeline items={mockTimelineItems} canSendMessage={false} />
    );

    expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
  });

  it('should call onSendMessage when message is submitted', () => {
    const onSendMessage = vi.fn();
    render(
      <UnifiedTimeline
        items={[]}
        canSendMessage={true}
        onSendMessage={onSendMessage}
      />
    );

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'Test message' } });
    fireEvent.click(screen.getByRole('button', { name: 'Send message' }));

    expect(onSendMessage).toHaveBeenCalledWith('Test message');
  });

  it('should display actor name for events', () => {
    render(<UnifiedTimeline items={mockTimelineItems} />);

    expect(screen.getByText('by Marie Dupont')).toBeInTheDocument();
    expect(screen.getByText('by System')).toBeInTheDocument();
  });

  it('should display author name for messages', () => {
    render(<UnifiedTimeline items={mockTimelineItems} />);

    expect(screen.getByText('Karine Martin')).toBeInTheDocument();
  });

  it('should apply custom className', () => {
    const { container } = render(
      <UnifiedTimeline items={[]} className="custom-class" />
    );

    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('should show loading spinner when isSendingMessage is true', () => {
    render(
      <UnifiedTimeline
        items={[]}
        canSendMessage={true}
        onSendMessage={vi.fn()}
        isSendingMessage={true}
      />
    );

    const submitButton = screen.getByRole('button', { name: 'Send message' });
    expect(submitButton).toBeDisabled();
  });
});
