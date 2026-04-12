import type { ApiResponse } from '@staamina/types';

import type { Address } from './address.types';
import { apiGet } from './client';

export interface Role {
  id: string;
  name: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  externalAuthId: string;
  email: string;
  name: string | null;
  createdAt: string;
  updatedAt: string;
  roles: Array<{
    id: string;
    userId: string;
    roleId: string;
    createdAt: string;
    role: Role;
  }>;
  company: {
    id: string;
    name: string;
    address: Address;
  } | null;
  site: {
    id: string;
    name: string;
    address: Address;
  } | null;
  serviceProvider: {
    id: string;
    name: string;
    address: Address;
  } | null;
}

export const usersApi = {
  /**
   * Récupère l'utilisateur actuel
   */
  getCurrent: async (): Promise<ApiResponse<User>> => {
    return apiGet<User>('/users/me');
  },

  /**
   * Récupère les rôles de l'utilisateur actuel
   */
  getCurrentRoles: async (): Promise<ApiResponse<Role[]>> => {
    return apiGet<Role[]>('/users/me/roles');
  },
};
