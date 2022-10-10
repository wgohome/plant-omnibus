import React from "react"
import { useTable, usePagination, useSortBy } from 'react-table'

import PaginationBar from "./PaginationBar"

interface IProps {
  columns: object[]
  data: object[]
  pageCount: number
  loading: boolean
  fetchData: ({pageIndex, pageSize}: {pageIndex: number, pageSize: number}) => void
}

const LoaclPaginatedTable: React.FC<IProps> = ({
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
    // pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    // setHiddenColumns,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: defaultPageSize },
    },
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
      </div>
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
    </div>
  )
}

export default LoaclPaginatedTable
