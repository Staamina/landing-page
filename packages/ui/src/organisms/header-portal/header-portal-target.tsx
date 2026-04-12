import { useHeaderPortalContextOptional } from './header-portal-context';

type HeaderSlot = 'left' | 'right';

export interface HeaderPortalTargetProps {
  slot: HeaderSlot;
  className?: string;
}

export function HeaderPortalTarget({
  slot,
  className = '',
}: HeaderPortalTargetProps) {
  const context = useHeaderPortalContextOptional();
  const containerRef = context?.getContainerRef(slot);

  if (!context) {
    return null;
  }

  return <div ref={containerRef} className={className} />;
}
