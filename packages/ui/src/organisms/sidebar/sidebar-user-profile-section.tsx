import type { ReactNode } from 'react';

export interface SidebarUserProfileSectionProps {
  children: ReactNode;
}

export function SidebarUserProfileSection({
  children,
}: SidebarUserProfileSectionProps) {
  return <>{children}</>;
}
