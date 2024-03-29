import React from "react"
import { useTable, usePagination, useSortBy, useGlobalFilter } from 'react-table'

import PaginationBar from "./PaginationBar"
import PageStatusFooter from "./PageStatusFooter"
import GlobalFilterBox from "./GlobalFilterBox"

interface IProps {
  columns: object[]
  data: object[]
  hiddenColumns?: string[]
  searchPlaceholder?: string
  autofocus?: boolean
}

const LocalPaginatedTable: React.FC<IProps> = ({
  columns,
  data,
  hiddenColumns = [],
  searchPlaceholder,
  autofocus,
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
        hiddenColumns: hiddenColumns,
      },
    },
    useGlobalFilter,
    useSortBy,
    usePagination,
  )

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
        placeholder={searchPlaceholder}
        autofocus={autofocus}
      />
      <div className="overflow-x-auto border border-stone-300 rounded-3xl shadow-md my-3 pt-1">
        <table className="w-full" {...getTableProps()}>
          <thead className="border-b">
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.getHeaderGroupProps().key}>
                {headerGroup.headers.map(column => (
                  // Add the sorting props to control sorting. For this example
                  // we can add them into the header props
                  <th
                    className="text-gray-900 font-medium text-left min-w-[120px] px-6 py-4"
                    key={column.getHeaderProps(column.getSortByToggleProps()).key}
                    {...column.getHeaderProps(column.getSortByToggleProps())}
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
        <PageStatusFooter
          pageIndex={pageIndex}
          pageLength={pageOptions.length}
        />
      </div>
    </div>
  )
}

export default LocalPaginatedTable
