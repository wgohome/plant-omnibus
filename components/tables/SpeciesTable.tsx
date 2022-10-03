import React from "react"
import Link from "next/link"
import { useTable, usePagination, useAsyncDebounce, useGlobalFilter } from "react-table"

const GlobalFilterBox = ({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) => {
  const count = preGlobalFilteredRows.length
  const [value, setValue] = React.useState(globalFilter)
  const handleChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined)
  }, 200)

  return (
    <span className="">
      {/* Search: */}
      <input
        className="outline-none p-4 w-full rounded-xl shadow border border-stone-300 focus:ring ring-plb-green ring-offset-1 focus:border-green-plb"
        value={value || ""}
        onChange={(e) => {
          setValue(e.target.value)
          handleChange(e.target.value)
        }}
        placeholder="Search for your XXX ..."
        type="search"
      />
    </span>
  )
}

const Table = ({ columns, data }) => {
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
    state: { pageIndex, pageSize, globalFilter },
    preGlobalFilteredRows,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 10 },
    },
    useGlobalFilter,
    usePagination,
  )

  return (
    <>
      <GlobalFilterBox
        preGlobalFilteredRows={preGlobalFilteredRows}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
      />
      <div className="overflow-x-auto border border-stone-300 rounded-xl shadow-lg my-3">
        <table className="w-full" {...getTableProps()}>
          <thead className="border-b">
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
                {headerGroup.headers.map((column) => (
                  // eslint-disable-next-line react/jsx-key
                  <th
                    scope="col"
                    // key={`${headerGroup.id} ${column.id}`}
                    className="text-gray-900 font-medium text-left min-w-[120px] px-6 py-4"
                    {...column.getHeaderProps()}
                  >
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {page.map((row) => {
              prepareRow(row);
              return (
                // eslint-disable-next-line react/jsx-key
                <tr
                  className="bg-white border-b last:border-0"
                  {...row.getRowProps()}
                  // key={row.id}
                >
                  {row.cells.map((cell) => (
                    // eslint-disable-next-line react/jsx-key
                    <td
                      className={`
                      text-gray-900 text-sm font-light px-6 py-4
                      ${cell.column.id === "cds.url" ? "break-all" : ""}
                      `}
                      {...cell.getCellProps()}
                      // key={cell.id}
                    >
                      {cell.render("Cell")}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination bar */}
      <nav className="flex justify-center">
        <ul className="inline-flex drop-shadow-md my-4">
          <li
            className="py-2 px-3 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
            onClick={() => gotoPage(0)}
            disabled={!canPreviousPage}
          >
            <a href="#" className="">First</a>
          </li>
          <li
            className="py-2 px-5 text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
          >
            <a href="#" className="">{"<"}</a>
          </li>
          <li
            className="py-2 px-5 text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
            onClick={() => nextPage()}
            disabled={!canNextPage}
          >
            <a href="#" className="">{">"}</a>
          </li>
          <li
            className="py-2 px-3 text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
          >
            <a href="#" className="">Last</a>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Table
