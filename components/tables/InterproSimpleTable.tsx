import React from "react"

import LocalSimpleTable from "./generics/LocalSimpleTable"
import TextLink from "../atomic/TextLink"

const InterproSimpleTable = ({ geneAnnotations }) => {
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
        Cell: ({value: goTerms}) => goTerms.join(", "),
      },
    ], []
  )

  return (
    <LocalSimpleTable columns={columns} data={geneAnnotations} />
  )
}

export default InterproSimpleTable
