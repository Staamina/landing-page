import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { StatusBadge } from '../status-badge';

describe('StatusBadge', () => {
  it('should render NEW badge with correct styling', () => {
    render(<StatusBadge status="NEW" />);

    const badge = screen.getByText('New');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('badge-info');
  });

  it('should render ASSIGNED badge with correct styling', () => {
    render(<StatusBadge status="ASSIGNED" />);

    const badge = screen.getByText('Assigned');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('badge-primary');
  });

  it('should render IN_PROGRESS badge with correct styling', () => {
    render(<StatusBadge status="IN_PROGRESS" />);

    const badge = screen.getByText('In Progress');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('badge-warning');
  });

  it('should render RESOLVED badge with correct styling', () => {
    render(<StatusBadge status="RESOLVED" />);

    const badge = screen.getByText('Resolved');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('badge-success');
  });

  it('should render VALIDATED badge with correct styling', () => {
    render(<StatusBadge status="VALIDATED" />);

    const badge = screen.getByText('Validated');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('badge-success');
  });

  it('should render CLOSED badge with correct styling', () => {
    render(<StatusBadge status="CLOSED" />);

    const badge = screen.getByText('Closed');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('badge-default');
  });

  it('should render REJECTED badge with correct styling', () => {
    render(<StatusBadge status="REJECTED" />);

    const badge = screen.getByText('Rejected');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('badge-error');
  });

  it('should render DISPUTED badge with correct styling', () => {
    render(<StatusBadge status="DISPUTED" />);

    const badge = screen.getByText('Disputed');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('badge-orange');
  });

  it('should handle lowercase input', () => {
    render(<StatusBadge status="new" />);

    expect(screen.getByText('New')).toBeInTheDocument();
  });

  it('should handle kebab-case input', () => {
    render(<StatusBadge status="in-progress" />);

    expect(screen.getByText('In Progress')).toBeInTheDocument();
  });

  it('should apply small size class', () => {
    render(<StatusBadge status="NEW" size="sm" />);

    const badge = screen.getByText('New');
    expect(badge).toHaveClass('px-2', 'py-0.5', 'text-xs');
  });

  it('should apply medium size class (default)', () => {
    render(<StatusBadge status="NEW" />);

    const badge = screen.getByText('New');
    expect(badge).toHaveClass('px-2.5', 'py-1', 'text-xs');
  });

  it('should apply large size class', () => {
    render(<StatusBadge status="NEW" size="lg" />);

    const badge = screen.getByText('New');
    expect(badge).toHaveClass('px-3', 'py-1.5', 'text-sm');
  });

  it('should apply custom className', () => {
    render(<StatusBadge status="NEW" className="custom-class" />);

    const badge = screen.getByText('New');
    expect(badge).toHaveClass('custom-class');
  });

  it('should handle unknown status with fallback styling', () => {
    render(<StatusBadge status="UNKNOWN_STATUS" />);

    const badge = screen.getByText('UNKNOWN STATUS');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('badge-default');
  });
});
