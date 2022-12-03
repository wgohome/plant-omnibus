import React from "react"

import LocalPaginatedTable from "./generics/LocalPaginatedTable"
import TextLink from "../atomic/TextLink"
import ShowMoreList from "../atomic/texts/ShowMoreList"

const MapmanShowTable = ({ data }) => {
  const columns = React.useMemo(
    () => [
      {
        Header: "Species",
        accessor: "species.name",
        Cell: ({ value, row }) => (
          <TextLink href={`/species/${row.original.species.tax}`}>
            {value}
          </TextLink>
        ),
      },
      {
        Header: "Genes",
        accessor: "genes",
        Cell: ({ value, row }) => (
          <ShowMoreList
            items={value.map((gene, i) => (
              <TextLink href={`/species/${row.original.species.tax}/genes/${gene.label}`} key={i}>
                {gene.label}
              </TextLink>
            ))}
          />
        ),
      },
    ], []
  )

  return (
    <LocalPaginatedTable
      columns={columns}
      data={data}
      hiddenColumns={[]}
    />
  )
}

export default MapmanShowTable
