import React from "react"

import LocalPaginatedTable from "./generics/LocalPaginatedTable"
import TextLink from "../atomic/TextLink"

const PoIndexTable = ({ data }) => {
  const columns = React.useMemo(
    () => [
      {
        Header: "PO Term",
        accessor: "poTerm",
        Cell: ({ value }) => (
          <TextLink href={`/organs/${value}`}>
            {value}
          </TextLink>
        ),
      },
      {
        Header: "PO Name",
        accessor: "poName",
      },
    ], []
  )

  return (
    <LocalPaginatedTable
      columns={columns}
      data={data}
      hiddenColumns={["tax"]}
    />
  )
}

export default PoIndexTable
