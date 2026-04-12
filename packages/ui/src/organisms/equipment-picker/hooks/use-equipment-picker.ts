import * as React from 'react';
import type { Equipment, Category } from '@staamina/types';
import type { CategoryTreeNode } from '../equipment-picker.utils';
import { ROOT_CATEGORY_ID } from '../equipment-picker.utils';

type EquipmentPickerState = {
  selectedCategory: CategoryTreeNode;
  searchQuery: string;
  debouncedSearchQuery: string;
  searchTerm: string;
};

export enum EquipmentPickerActionType {
  SetRootNode = 'SET_ROOT_NODE',
  SelectCategory = 'SELECT_CATEGORY',
  NavigateBack = 'NAVIGATE_BACK',
  SetSearchQuery = 'SET_SEARCH_QUERY',
  SetDebouncedSearch = 'SET_DEBOUNCED_SEARCH',
  ResetAll = 'RESET_ALL',
}

type EquipmentPickerAction =
  | {
      type: EquipmentPickerActionType.SetRootNode;
      payload: { rootNode: CategoryTreeNode };
    }
  | {
      type: EquipmentPickerActionType.SelectCategory;
      payload: { category: CategoryTreeNode };
    }
  | {
      type: EquipmentPickerActionType.NavigateBack;
      payload: { parent: CategoryTreeNode };
    }
  | {
      type: EquipmentPickerActionType.SetSearchQuery;
      payload: { query: string };
    }
  | {
      type: EquipmentPickerActionType.SetDebouncedSearch;
      payload: { query: string };
    }
  | {
      type: EquipmentPickerActionType.ResetAll;
      payload: { rootNode: CategoryTreeNode };
    };

function equipmentPickerReducer(
  state: EquipmentPickerState,
  action: EquipmentPickerAction
): EquipmentPickerState {
  switch (action.type) {
    case EquipmentPickerActionType.SetRootNode:
      return {
        ...state,
        selectedCategory: action.payload.rootNode,
      };

    case EquipmentPickerActionType.SelectCategory:
      return {
        ...state,
        selectedCategory: action.payload.category,
        searchQuery: '',
        debouncedSearchQuery: '',
        searchTerm: '',
      };

    case EquipmentPickerActionType.NavigateBack:
      return {
        ...state,
        selectedCategory: action.payload.parent,
        searchQuery: '',
        debouncedSearchQuery: '',
        searchTerm: '',
      };

    case EquipmentPickerActionType.SetSearchQuery:
      return {
        ...state,
        searchQuery: action.payload.query,
      };

    case EquipmentPickerActionType.SetDebouncedSearch:
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

    case EquipmentPickerActionType.ResetAll:
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

export interface UseEquipmentPickerOptions {
  rootNode: CategoryTreeNode;
  categoryHierarchy: CategoryTreeNode[];
  value?: Equipment | null;
  onChange: (equipment: Equipment | null) => void;
  onRetry: () => void;
}

export function useEquipmentPicker({
  rootNode,
  categoryHierarchy,
  value,
  onChange,
  onRetry,
}: UseEquipmentPickerOptions) {
  const [state, dispatch] = React.useReducer(equipmentPickerReducer, {
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
      type: EquipmentPickerActionType.SetSearchQuery,
      payload: { query },
    });
  }, []);

  const handleDebouncedSearchChange = React.useCallback(
    (debouncedQuery: string) => {
      dispatch({
        type: EquipmentPickerActionType.SetDebouncedSearch,
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
      type: EquipmentPickerActionType.ResetAll,
      payload: { rootNode },
    });

    onChange(null);
  }, [rootNode, onChange]);

  const handleCategoryClick = React.useCallback(
    (category: Category) => {
      if (state.selectedCategory.id === category.id) {
        const parent = state.selectedCategory.parent || rootNode;
        dispatch({
          type: EquipmentPickerActionType.NavigateBack,
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
            type: EquipmentPickerActionType.SelectCategory,
            payload: { category: categoryNode },
          });
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
        type: EquipmentPickerActionType.SelectCategory,
        payload: { category },
      });
    },
    []
  );

  const handleBackNavigation = React.useCallback(() => {
    const parent = state.selectedCategory.parent || rootNode;

    dispatch({
      type: EquipmentPickerActionType.NavigateBack,
      payload: { parent },
    });

    onChange(null);
  }, [state.selectedCategory, rootNode, onChange]);

  const handleEquipmentClick = React.useCallback(
    (equipment: Equipment) => {
      if (value?.id === equipment.id) {
        onChange(null);
      } else {
        onChange(equipment);
      }
    },
    [value?.id, onChange]
  );

  const handleRetry = React.useCallback(() => {
    dispatch({
      type: EquipmentPickerActionType.ResetAll,
      payload: { rootNode },
    });
    onChange(null);
    onRetry();
  }, [rootNode, onChange, onRetry]);

  return {
    state,
    handlers: {
      handleSearchChange,
      handleSearchKeyDown,
      handleDebouncedSearchChange,
      handleClearAll,
      handleCategoryClick,
      handleCategorySearchClick,
      handleBackNavigation,
      handleEquipmentClick,
      handleRetry,
    },
  };
}
