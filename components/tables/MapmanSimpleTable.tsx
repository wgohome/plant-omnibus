import React from "react"

import LocalSimpleTable from "./generics/LocalSimpleTable"
import TextLink from "../atomic/TextLink"

const MapmanSimpleTable = ({ geneAnnotations }) => {
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
    <LocalSimpleTable columns={columns} data={geneAnnotations} />
  )
}

export default MapmanSimpleTable
