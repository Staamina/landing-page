import { useState, useEffect } from 'react';
import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom';
import type { Meta, StoryObj } from '@storybook/react';
import { Home, Settings, FileText, Tag, Package, User } from 'lucide-react';
import { useIsDesktop } from '@staamina/ui/hooks';
import { Sidebar } from './sidebar';
import type { SidebarMenuItem } from './sidebar';
import type { SidebarAdditionalItemConfig } from './sidebar-additional-item';
import { Button } from '@staamina/ui/button';
import {
  UserProfileDropdown,
  UserProfilePanel,
  UserProfileTrigger,
} from '@staamina/ui/user-profile-dropdown';
import { ModuleSubmenu } from './module-submenu';
import { SidebarUserProfileSection } from './sidebar-user-profile-section';

const defaultMenuItems: SidebarMenuItem[] = [
  {
    path: '/',
    label: 'Home',
    icon: <Home className="w-5 h-5" />,
  },
  {
    path: '/settings',
    label: 'Settings',
    icon: <Settings className="w-5 h-5" />,
  },
  {
    label: 'Catalog',
    icon: <Package className="w-5 h-5" />,
    children: [
      {
        path: '/brands',
        label: 'Brands',
        icon: <Tag className="w-4 h-4" />,
      },
      {
        path: '/models',
        label: 'Models',
        icon: <FileText className="w-4 h-4" />,
      },
    ],
  },
];

const meta: Meta<typeof Sidebar> = {
  title: 'Organisms/Sidebar',
  component: Sidebar,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/']}>
        <Story />
      </MemoryRouter>
    ),
  ],
  argTypes: {
    isOpen: {
      control: 'boolean',
      description:
        'Sidebar visible (mobile: overlay + panel; desktop: always visible)',
    },
    onClose: { action: 'onClose' },
    copyrightText: { control: 'text' },
    closeMenuLabel: { control: 'text' },
  },
};

export default meta;

type Story = StoryObj<typeof Sidebar>;

function SidebarWithToggle(props: {
  menuItems: SidebarMenuItem[];
  copyrightText: string;
  closeMenuLabel: string;
  additionalItems?: SidebarAdditionalItemConfig[];
  userProfileSection?: React.ReactNode;
  footerActions?: React.ReactNode;
  layoutState?: React.ComponentProps<typeof Sidebar>['layoutState'];
  variant?: 'default' | 'superadmin';
  headerBadge?: React.ReactNode;
}) {
  const [isOpen, setOpen] = useState(false);
  return (
    <div className="min-h-screen flex flex-col">
      <div className="p-4 flex items-center gap-2 border-b border-border bg-surface">
        <Button onClick={() => setOpen(true)}>Open sidebar</Button>
        <span className="text-sm text-text-secondary">
          On viewport &lt; 1024px the sidebar is overlay + closes on outside
          click.
        </span>
      </div>
      <div className="flex-1 p-4">
        <Routes>
          <Route path="/" element={<div>Home page</div>} />
          <Route path="/settings" element={<div>Settings page</div>} />
          <Route path="/brands" element={<div>Brands page</div>} />
          <Route path="/models" element={<div>Models page</div>} />
          <Route path="/users" element={<div>Users page</div>} />
        </Routes>
      </div>
      <Sidebar
        isOpen={isOpen}
        onClose={() => setOpen(false)}
        menuItems={props.menuItems}
        copyrightText={props.copyrightText}
        closeMenuLabel={props.closeMenuLabel}
        additionalItems={props.additionalItems}
        userProfileSection={props.userProfileSection}
        footerActions={props.footerActions}
        layoutState={props.layoutState}
        variant={props.variant}
        headerBadge={props.headerBadge}
      />
    </div>
  );
}

export const Default: Story = {
  render: () => (
    <SidebarWithToggle
      menuItems={defaultMenuItems}
      copyrightText="© 2025 Staamina. All rights reserved."
      closeMenuLabel="Close menu"
    />
  ),
};

export const Light: Story = {
  render: () => (
    <div className="min-h-screen bg-app">
      <SidebarWithToggle
        menuItems={defaultMenuItems}
        copyrightText="© 2025 Staamina. All rights reserved."
        closeMenuLabel="Close menu"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Sidebar en mode clair (variant par défaut)',
      },
    },
  },
};

export const Dark: Story = {
  render: () => (
    <div className="dark min-h-screen bg-app">
      <SidebarWithToggle
        menuItems={defaultMenuItems}
        copyrightText="© 2025 Staamina. All rights reserved."
        closeMenuLabel="Close menu"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Sidebar en mode sombre (classe .dark sur le parent)',
      },
    },
  },
};

export const SuperAdmin: Story = {
  render: () => (
    <SidebarWithToggle
      menuItems={defaultMenuItems}
      copyrightText="© 2025 Staamina. All rights reserved."
      closeMenuLabel="Close menu"
      variant="superadmin"
      headerBadge={
        <span className="text-xs text-amber-400 font-medium">Super Admin</span>
      }
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Sidebar variant Super Admin avec thème sombre dédié',
      },
    },
  },
};

