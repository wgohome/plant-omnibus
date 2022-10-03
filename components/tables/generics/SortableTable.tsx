import React from "react"
import {
  useTable,
  useSortBy,
} from "react-table"

const SortableTable = ({ columns, data }) => {
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
    <div className="overflow-x-auto border border-stone-300 rounded-xl shadow-lg my-3">
      <table className="w-full" {...getTableProps()}>
        <thead className="border-b">
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
              {headerGroup.headers.map(column => (
                // Add the sorting props to control sorting. For this example
                // we can add them into the header props
                <th
                  className="text-gray-900 font-medium text-left min-w-[120px] px-6 py-4"
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  key={column.id}
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
                <tr
                  className="bg-white border-b last:border-0"
                  {...row.getRowProps()} key={row.id}
                >
                  {row.cells.map(cell => {
                    return (
                      <td
                        className="text-gray-900 text-sm font-light px-6 py-4"
                        {...cell.getCellProps()}
                        key={cell.id}
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
  )
}

export default SortableTable
