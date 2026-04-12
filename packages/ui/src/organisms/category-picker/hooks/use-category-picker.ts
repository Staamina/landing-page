import * as React from 'react';
import type { Category } from '@staamina/types';
import type { CategoryTreeNode } from '../category-picker.utils';
import { ROOT_CATEGORY_ID } from '../category-picker.utils';

type CategoryPickerState = {
  selectedCategory: CategoryTreeNode;
  searchQuery: string;
  debouncedSearchQuery: string;
  searchTerm: string;
};

export enum CategoryPickerActionType {
  SetRootNode = 'SET_ROOT_NODE',
  SelectCategory = 'SELECT_CATEGORY',
  NavigateBack = 'NAVIGATE_BACK',
  SetSearchQuery = 'SET_SEARCH_QUERY',
  SetDebouncedSearch = 'SET_DEBOUNCED_SEARCH',
  ResetAll = 'RESET_ALL',
}

type CategoryPickerAction =
  | {
      type: CategoryPickerActionType.SetRootNode;
      payload: { rootNode: CategoryTreeNode };
    }
  | {
      type: CategoryPickerActionType.SelectCategory;
      payload: { category: CategoryTreeNode };
    }
  | {
      type: CategoryPickerActionType.NavigateBack;
      payload: { parent: CategoryTreeNode };
    }
  | {
      type: CategoryPickerActionType.SetSearchQuery;
      payload: { query: string };
    }
  | {
      type: CategoryPickerActionType.SetDebouncedSearch;
      payload: { query: string };
    }
  | {
      type: CategoryPickerActionType.ResetAll;
      payload: { rootNode: CategoryTreeNode };
    };

function categoryPickerReducer(
  state: CategoryPickerState,
  action: CategoryPickerAction
): CategoryPickerState {
  switch (action.type) {
    case CategoryPickerActionType.SetRootNode:
      return {
        ...state,
        selectedCategory: action.payload.rootNode,
      };

    case CategoryPickerActionType.SelectCategory:
      return {
        ...state,
        selectedCategory: action.payload.category,
        searchQuery: '',
        debouncedSearchQuery: '',
        searchTerm: '',
      };

    case CategoryPickerActionType.NavigateBack:
      return {
        ...state,
        selectedCategory: action.payload.parent,
        searchQuery: '',
        debouncedSearchQuery: '',
        searchTerm: '',
      };

    case CategoryPickerActionType.SetSearchQuery:
      return {
        ...state,
        searchQuery: action.payload.query,
      };

    case CategoryPickerActionType.SetDebouncedSearch:
      return {
        ...state,
        debouncedSearchQuery: action.payload.query,
        searchTerm: action.payload.query.trim(),
        selectedCategory:
          action.payload.query.trim() &&
          state.selectedCategory.id !== ROOT_CATEGORY_ID
            ? state.selectedCategory.parent || state.selectedCategory
            : state.selectedCategory,
      };

    case CategoryPickerActionType.ResetAll:
      return {
        ...state,
        selectedCategory: action.payload.rootNode,
        searchQuery: '',
        debouncedSearchQuery: '',
        searchTerm: '',
      };

    default:
      return state;
  }
}

export interface UseCategoryPickerOptions {
  rootNode: CategoryTreeNode;
  categoryHierarchy: CategoryTreeNode[];
  value?: Category | null;
  onChange: (category: Category | null) => void;
  onRetry: () => void;
}

export function useCategoryPicker({
  rootNode,
  categoryHierarchy,
  value,
  onChange,
  onRetry,
}: UseCategoryPickerOptions) {
  const [state, dispatch] = React.useReducer(categoryPickerReducer, {
    selectedCategory: rootNode,
    searchQuery: '',
    debouncedSearchQuery: '',
    searchTerm: '',
  });

  const findCategoryInHierarchy = React.useCallback(
    (
      nodes: typeof categoryHierarchy,
      targetId: string
    ): CategoryTreeNode | null => {
      for (const node of nodes) {
        if (node.id === targetId) {
          return node;
        }
        const found = findCategoryInHierarchy(node.children, targetId);
        if (found) return found;
      }
      return null;
    },
    [categoryHierarchy]
  );

  const handleSearchQueryChange = React.useCallback((query: string) => {
    dispatch({
      type: CategoryPickerActionType.SetSearchQuery,
      payload: { query },
    });
  }, []);

  const handleDebouncedSearchChange = React.useCallback(
    (debouncedQuery: string) => {
      dispatch({
        type: CategoryPickerActionType.SetDebouncedSearch,
        payload: { query: debouncedQuery },
      });
    },
    []
  );

  const handleSearchChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      handleSearchQueryChange(newValue);
    },
    [handleSearchQueryChange]
  );

  const handleSearchKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        e.preventDefault();
      }
    },
    []
  );

  const handleClearAll = React.useCallback(() => {
    dispatch({
      type: CategoryPickerActionType.ResetAll,
      payload: { rootNode },
    });

    onChange(null);
  }, [rootNode, onChange]);

  const handleCategoryClick = React.useCallback(
    (category: Category) => {
      if (state.selectedCategory.id === category.id) {
        const parent = state.selectedCategory.parent || rootNode;
        dispatch({
          type: CategoryPickerActionType.NavigateBack,
          payload: { parent },
        });

        if (parent.id === rootNode.id) {
          onChange(null);
        }
      } else {
        const categoryNode = findCategoryInHierarchy(
          categoryHierarchy,
          category.id
        );

        if (categoryNode) {
          dispatch({
            type: CategoryPickerActionType.SelectCategory,
            payload: { category: categoryNode },
          });

          const isLeaf = categoryNode.children.length === 0;
          onChange(
            isLeaf
              ? {
                  id: categoryNode.id,
                  name: categoryNode.name,
                  parentId: categoryNode.parentId,
                }
              : null
          );
        }
      }
    },
    [
      state.selectedCategory,
      rootNode,
      categoryHierarchy,
      findCategoryInHierarchy,
      onChange,
    ]
  );

  const handleCategorySearchClick = React.useCallback(
    (category: CategoryTreeNode) => {
      dispatch({
        type: CategoryPickerActionType.SelectCategory,
        payload: { category },
      });

      const isLeaf = category.children.length === 0;
      if (isLeaf) {
        onChange({
          id: category.id,
          name: category.name,
          parentId: category.parentId,
        });
      } else {
        onChange(null);
      }
    },
    [onChange]
  );

  const handleRetry = React.useCallback(() => {
    dispatch({
      type: CategoryPickerActionType.ResetAll,
      payload: { rootNode },
    });
    onChange(null);
    onRetry();
  }, [rootNode, onChange, onRetry]);

  React.useEffect(() => {
    if (value?.id && value.id !== state.selectedCategory.id) {
      const node = findCategoryInHierarchy(categoryHierarchy, value.id);
      if (node) {
        dispatch({
          type: CategoryPickerActionType.SelectCategory,
          payload: { category: node },
        });
      }
    }
  }, [value?.id, categoryHierarchy, findCategoryInHierarchy]);

  return {
    state,
    handlers: {
      handleSearchChange,
      handleSearchKeyDown,
      handleDebouncedSearchChange,
      handleClearAll,
      handleCategoryClick,
      handleCategorySearchClick,
      handleRetry,
    },
  };
}
