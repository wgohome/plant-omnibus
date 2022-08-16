import React from "react"
import { useTable, usePagination } from 'react-table'

const GenesTable = ({
  columns,
  data,
  fetchGenes,
  loading,
  pageCount: controlledPageCount,
  givenPageSize  // optional
}) => {
  givenPageSize = givenPageSize || process.env.pageSize

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    // Get the state from the instance
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: givenPageSize }, // Pass our hoisted table state
      manualPagination: true, // Tell the usePagination
      // hook that we'll handle our own data fetching
      // This means we'll also have to provide our own
      // pageCount.
      pageCount: controlledPageCount,
    },
    usePagination
  )

  // Listen for changes in pagination and use the state to fetch our new data
  React.useEffect(() => {
    fetchGenes({ pageIndex, pageSize })
  }, [fetchGenes, pageIndex, pageSize])

  return (
    <>
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
        <table {...getTableProps()}>
          <thead className="border-b">
            {headerGroups.map(headerGroup => (
              // eslint-disable-next-line react/jsx-key
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  // eslint-disable-next-line react/jsx-key
                  <th
                    scope="col"
                    className="text-gray-900 font-medium text-left min-w-[120px] px-6 py-4"
                    {...column.getHeaderProps()}
                  >
                    {column.render('Header')}
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
            {page.map((row, i) => {
              prepareRow(row)
              return (
                // eslint-disable-next-line react/jsx-key
                <tr
                  className="bg-white border-b last:border-0"
                  {...row.getRowProps()}
                >
                  {row.cells.map(cell => {
                    // eslint-disable-next-line react/jsx-key
                    return (
                      // eslint-disable-next-line react/jsx-key
                      <td
                        className="text-gray-900 text-sm font-light px-6 py-4"
                        {...cell.getCellProps()}
                      >
                        {cell.render('Cell')}
                      </td>
                    )
                  })}
                </tr>
              )
            })}
            <tr>
              {loading ? (
                <span>Loading ...</span>
              ) : (
                <span>
                  Page{' '}
                  <strong>
                    {pageIndex + 1} of {pageOptions.length}
                  </strong>
                </span>
              )}
            </tr>
          </tbody>
        </table>
      </div>

      {/*
        Pagination
      */}
      <nav className="flex justify-center">
        <div className="inline-flex drop-shadow-md my-4">
          <button
            className="py-2 px-3 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
            onClick={() => gotoPage(0)}
            disabled={!canPreviousPage}
          >
            First
          </button>
          <button
            className="py-2 px-5 text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
          >
            {'<'}
          </button>
          <div
            className="py-2 px-5 text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
          >
            Go to{" "}
            <input
              className="text-center border border-stone-300"
              type="number"
              defaultValue={pageIndex + 1}
              onChange={e => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0
                gotoPage(page)
              }}
              style={{ width: '50px' }}
            />
          </div>
          <div
            className="py-2 px-5 text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
          >
            <select
              className="border border-stone-300"
              value={pageSize}
              onChange={e => {
                setPageSize(Number(e.target.value))
              }}
            >
              {[10, 15, 20, 25, 30].map(pageSize => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </select>
          </div>
          <button
            className="py-2 px-5 text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
            onClick={() => nextPage()}
            disabled={!canNextPage}
          >
            {'>'}
          </button>
          <button
            className="py-2 px-5 text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
          >
            Last
          </button>
        </div>
      </nav>
    </>
  )
}

export default GenesTable
