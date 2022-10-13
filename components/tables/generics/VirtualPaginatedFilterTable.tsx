import React from "react"
import { useTable, usePagination, useSortBy, useGlobalFilter } from 'react-table'

import PaginationBar from "./PaginationBar"
import GlobalFilterBox from "./GlobalFilterBox"

export interface IPropsFetchData {
  pageSize: number
  pageIndex: number
  queryFilter?: string | null
}

interface IProps {
  columns: object[]
  data: object[]
  pageCount: number
  loading: boolean
  fetchData: ({ pageIndex, pageSize, queryFilter }: IPropsFetchData) => void
}

const VirtualPaginatedTable: React.FC<IProps> = ({
  columns,
  data,
  pageCount: controlledPageCount,
  loading,
  fetchData,
}) => {
  const defaultPageSize: number = process.env.pageSize ? parseInt(process.env.pageSize) : 10

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,  // Instead of rows
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    // setHiddenColumns,
    preGlobalFilteredRows,
    setGlobalFilter,
    state: { pageIndex, pageSize, globalFilter },
  } = useTable(
    {
      columns,
      data,
      initialState: {
        pageIndex: 0,
        pageSize: defaultPageSize,
      },
      manualPagination: true,
      pageCount: controlledPageCount,  // Needed when doing manualPagination
      // Needed when useSortBy + usePagination combo of hooks are used
      // Otherwise, the table just kept resetting to its original state even on page change
      autoResetPage: false,
      // To do GlobalFilter on serverside
      manualGlobalFilter: true,
      autoResetGlobalFilter: false,
    },
    useGlobalFilter,
    useSortBy,
    usePagination,
  )

  /*
    Whenever pageIndex changes, the data will be fetched.
    useEffect to avoid re-rendering
  */
  React.useEffect(() => {
    fetchData({ pageIndex, pageSize })
  }, [fetchData, pageIndex, pageSize])

  /*
    Filter state
  */
  React.useEffect(() => {
    fetchData({ pageIndex, pageSize, queryFilter: globalFilter })
  }, [fetchData, pageIndex, pageSize, globalFilter])

  return (
    <div>
      <pre hidden>
        <code>
          {JSON.stringify(
            {
              pageIndex,
              pageSize,
              pageCount,
              canNextPage,
              canPreviousPage,
              globalFilter,
            },
            null,
            2
          )}
        </code>
      </pre>
      <PaginationBar
        {...{
          pageIndex,  // This is a state from useTable hook
          pageSize,  // This is a state from useTable hook
          pageCount,
          canPreviousPage,
          previousPage,
          canNextPage,
          nextPage,
          gotoPage,
          setPageSize,
        }}
      />
      <GlobalFilterBox
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
      />
      <div className="overflow-x-auto border border-stone-300 rounded-xl shadow-lg my-3">
        <table className="w-full" {...getTableProps()}>
          <thead className="border-b">
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.getHeaderGroupProps().key}>
                {headerGroup.headers.map(column => (
                  // Add the sorting props to control sorting. For this example
                  // we can add them into the header props
                  <th
                    className="text-gray-900 font-medium text-left min-w-[120px] px-6 py-4"
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    key={column.getHeaderProps().key}
                  >
                    {column.render('Header')}
                    {/* Add a sort direction indicator */}
                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? ' 🔽'
                          : ' 🔼'
                        : ''}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
                prepareRow(row);
                return (
                  <tr
                    className="bg-white border-b last:border-0"
                    {...row.getRowProps()}
                    key={row.getRowProps().key}
                  >
                    {row.cells.map(cell => {
                      return (
                        <td
                          className="text-gray-900 text-sm font-light px-6 py-4"
                          {...cell.getCellProps()}
                          key={cell.getCellProps().key}
                        >
                          {cell.render('Cell')}
                        </td>
                      )
                    })}
                  </tr>
                )}
            )}
          </tbody>
        </table>
        {/* Optional foorter row */}
        <div className="px-3">
          {loading ? (
            <span>Loading ...</span>
          ) : (
            <span>
              Page{' '}
              <strong>
                {pageIndex + 1}
              </strong>{' '}
              of {pageOptions.length}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

export default VirtualPaginatedTable
