import React from "react"

import TextLink from "../atomic/TextLink"
import LocalPaginatedTable from "./generics/LocalPaginatedTable"
import ShowMoreList from "../atomic/texts/ShowMoreList"

interface IProps {
}

const MapmanSubbinIndexTable: React.FC<IProps> = ({ data }) => {
  const columns = React.useMemo(
    () => [
      {
        Header: "Species",
        accessor: "species.name",
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
          <ShowMoreList
            items={value.map((gene, i) => (
              <TextLink href={`/species/${row.values.tax}/genes/${gene.label}`} key={i}>
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
      hiddenColumns={["tax"]}
    />
  )
}

export default MapmanSubbinIndexTable
