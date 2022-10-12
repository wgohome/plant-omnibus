import React from "react"

import SortableTable from "./generics/SortableTable"
import TextLink from "../atomic/TextLink"

const MapmanTable = ({ geneAnnotations }) => {
  const columns = React.useMemo(
    () => [
      {
        Header: "Bin code",
        accessor: "label",
        Cell: ({ value }) => (
          <TextLink href={`/mapman/${value}`}>
            {value}
          </TextLink>
        ),
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
