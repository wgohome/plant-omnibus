import React from "react"
import SortableTable from "./generics/SortableTable"

const MapmanTable = ({ geneAnnotations }) => {
  const columns = React.useMemo(
    () => [
      {
        Header: "Bin code",
        accessor: "label",
      },
      {
        Header: "Bin name",
        accessor: "name",
      },
      {
        Header: "Bin description",
        accessor: "details.desc",
      },
    ], []
  )

  return (
    <SortableTable columns={columns} data={geneAnnotations} />
  )
}

export default MapmanTable