const additionalItemsExample: SidebarAdditionalItemConfig[] = [
  {
    path: '/users',
    label: 'Users (custom link)',
    icon: <User className="w-5 h-5" />,
  },
];

export const WithAdditionalMenuItems: Story = {
  render: () => (
    <SidebarWithToggle
      menuItems={defaultMenuItems}
      copyrightText="© 2025 Staamina."
      closeMenuLabel="Close menu"
      additionalItems={additionalItemsExample}
    />
  ),
};

export const WithUserProfileSection: Story = {
  render: () => (
    <SidebarWithToggle
      menuItems={defaultMenuItems}
      copyrightText="© 2025 Staamina."
      closeMenuLabel="Close menu"
      userProfileSection={
        <UserProfileDropdown
          user={{
            name: 'Jane Doe',
            email: 'jane.doe@example.com',
            subtitle: 'Administrator',
          }}
          labels={{
            language: 'Language',
            theme: 'Theme',
            logout: 'Log out',
            userFallback: 'User',
          }}
          currentLanguage="en"
          onLanguageChange={() => {}}
          onLogout={async () => {}}
        />
      }
    />
  ),
};

export const FullExample: Story = {
  render: () => (
    <SidebarWithToggle
      menuItems={defaultMenuItems}
      copyrightText="© 2025 Staamina. All rights reserved."
      closeMenuLabel="Close menu"
      additionalItems={additionalItemsExample}
      userProfileSection={
        <UserProfileDropdown
          user={{
            name: 'Admin User',
            email: 'admin@example.com',
            subtitle: 'SuperAdministrator',
          }}
          labels={{
            language: 'Language',
            theme: 'Theme',
            logout: 'Log out',
            userFallback: 'User',
          }}
          currentLanguage="en"
          onLanguageChange={() => {}}
          onLogout={async () => {}}
        />
      }
    />
  ),
};

function SidebarWithCollapsedMode() {
  const [isOpen, setOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] =
    useState<SidebarMenuItem | null>(null);
  const [showProfilePanel, setShowProfilePanel] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setShowProfilePanel(false);
  }, [location.pathname]);

  const layoutState = {
    collapsed,
    onCollapsedChange: setCollapsed,
    selectedMenuItem,
    onSelectMenuItem: setSelectedMenuItem,
    showProfilePanel,
    setShowProfilePanel,
  };
  const isDesktop = useIsDesktop();
  const sidebarVisible = isOpen || isDesktop;
  const contentMarginClass = sidebarVisible
    ? collapsed
      ? 'ml-16'
      : 'ml-64'
    : '';

  const profileLabels = {
    language: 'Language',
    theme: 'Theme',
    logout: 'Log out',
    userFallback: 'User',
  };
  const profileUser = {
    name: 'User',
    email: 'u@ex.com',
    subtitle: 'Admin',
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className={`flex-1 flex flex-col min-w-0 ${contentMarginClass}`}>
        <div className="p-4 flex items-center gap-2 border-b border-border bg-surface shrink-0">
          <Button onClick={() => setOpen(true)}>Open sidebar</Button>
          <span className="text-sm text-text-secondary">
            With layoutState: click a menu with children to collapse to icon
            strip; submenu appears in content. Profile opens in content panel.
          </span>
        </div>
        <div className="flex-1 p-4 flex gap-6 min-h-0">
          <div className="flex-1">
            {showProfilePanel && (
              <UserProfilePanel
                user={profileUser}
                labels={profileLabels}
                currentLanguage="en"
                onLanguageChange={() => {}}
                onLogout={async () => {}}
                onClose={() => setShowProfilePanel(false)}
                className="mb-6"
              />
            )}
            {!showProfilePanel && selectedMenuItem && (
              <ModuleSubmenu item={selectedMenuItem} className="mb-6" />
            )}
            <Routes>
              <Route path="/" element={<div>Home page</div>} />
              <Route path="/settings" element={<div>Settings page</div>} />
              <Route path="/brands" element={<div>Brands page</div>} />
              <Route path="/models" element={<div>Models page</div>} />
            </Routes>
          </div>
        </div>
      </div>
      <Sidebar
        isOpen={isOpen}
        onClose={() => setOpen(false)}
        menuItems={defaultMenuItems}
        copyrightText="© 2025 Staamina."
        closeMenuLabel="Close menu"
        userProfileSection={
          <SidebarUserProfileSection>
            <UserProfileTrigger
              user={profileUser}
              userFallbackLabel={profileLabels.userFallback}
              onOpenPanel={() => {
                setSelectedMenuItem(null);
                setShowProfilePanel(true);
                setCollapsed(true);
              }}
            />
          </SidebarUserProfileSection>
        }
        profileTrigger={
          <div className="flex justify-center">
            <div className="w-10 h-10 rounded-full bg-brand-primary/20 flex items-center justify-center text-sm font-medium text-brand-primary">
              US
            </div>
          </div>
        }
        layoutState={layoutState}
      />
    </div>
  );
}

export const WithCollapsedMode: Story = {
  render: () => <SidebarWithCollapsedMode />,
};
