import * as React from 'react';

export function useDerivedState<T, S>(
  propValue: T,
  computeState: (prop: T) => S | null,
  deps: React.DependencyList
): [S | null, React.Dispatch<React.SetStateAction<S | null>>] {
  const [state, setState] = React.useState<S | null>(() =>
    computeState(propValue)
  );
  const prevPropRef = React.useRef(propValue);
  const prevDepsRef = React.useRef(deps);

  const hasDepsChanged = deps.some(
    (dep, index) => dep !== prevDepsRef.current[index]
  );

  if (prevPropRef.current !== propValue || hasDepsChanged) {
    prevPropRef.current = propValue;
    prevDepsRef.current = deps;
    const newState = computeState(propValue);
    if (newState !== state) {
      setState(newState);
    }
  }

  return [state, setState];
}
