import { describe, it, expect } from 'vitest';
import { getNodeAtPath, getCurrentOptions } from '../utils/tree-utils';
import { mockOptions, deepOptions } from './hierarchical-drawer-picker.mock';

describe('hierarchical-drawer-picker utils', () => {
  describe('getNodeAtPath', () => {
    it('should return undefined for empty path', () => {
      expect(getNodeAtPath(mockOptions, [])).toBeUndefined();
    });

    it('should return root-level node by value', () => {
      const node = getNodeAtPath(mockOptions, ['hvac']);
      expect(node).toBeDefined();
      expect(node?.value).toBe('hvac');
      expect(node?.label).toBe('HVAC');
      expect(node?.children).toHaveLength(2);
    });

    it('should return nested node for multi-step path', () => {
      const node = getNodeAtPath(mockOptions, ['hvac', 'hvac-split']);
      expect(node).toBeDefined();
      expect(node?.value).toBe('hvac-split');
      expect(node?.label).toBe('Split Systems');
      expect(node?.children).toBeUndefined();
    });

    it('should return undefined when first segment does not match', () => {
      expect(getNodeAtPath(mockOptions, ['unknown'])).toBeUndefined();
    });

    it('should return undefined when path goes beyond tree', () => {
      expect(
        getNodeAtPath(mockOptions, ['hvac', 'non-existent'])
      ).toBeUndefined();
    });

    it('should handle deep hierarchy', () => {
      const node = getNodeAtPath(deepOptions, ['a', 'a1', 'a1x', 'a1x-leaf']);
      expect(node).toBeDefined();
      expect(node?.value).toBe('a1x-leaf');
      expect(node?.label).toBe('Level 4 Leaf');
    });

    it('should return undefined for path longer than tree depth', () => {
      expect(
        getNodeAtPath(mockOptions, ['hvac', 'hvac-split', 'extra'])
      ).toBeUndefined();
    });
  });

  describe('getCurrentOptions', () => {
    it('should return root options for empty path', () => {
      const options = getCurrentOptions(mockOptions, []);
      expect(options).toHaveLength(3);
      expect(options.map((o) => o.value)).toEqual([
        'hvac',
        'electrical',
        'plumbing',
      ]);
    });

    it('should return children of node at path', () => {
      const options = getCurrentOptions(mockOptions, ['hvac']);
      expect(options).toHaveLength(2);
      expect(options.map((o) => o.value)).toEqual([
        'hvac-split',
        'hvac-central',
      ]);
    });

    it('should return empty array when node has no children', () => {
      const options = getCurrentOptions(mockOptions, ['hvac', 'hvac-split']);
      expect(options).toEqual([]);
    });

    it('should return empty array when path is invalid', () => {
      const options = getCurrentOptions(mockOptions, ['invalid']);
      expect(options).toEqual([]);
    });

    it('should handle deep path', () => {
      const options = getCurrentOptions(deepOptions, ['a', 'a1', 'a1x']);
      expect(options).toHaveLength(1);
      expect(options[0].value).toBe('a1x-leaf');
    });
  });
});
