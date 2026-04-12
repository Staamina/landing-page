import type { HierarchicalOption } from '../types';

export function getNodeAtPath(
  options: HierarchicalOption[],
  path: string[]
): HierarchicalOption | undefined {
  if (path.length === 0) return undefined;
  const [first, ...rest] = path;
  const node = options.find((o) => o.value === first);
  if (!node) return undefined;
  if (rest.length === 0) return node;
  return getNodeAtPath(node.children ?? [], rest);
}

export function getCurrentOptions(
  options: HierarchicalOption[],
  path: string[]
): HierarchicalOption[] {
  if (path.length === 0) return options;
  const node = getNodeAtPath(options, path);
  return node?.children ?? [];
}
