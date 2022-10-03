import React from "react"

import TextLink from "../atomic/TextLink"
import SortableTable from "./generics/SortableTable"

const InterproTable = ({ geneAnnotations }) => {
  const columns = React.useMemo(
    () => [
      {
        Header: "PFAM Identifier",
        accessor: "label",
      },
      {
        Header: "PFAM name",
        accessor: "details.desc",
      },
      {
        Header: "GO Terms",
        accessor: "details.go_terms",
        Cell: ({value: goTerms}) => {
          console.log(goTerms)
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
