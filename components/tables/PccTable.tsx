import React from "react"

import LocalPaginatedTable from "./generics/LocalPaginatedTable"
import TextLink from "../atomic/TextLink"

const PccTable = ({ taxid, data }) => {
  const columns = React.useMemo(
    () => [
      {
        Header: "Gene",
        accessor: "label",
        Cell: ({ value }) => (
          <TextLink href={`/species/${taxid}/genes/${value}`}>
            {value}
          </TextLink>
        ),
      },
      {
        Header: "PCC Value",
        accessor: "pcc",
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

export default PccTable
