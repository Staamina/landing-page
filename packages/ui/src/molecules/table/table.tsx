'use client';

import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  type ColumnDef,
  type TableOptions,
  type PaginationState,
  type SortingState,
  type ColumnFiltersState,
  type VisibilityState,
  type HeaderContext,
  type CellContext,
} from '@tanstack/react-table';
import { clsx } from 'clsx';
import {
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { useMemo } from 'react';
import { twMerge } from 'tailwind-merge';

import { Button } from '@staamina/ui/button';

type TableMode = 'client' | 'manual';

export interface TableProps<TData> {
  data: TData[];
  columns: ColumnDef<TData>[];
  mode?: TableMode;
  className?: string;
  headerClassName?: string;
  bodyClassName?: string;
  rowClassName?: string | ((row: TData) => string);
  enablePagination?: boolean;
  enableSorting?: boolean;
  enableFiltering?: boolean;
  pageSize?: number;
  manualPagination?: boolean;
  manualSorting?: boolean;
  manualFiltering?: boolean;
  pageCount?: number;
  total?: number;
  onPaginationChange?: (pagination: PaginationState) => void;
  onSortingChange?: (sorting: SortingState) => void;
  onColumnFiltersChange?: (filters: ColumnFiltersState) => void;
  onColumnVisibilityChange?: (visibility: VisibilityState) => void;
  initialState?: {
    pagination?: PaginationState;
    sorting?: SortingState;
    columnFilters?: ColumnFiltersState;
    columnVisibility?: VisibilityState;
  };
  state?: {
    pagination?: PaginationState;
    sorting?: SortingState;
    columnFilters?: ColumnFiltersState;
    columnVisibility?: VisibilityState;
  };
}

function cn(...inputs: Parameters<typeof clsx>) {
  return twMerge(clsx(inputs));
}

export function Table<TData>({
  data,
  columns,
  mode = 'client',
  className,
  headerClassName,
  bodyClassName,
  rowClassName,
  enablePagination = true,
  enableSorting = true,
  enableFiltering = true,
  pageSize = 10,
  manualPagination = false,
  manualSorting = false,
  manualFiltering = false,
  pageCount,
  total,
  onPaginationChange,
  onSortingChange,
  onColumnFiltersChange,
  onColumnVisibilityChange,
  initialState,
  state,
}: TableProps<TData>) {
  const isClientMode = mode === 'client';

  const pagination = useMemo(
    () => ({
      pageIndex:
        state?.pagination?.pageIndex ??
        initialState?.pagination?.pageIndex ??
        0,
      pageSize:
        state?.pagination?.pageSize ??
        initialState?.pagination?.pageSize ??
        pageSize,
    }),
    [state?.pagination, initialState?.pagination, pageSize]
  );

  const sorting = useMemo(
    () => state?.sorting ?? initialState?.sorting ?? [],
    [state?.sorting, initialState?.sorting]
  );

  const columnFilters = useMemo(
    () => state?.columnFilters ?? initialState?.columnFilters ?? [],
    [state?.columnFilters, initialState?.columnFilters]
  );

  const columnVisibility = useMemo(
    () => state?.columnVisibility ?? initialState?.columnVisibility ?? {},
    [state?.columnVisibility, initialState?.columnVisibility]
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel:
      isClientMode && enablePagination && !manualPagination
        ? getPaginationRowModel()
        : undefined,
    getSortedRowModel:
      isClientMode && enableSorting && !manualSorting
        ? getSortedRowModel()
        : undefined,
    getFilteredRowModel:
      isClientMode && enableFiltering && !manualFiltering
        ? getFilteredRowModel()
        : undefined,
    manualPagination: !isClientMode || manualPagination,
    manualSorting: !isClientMode || manualSorting,
    manualFiltering: !isClientMode || manualFiltering,
    pageCount: pageCount ?? -1,
    state: {
      pagination,
      sorting,
      columnFilters,
      columnVisibility,
    },
    onPaginationChange: onPaginationChange,
    onSortingChange: onSortingChange,
    onColumnFiltersChange: onColumnFiltersChange,
    onColumnVisibilityChange: onColumnVisibilityChange,
    initialState: initialState,
  } as TableOptions<TData>);

  const getRowClassName = (rowData: TData): string => {
    if (typeof rowClassName === 'function') {
      return rowClassName(rowData);
    }
    return rowClassName ?? '';
  };

  return (
    <div className={cn('w-full', className)}>
      <div className="table-container">
        <table className="w-full">
          <thead className={cn('table-header', headerClassName)}>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className={cn(
                      'table-cell text-left align-middle font-medium text-text-secondary',
                      enableSorting &&
                        header.column.getCanSort() &&
                        'cursor-pointer select-none hover:bg-hover',
                      header.column.getIsSorted() && 'bg-subtle'
                    )}
                    onClick={
                      enableSorting
                        ? header.column.getToggleSortingHandler()
                        : undefined
                    }
                  >
                    <div className="flex items-center space-x-2">
                      {header.isPlaceholder
                        ? null
                        : typeof header.column.columnDef.header === 'function'
                          ? header.column.columnDef.header({
                              column: header.column,
                              header: header,
                              table: table,
                            } as HeaderContext<TData, unknown>)
                          : (header.column.columnDef.header ?? header.id)}
                      {enableSorting && header.column.getCanSort() && (
                        <span className="text-xs">
                          {{
                            asc: '↑',
                            desc: '↓',
                          }[header.column.getIsSorted() as string] ?? '⇅'}
                        </span>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className={cn('divide-y divide-border', bodyClassName)}>
            {table.getRowModel().rows.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="py-xl text-center text-text-secondary"
                >
                  No results found.
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className={cn(
                    'table-row transition-colors',
                    getRowClassName(row.original)
                  )}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="table-cell align-middle">
                      {typeof cell.column.columnDef.cell === 'function'
                        ? cell.column.columnDef.cell({
                            cell: cell,
                            column: cell.column,
                            row: row,
                            table: table,
                            getValue: cell.getValue,
                            renderValue: cell.renderValue,
                          } as CellContext<TData, unknown>)
                        : (cell.getValue() as React.ReactNode)}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {enablePagination && (
        <div className="flex items-center justify-between px-md py-md border-t border-border">
          <div className="flex-1 text-sm text-text-secondary">
            {(() => {
              const rowCount = isClientMode
                ? table.getFilteredRowModel().rows.length
                : (total ?? data.length);
              const currentPage = table.getState().pagination.pageIndex;
              const currentPageSize = table.getState().pagination.pageSize;
              const start =
                rowCount > 0 ? currentPage * currentPageSize + 1 : 0;
              const end = Math.min(
                (currentPage + 1) * currentPageSize,
                rowCount
              );
              return rowCount > 0
                ? `Showing ${start} to ${end} of ${rowCount} results`
                : 'No results';
            })()}
          </div>
          <div className="flex items-center gap-sm">
            <div className="flex items-center gap-xs">
              <Button
                type="button"
                intent="tertiary"
                appearance="outline"
                size="icon"
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
                aria-label="First page"
              >
                <ChevronFirst className="size-4" />
              </Button>
              <Button
                type="button"
                intent="tertiary"
                appearance="outline"
                size="icon"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                aria-label="Previous page"
              >
                <ChevronLeft className="size-4" />
              </Button>
            </div>
            <div className="flex items-center gap-sm px-sm">
              <span className="text-sm text-text-secondary">
                Page{' '}
                <span className="font-medium">
                  {table.getState().pagination.pageIndex + 1}
                </span>{' '}
                of{' '}
                <span className="font-medium">{table.getPageCount() || 1}</span>
              </span>
            </div>
            <div className="flex items-center gap-xs">
              <Button
                type="button"
                intent="tertiary"
                appearance="outline"
                size="icon"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
                aria-label="Next page"
              >
                <ChevronRight className="size-4" />
              </Button>
              <Button
                type="button"
                intent="tertiary"
                appearance="outline"
                size="icon"
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
                aria-label="Last page"
              >
                <ChevronLast className="size-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
