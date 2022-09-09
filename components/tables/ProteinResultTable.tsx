import React from "react"
import Link from "next/link"
import { useTable, useSortBy } from "react-table"

const ProteinResultTable = ({ columns, data }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
    },
    useSortBy,
  )

  return (
    <>
      <h3 className="text-3xl py-3">Sequence hits</h3>
      <div className="overflow-x-auto border border-stone-300 rounded-xl shadow-lg my-3">
        <table {...getTableProps()}>
          <thead className="border-b">
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
                {headerGroup.headers.map(column => (
                  // Add the sorting props to control sorting. For this case
                  // we can add them into the header props
                  // eslint-disable-next-line react/jsx-key
                  <th
                    className="text-gray-900 font-medium text-left min-w-[120px] px-6 py-4"
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
            {rows.map(
              (row, i) => {
                prepareRow(row);
                return (
                  // eslint-disable-next-line react/jsx-key
                  <tr
                    className="bg-white border-b last:border-0"
                    {...row.getRowProps()}
                  >
                    {row.cells.map(cell => {
                      return (
                        // eslint-disable-next-line react/jsx-key
                        <td
                          className={`
                            text-gray-900 text-sm font-light px-6 py-4
                            ${cell.column.id === "cds.url" ? "break-all" : ""}
                          `}
                          {...cell.getCellProps()}
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
    </>
  )
}

export default ProteinResultTable
