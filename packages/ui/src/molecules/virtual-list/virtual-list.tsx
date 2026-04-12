import * as React from 'react';
import { WarperComponent } from '@itsmeadarsh/warper';

const DEFAULT_ESTIMATE_SIZE = 104;
const DEFAULT_ITEM_GAP = 8;

export interface VirtualListProps<T> {
  data: T[];
  children: (item: T, index: number) => React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  estimateSize?: (index: number) => number;
}

export const VirtualList = <T,>({
  data,
  children,
  className,
  style,
  estimateSize = () => DEFAULT_ESTIMATE_SIZE,
}: VirtualListProps<T>) => {
  if (data.length === 0) {
    return null;
  }

  return (
    <WarperComponent
      itemCount={data.length}
      estimateSize={(index) => estimateSize(index) + DEFAULT_ITEM_GAP}
      className={className}
      style={style}
    >
      {(index) => (
        <div style={{ pointerEvents: 'auto', marginBottom: DEFAULT_ITEM_GAP }}>
          {children(data[index], index)}
        </div>
      )}
    </WarperComponent>
  );
};
