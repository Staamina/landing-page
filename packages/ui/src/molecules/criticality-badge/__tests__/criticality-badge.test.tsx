import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { CriticalityBadge } from '../criticality-badge';

describe('CriticalityBadge', () => {
  it('should render CRITICAL badge with correct styling', () => {
    render(<CriticalityBadge criticality="CRITICAL" />);

    const badge = screen.getByText('Critical');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('badge-error');
  });

  it('should render HIGH badge with correct styling', () => {
    render(<CriticalityBadge criticality="HIGH" />);

    const badge = screen.getByText('High');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('badge-orange');
  });

  it('should render MEDIUM badge with correct styling', () => {
    render(<CriticalityBadge criticality="MEDIUM" />);

    const badge = screen.getByText('Medium');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('badge-warning');
  });

  it('should render LOW badge with correct styling', () => {
    render(<CriticalityBadge criticality="LOW" />);

    const badge = screen.getByText('Low');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('badge-success');
  });

  it('should handle lowercase input', () => {
    render(<CriticalityBadge criticality="critical" />);

    expect(screen.getByText('Critical')).toBeInTheDocument();
  });

  it('should apply small size class', () => {
    render(<CriticalityBadge criticality="HIGH" size="sm" />);

    const badge = screen.getByText('High');
    expect(badge).toHaveClass('px-2', 'py-0.5', 'text-xs');
  });

  it('should apply medium size class (default)', () => {
    render(<CriticalityBadge criticality="HIGH" />);

    const badge = screen.getByText('High');
    expect(badge).toHaveClass('px-2.5', 'py-1', 'text-xs');
  });

  it('should apply large size class', () => {
    render(<CriticalityBadge criticality="HIGH" size="lg" />);

    const badge = screen.getByText('High');
    expect(badge).toHaveClass('px-3', 'py-1.5', 'text-sm');
  });

  it('should apply custom className', () => {
    render(<CriticalityBadge criticality="HIGH" className="custom-class" />);

    const badge = screen.getByText('High');
    expect(badge).toHaveClass('custom-class');
  });

  it('should handle unknown criticality with fallback styling', () => {
    render(<CriticalityBadge criticality="UNKNOWN" />);

    const badge = screen.getByText('UNKNOWN');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('badge-default');
  });
});
