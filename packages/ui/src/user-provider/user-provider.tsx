import {
  createContext,
  ReactNode,
  Suspense,
  useCallback,
  useContext,
  useMemo,
} from 'react';
import { useQueryClient, useSuspenseQuery } from '@tanstack/react-query';

export interface User {
  id: string;
  externalAuthId: string;
  email: string;
  name: string | null;
  createdAt: Date;
  updatedAt: Date;
  roles: string[];
  companyId?: string;
  siteId?: string;
  serviceProvider: unknown | null;
}

export interface UserService {
  getCurrentUser: (forceRefresh?: boolean) => Promise<User | null>;
  clearCache: () => void;
  getCachedUser: () => User | null;
}

export interface AuthHook {
  isAuthenticated: boolean;
}

interface UserProviderProps {
  children: ReactNode;
  userService: UserService;
  useAuth: () => AuthHook;
  fallback?: ReactNode;
}

interface UserContextType {
  user: User | null;
  roles: string[];
  isLoading: boolean;
  error: Error | null;
  refreshUser: () => Promise<void>;
  hasRole: (roleName: string) => boolean;
  hasAnyRole: (roleNames: string[]) => boolean;
  isSuperAdministrator: () => boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const USER_QUERY_KEY = ['currentUser'];

const REFRESH_INTERVAL = 5 * 60 * 1000;

const UserQueryContent = ({
  children,
  userService,
  isAuthenticated,
}: {
  children: ReactNode;
  userService: UserService;
  isAuthenticated: boolean;
}) => {
  const queryClient = useQueryClient();

  const { data: user, error } = useSuspenseQuery({
    queryKey: USER_QUERY_KEY,
    queryFn: async () => {
      if (!isAuthenticated) {
        userService.clearCache();
        return null;
      }

      try {
        const currentUser = await userService.getCurrentUser();
        return currentUser;
      } catch (err) {
        const error =
          err instanceof Error ? err : new Error('Failed to load user');

        if (error.message === 'Unauthorized') {
          console.warn(
            '[UserProvider] Unauthorized - clearing cache and user data'
          );
          userService.clearCache();
          throw error;
        }

        const cachedUser = userService.getCachedUser();
        if (cachedUser) {
          return cachedUser;
        }

        throw error;
      }
    },
    refetchInterval: REFRESH_INTERVAL,
    staleTime: REFRESH_INTERVAL,
    retry: (failureCount, error) => {
      if (error instanceof Error && error.message === 'Unauthorized') {
        return false;
      }
      return failureCount < 2;
    },
  });

  const roles = useMemo(() => {
    return user?.roles ?? [];
  }, [user]);

  const refreshUser = useCallback(async () => {
    userService.clearCache();
    await queryClient.invalidateQueries({ queryKey: USER_QUERY_KEY });
  }, [userService, queryClient]);

  const hasRole = useCallback(
    (roleName: string): boolean => {
      return roles.some((role) => role === roleName);
    },
    [roles]
  );

  const hasAnyRole = useCallback(
    (roleNames: string[]): boolean => {
      return roleNames.some((roleName) => hasRole(roleName));
    },
    [hasRole]
  );

  const isSuperAdministrator = useCallback((): boolean => {
    return hasRole('SuperAdministrator');
  }, [hasRole]);

  const contextError = error instanceof Error ? error : null;

  const value: UserContextType = useMemo(
    () => ({
      user: user ?? null,
      roles,
      isLoading: false,
      error: contextError,
      refreshUser,
      hasRole,
      hasAnyRole,
      isSuperAdministrator,
    }),
    [
      user,
      roles,
      contextError,
      refreshUser,
      hasRole,
      hasAnyRole,
      isSuperAdministrator,
    ]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

const emptyRefreshUser = async () => {};
const emptyHasRole = () => false;
const emptyHasAnyRole = () => false;
const emptyIsSuperAdministrator = () => false;

const emptyUserContextValue: UserContextType = {
  user: null,
  roles: [],
  isLoading: false,
  error: null,
  refreshUser: emptyRefreshUser,
  hasRole: emptyHasRole,
  hasAnyRole: emptyHasAnyRole,
  isSuperAdministrator: emptyIsSuperAdministrator,
};

export const UserProvider = ({
  children,
  userService,
  useAuth,
  fallback,
}: UserProviderProps) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    userService.clearCache();
    return (
      <UserContext.Provider value={emptyUserContextValue}>
        {children}
      </UserContext.Provider>
    );
  }

  return (
    <Suspense fallback={fallback ?? null}>
      <UserQueryContent
        userService={userService}
        isAuthenticated={isAuthenticated}
      >
        {children}
      </UserQueryContent>
    </Suspense>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
