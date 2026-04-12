import type { Category, Equipment } from '@staamina/types';

export interface CategoryTreeNode extends Category {
  children: CategoryTreeNode[];
  parent: CategoryTreeNode | null;
}

export const ROOT_CATEGORY_ID = '__ROOT__';

export function createRootNode(
  rootCategories: CategoryTreeNode[]
): CategoryTreeNode {
  const rootNode: CategoryTreeNode = {
    id: ROOT_CATEGORY_ID,
    name: 'Root',
    parentId: null,
    children: rootCategories,
    parent: null,
  };

  rootCategories.forEach((category) => {
    category.parent = rootNode;
  });

  return rootNode;
}

export function buildCategoryHierarchy(
  categories: Category[]
): CategoryTreeNode[] {
  const categoryMap = new Map<string, CategoryTreeNode>();
  const rootCategories: CategoryTreeNode[] = [];

  categories.forEach((category) => {
    categoryMap.set(category.id, {
      ...category,
      children: [],
      parent: null,
    });
  });

  categories.forEach((category) => {
    const node = categoryMap.get(category.id);
    if (!node) return;

    if (!category.parentId) {
      rootCategories.push(node);
    } else {
      const parent = categoryMap.get(category.parentId);
      if (parent) {
        node.parent = parent;
        parent.children.push(node);
      } else {
        rootCategories.push(node);
      }
    }
  });

  return rootCategories;
}

export function getAllDescendantIds(node: CategoryTreeNode): string[] {
  const ids = [node.id];
  node.children.forEach((child) => {
    ids.push(...getAllDescendantIds(child));
  });
  return ids;
}

export function getAllAncestorIds(node: CategoryTreeNode): string[] {
  const ids: string[] = [];
  let current: CategoryTreeNode | null = node.parent;

  while (current) {
    ids.push(current.id);
    current = current.parent;
  }

  return ids;
}

export function filterEquipmentBySearch(
  equipment: Equipment[],
  searchQuery: string
): Equipment[] {
  if (!searchQuery.trim()) return equipment;

  const query = searchQuery.toLowerCase().trim();
  return equipment.filter((eq) => {
    const nameMatch = eq.name.toLowerCase().includes(query);
    const brandMatch = eq.model?.brand?.name.toLowerCase().includes(query);
    const modelMatch = eq.model?.name.toLowerCase().includes(query);
    const categoryMatch = eq.category?.name.toLowerCase().includes(query);

    return nameMatch || brandMatch || modelMatch || categoryMatch;
  });
}

export function filterEquipmentByCategory(
  equipment: Equipment[],
  categoryId: string
): Equipment[] {
  if (!categoryId) return equipment;

  return equipment.filter((eq) => {
    const matchesDirectCategory = eq.category?.id === categoryId;
    const matchesModelCategory = eq.model?.categoryId === categoryId;
    return matchesDirectCategory || matchesModelCategory;
  });
}

/**
 * Represents a category search match with its breadcrumb path
 */
export interface CategorySearchMatch {
  category: CategoryTreeNode;
  breadcrumb: CategoryTreeNode[];
  matchedQuery: string;
}

export interface CategorySearchIndexItem {
  category: CategoryTreeNode;
  breadcrumb: CategoryTreeNode[];
  searchableText: string;
}

/**
 * Get the breadcrumb path from root to the given category (excluding root)
 */
export function getCategoryBreadcrumb(
  category: CategoryTreeNode
): CategoryTreeNode[] {
  const breadcrumb: CategoryTreeNode[] = [];
  let current: CategoryTreeNode | null = category;

  while (current && current.id !== ROOT_CATEGORY_ID) {
    breadcrumb.unshift(current);
    current = current.parent;
  }

  return breadcrumb;
}

/**
 * Check if a category is a leaf category (has no children)
 */
export function isLeafCategory(category: CategoryTreeNode): boolean {
  return category.children.length === 0;
}

/**
 * Build a flattened search index for categories.
 * This pre-calculates breadcrumbs and searchable text to avoid recursion during search.
 */
export function buildCategorySearchIndex(
  rootCategories: CategoryTreeNode[]
): CategorySearchIndexItem[] {
  const index: CategorySearchIndexItem[] = [];

  function traverse(categories: CategoryTreeNode[]) {
    for (const category of categories) {
      index.push({
        category,
        breadcrumb: getCategoryBreadcrumb(category),
        searchableText: category.name.toLowerCase(),
      });

      if (category.children.length > 0) {
        traverse(category.children);
      }
    }
  }

  traverse(rootCategories);
  return index;
}

/**
 * Filter categories using the pre-computed search index
 */
export function filterCategoriesBySearch(
  searchIndex: CategorySearchIndexItem[],
  searchQuery: string
): CategorySearchMatch[] {
  if (!searchQuery.trim()) return [];

  const query = searchQuery.toLowerCase().trim();

  return searchIndex
    .filter((item) => item.searchableText.includes(query))
    .map((item) => ({
      category: item.category,
      breadcrumb: item.breadcrumb,
      matchedQuery: query,
    }));
}
