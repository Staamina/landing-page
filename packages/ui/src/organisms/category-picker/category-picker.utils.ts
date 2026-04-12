import type { Category } from '@staamina/types';

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

export function isLeafCategory(category: CategoryTreeNode): boolean {
  return category.children.length === 0;
}

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
