import { useQuery } from '@tanstack/react-query';
import type { Equipment } from '@staamina/types';

export interface UseEquipmentByCategoryOptions {
  siteId?: string | null;
  categoryId?: string;
  fetchEquipmentByCategory: (
    siteId: string,
    categoryId: string
  ) => Promise<Equipment[]>;
}

export function useEquipmentByCategory({
  siteId,
  categoryId,
  fetchEquipmentByCategory,
}: UseEquipmentByCategoryOptions) {
  const { data, isFetching, error } = useQuery({
    queryKey: ['fetchEquipmentByCategory', { siteId, categoryId }],
    queryFn: () => {
      if (!siteId || !categoryId) {
        return Promise.resolve([]);
      }

      return fetchEquipmentByCategory(siteId, categoryId);
    },
    staleTime: 5 * 60 * 1000,
  });

  return {
    data,
    isFetching,
    error,
  };
}
