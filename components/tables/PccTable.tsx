import React from "react"

import LocalPaginatedTable from "./generics/LocalPaginatedTable"
import TextLink from "../atomic/TextLink"

const PccTable = ({ taxid, data }) => {
  const columns = React.useMemo(
    () => [
      {
        Header: "Gene",
        accessor: "gene.label",
        Cell: ({ value }) => (
          <TextLink href={`/species/${taxid}/genes/${value}`}>
            {value}
          </TextLink>
        ),
      },
      {
        Header: "Description",
        accessor: "gene.gene_annotations",
        Cell: ({ value }) => (
          value && value.map(ga => (
            <p className="mt-1.5 first:mt-0" key={ga._id}>{ga.name}</p>
          ))
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
