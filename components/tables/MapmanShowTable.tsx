import React from "react"

import LocalPaginatedTable from "./generics/LocalPaginatedTable"
import TextLink from "../atomic/TextLink"

const MapmanShowTable = ({ data }) => {
  const columns = React.useMemo(
    () => [
      {
        Header: "Species",
        accessor: "species.name", // TODO
        Cell: ({ value, row }) => (
          <TextLink href={`/species/${row.values.tax}`}>
            {value}
          </TextLink>
        ),
      },
      {
        Header: "Tax ID",
        accessor: "tax",
      }, // To hide, but needed to access the value for species url
      {
        Header: "Genes",
        accessor: "genes",
        Cell: ({ value, row }) => (
          value.map((gene, i) => (
            <span className="" key={i}>
              <TextLink href={`/species/${row.values.tax}/genes/${gene.label}`}>
                {gene.label}
              </TextLink>
              {",  "}
            </span>
          ))
        ),
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

export default MapmanShowTable
