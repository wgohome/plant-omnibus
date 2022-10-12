import React from "react"

import SortableTable from "./generics/SortableTable"
import TextLink from "../atomic/TextLink"

const InterproTable = ({ geneAnnotations }) => {
  const columns = React.useMemo(
    () => [
      {
        Header: "PFAM Identifier",
        accessor: "label",
        Cell: ({ value }) => (
          <TextLink href={`/interpro/${value}`}>
            {value}
          </TextLink>
        ),
      },
      {
        Header: "PFAM name",
        accessor: "name",
      },
      {
        Header: "GO Terms",
        accessor: "details.go_terms",
        Cell: ({value: goTerms}) => {
          return goTerms.map((goTerm, i) => (
            <TextLink href="#" key={i}>
              {goTerm}{"  "}
            </TextLink>
          ))
        },
      },
    ], []
  )

  return (
    <SortableTable columns={columns} data={geneAnnotations} />
  )
}

export default InterproTable
