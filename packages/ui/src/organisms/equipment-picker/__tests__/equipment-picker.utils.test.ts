import { describe, it, expect } from 'vitest';
import {
  buildCategoryHierarchy,
  buildCategorySearchIndex,
  createRootNode,
  getAllDescendantIds,
  getAllAncestorIds,
  getCategoryBreadcrumb,
  isLeafCategory,
  filterCategoriesBySearch,
  ROOT_CATEGORY_ID,
} from '../equipment-picker.utils';
import type { Category } from '@staamina/types';

describe('equipment-picker.utils', () => {
  const mockCategories: Category[] = [
    { id: 'cat-1', name: 'HVAC', parentId: null },
    { id: 'cat-2', name: 'Split Systems', parentId: 'cat-1' },
    { id: 'cat-3', name: 'Central Air', parentId: 'cat-1' },
    { id: 'cat-4', name: 'Electrical', parentId: null },
    { id: 'cat-5', name: 'Lighting', parentId: 'cat-4' },
    { id: 'cat-6', name: 'LED', parentId: 'cat-5' },
  ];

  describe('createRootNode', () => {
    it('should create a root node with all root categories as children', () => {
      const hierarchy = buildCategoryHierarchy(mockCategories);
      const rootNode = createRootNode(hierarchy);

      expect(rootNode.id).toBe(ROOT_CATEGORY_ID);
      expect(rootNode.name).toBe('Root');
      expect(rootNode.parent).toBeNull();
      expect(rootNode.children).toHaveLength(2); // HVAC and Electrical
    });

    it('should set parent reference for all root categories', () => {
      const hierarchy = buildCategoryHierarchy(mockCategories);
      const rootNode = createRootNode(hierarchy);

      const hvac = rootNode.children.find((cat) => cat.id === 'cat-1');
      const electrical = rootNode.children.find((cat) => cat.id === 'cat-4');

      expect(hvac?.parent).toBe(rootNode);
      expect(electrical?.parent).toBe(rootNode);
    });
  });

  describe('buildCategoryHierarchy', () => {
    it('should build hierarchy with parent references', () => {
      const hierarchy = buildCategoryHierarchy(mockCategories);

      expect(hierarchy).toHaveLength(2); // HVAC and Electrical

      const hvac = hierarchy.find((cat) => cat.id === 'cat-1');
      expect(hvac).toBeDefined();
      expect(hvac?.parent).toBeNull();
      expect(hvac?.children).toHaveLength(2);

      const splitSystems = hvac?.children.find((cat) => cat.id === 'cat-2');
      expect(splitSystems).toBeDefined();
      expect(splitSystems?.parent).toBe(hvac);
    });

    it('should handle deeply nested hierarchies', () => {
      const hierarchy = buildCategoryHierarchy(mockCategories);

      const electrical = hierarchy.find((cat) => cat.id === 'cat-4');
      const lighting = electrical?.children.find((cat) => cat.id === 'cat-5');
      const led = lighting?.children.find((cat) => cat.id === 'cat-6');

      expect(led).toBeDefined();
      expect(led?.parent).toBe(lighting);
      expect(lighting?.parent).toBe(electrical);
      expect(electrical?.parent).toBeNull();
    });

    it('should handle orphaned categories', () => {
      const categoriesWithOrphan: Category[] = [
        { id: 'cat-1', name: 'Root', parentId: null },
        { id: 'cat-2', name: 'Orphan', parentId: 'non-existent' },
      ];

      const hierarchy = buildCategoryHierarchy(categoriesWithOrphan);

      expect(hierarchy).toHaveLength(2);
      const orphan = hierarchy.find((cat) => cat.id === 'cat-2');
      expect(orphan).toBeDefined();
      expect(orphan?.parent).toBeNull();
    });
  });

  describe('getAllDescendantIds', () => {
    it('should return all descendant IDs including the node itself', () => {
      const hierarchy = buildCategoryHierarchy(mockCategories);
      const hvac = hierarchy.find((cat) => cat.id === 'cat-1')!;

      const descendantIds = getAllDescendantIds(hvac);

      expect(descendantIds).toContain('cat-1'); // HVAC itself
      expect(descendantIds).toContain('cat-2'); // Split Systems
      expect(descendantIds).toContain('cat-3'); // Central Air
      expect(descendantIds).toHaveLength(3);
    });

    it('should return only node ID for leaf nodes', () => {
      const hierarchy = buildCategoryHierarchy(mockCategories);
      const hvac = hierarchy.find((cat) => cat.id === 'cat-1')!;
      const splitSystems = hvac.children.find((cat) => cat.id === 'cat-2')!;

      const descendantIds = getAllDescendantIds(splitSystems);

      expect(descendantIds).toEqual(['cat-2']);
    });

    it('should handle deeply nested hierarchies', () => {
      const hierarchy = buildCategoryHierarchy(mockCategories);
      const electrical = hierarchy.find((cat) => cat.id === 'cat-4')!;

      const descendantIds = getAllDescendantIds(electrical);

      expect(descendantIds).toContain('cat-4'); // Electrical
      expect(descendantIds).toContain('cat-5'); // Lighting
      expect(descendantIds).toContain('cat-6'); // LED
      expect(descendantIds).toHaveLength(3);
    });
  });

  describe('getAllAncestorIds', () => {
    it('should return all ancestor IDs', () => {
      const hierarchy = buildCategoryHierarchy(mockCategories);
      const electrical = hierarchy.find((cat) => cat.id === 'cat-4')!;
      const lighting = electrical.children.find((cat) => cat.id === 'cat-5')!;
      const led = lighting.children.find((cat) => cat.id === 'cat-6')!;

      const ancestorIds = getAllAncestorIds(led);

      expect(ancestorIds).toContain('cat-5'); // Lighting
      expect(ancestorIds).toContain('cat-4'); // Electrical
      expect(ancestorIds).toHaveLength(2);
      expect(ancestorIds[0]).toBe('cat-5'); // Closest ancestor first
      expect(ancestorIds[1]).toBe('cat-4');
    });

    it('should return empty array for root nodes', () => {
      const hierarchy = buildCategoryHierarchy(mockCategories);
      const hvac = hierarchy.find((cat) => cat.id === 'cat-1')!;

      const ancestorIds = getAllAncestorIds(hvac);

      expect(ancestorIds).toEqual([]);
    });

    it('should return immediate parent for first-level children', () => {
      const hierarchy = buildCategoryHierarchy(mockCategories);
      const hvac = hierarchy.find((cat) => cat.id === 'cat-1')!;
      const splitSystems = hvac.children.find((cat) => cat.id === 'cat-2')!;

      const ancestorIds = getAllAncestorIds(splitSystems);

      expect(ancestorIds).toEqual(['cat-1']);
    });
  });

  describe('getCategoryBreadcrumb', () => {
    it('should return single item breadcrumb for root categories', () => {
      const hierarchy = buildCategoryHierarchy(mockCategories);
      const hvac = hierarchy.find((cat) => cat.id === 'cat-1')!;

      const breadcrumb = getCategoryBreadcrumb(hvac);

      expect(breadcrumb).toHaveLength(1);
      expect(breadcrumb[0].id).toBe('cat-1');
    });

    it('should return full breadcrumb path for nested categories', () => {
      const hierarchy = buildCategoryHierarchy(mockCategories);
      const electrical = hierarchy.find((cat) => cat.id === 'cat-4')!;
      const lighting = electrical.children.find((cat) => cat.id === 'cat-5')!;
      const led = lighting.children.find((cat) => cat.id === 'cat-6')!;

      const breadcrumb = getCategoryBreadcrumb(led);

      expect(breadcrumb).toHaveLength(3);
      expect(breadcrumb[0].id).toBe('cat-4'); // Electrical
      expect(breadcrumb[1].id).toBe('cat-5'); // Lighting
      expect(breadcrumb[2].id).toBe('cat-6'); // LED
    });

    it('should return breadcrumb from root node children', () => {
      const hierarchy = buildCategoryHierarchy(mockCategories);
      const rootNode = createRootNode(hierarchy);
      const hvac = rootNode.children.find((cat) => cat.id === 'cat-1')!;

      const breadcrumb = getCategoryBreadcrumb(hvac);

      expect(breadcrumb).toHaveLength(1);
      expect(breadcrumb[0].id).toBe('cat-1');
    });
  });

  describe('isLeafCategory', () => {
    it('should return true for categories without children', () => {
      const hierarchy = buildCategoryHierarchy(mockCategories);
      const hvac = hierarchy.find((cat) => cat.id === 'cat-1')!;
      const splitSystems = hvac.children.find((cat) => cat.id === 'cat-2')!;

      expect(isLeafCategory(splitSystems)).toBe(true);
    });

    it('should return false for categories with children', () => {
      const hierarchy = buildCategoryHierarchy(mockCategories);
      const hvac = hierarchy.find((cat) => cat.id === 'cat-1')!;

      expect(isLeafCategory(hvac)).toBe(false);
    });

    it('should return true for deeply nested leaf categories', () => {
      const hierarchy = buildCategoryHierarchy(mockCategories);
      const electrical = hierarchy.find((cat) => cat.id === 'cat-4')!;
      const lighting = electrical.children.find((cat) => cat.id === 'cat-5')!;
      const led = lighting.children.find((cat) => cat.id === 'cat-6')!;

      expect(isLeafCategory(led)).toBe(true);
    });
  });

  describe('buildCategorySearchIndex', () => {
    it('should create an index item for every category', () => {
      const hierarchy = buildCategoryHierarchy(mockCategories);
      const index = buildCategorySearchIndex(hierarchy);

      expect(index).toHaveLength(6);
      expect(index.some((item) => item.category.id === 'cat-1')).toBe(true);
      expect(index.some((item) => item.category.id === 'cat-6')).toBe(true);
    });

    it('should pre-calculate breadcrumbs', () => {
      const hierarchy = buildCategoryHierarchy(mockCategories);
      const index = buildCategorySearchIndex(hierarchy);

      const led = index.find((item) => item.category.id === 'cat-6');
      expect(led).toBeDefined();
      expect(led?.breadcrumb).toHaveLength(3);
      expect(led?.breadcrumb[0].id).toBe('cat-4');
    });

    it('should pre-calculate searchable text', () => {
      const hierarchy = buildCategoryHierarchy(mockCategories);
      const index = buildCategorySearchIndex(hierarchy);

      const splitSystems = index.find((item) => item.category.id === 'cat-2');
      expect(splitSystems?.searchableText).toBe('split systems');
    });
  });

  describe('filterCategoriesBySearch', () => {
    it('should return empty array for empty search query', () => {
      const hierarchy = buildCategoryHierarchy(mockCategories);
      const index = buildCategorySearchIndex(hierarchy);

      const matches = filterCategoriesBySearch(index, '');

      expect(matches).toHaveLength(0);
    });

    it('should find root categories by name', () => {
      const hierarchy = buildCategoryHierarchy(mockCategories);
      const index = buildCategorySearchIndex(hierarchy);

      const matches = filterCategoriesBySearch(index, 'HVAC');

      expect(matches).toHaveLength(1);
      expect(matches[0].category.id).toBe('cat-1');
      expect(matches[0].breadcrumb).toHaveLength(1);
    });

    it('should find nested categories by name', () => {
      const hierarchy = buildCategoryHierarchy(mockCategories);
      const index = buildCategorySearchIndex(hierarchy);

      const matches = filterCategoriesBySearch(index, 'LED');

      expect(matches).toHaveLength(1);
      expect(matches[0].category.id).toBe('cat-6');
      expect(matches[0].breadcrumb).toHaveLength(3);
      expect(matches[0].breadcrumb[0].id).toBe('cat-4'); // Electrical
      expect(matches[0].breadcrumb[1].id).toBe('cat-5'); // Lighting
      expect(matches[0].breadcrumb[2].id).toBe('cat-6'); // LED
    });

    it('should be case-insensitive', () => {
      const hierarchy = buildCategoryHierarchy(mockCategories);
      const index = buildCategorySearchIndex(hierarchy);

      const matches = filterCategoriesBySearch(index, 'hvac');

      expect(matches).toHaveLength(1);
      expect(matches[0].category.id).toBe('cat-1');
    });

    it('should find multiple categories matching query', () => {
      const hierarchy = buildCategoryHierarchy(mockCategories);
      const index = buildCategorySearchIndex(hierarchy);

      const matches = filterCategoriesBySearch(index, 'ight'); // Matches "Lighting"

      expect(matches).toHaveLength(1);
      expect(matches[0].category.id).toBe('cat-5');
    });

    it('should return empty array when no matches found', () => {
      const hierarchy = buildCategoryHierarchy(mockCategories);
      const index = buildCategorySearchIndex(hierarchy);

      const matches = filterCategoriesBySearch(index, 'nonexistent');

      expect(matches).toHaveLength(0);
    });

    it('should include matched query in result', () => {
      const hierarchy = buildCategoryHierarchy(mockCategories);
      const index = buildCategorySearchIndex(hierarchy);

      const matches = filterCategoriesBySearch(index, 'Split');

      expect(matches).toHaveLength(1);
      expect(matches[0].matchedQuery).toBe('split'); // Lowercase
    });
  });
});
