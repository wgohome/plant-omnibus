import React from "react"

import VirtualPaginatedTable from "./generics/VirtualPaginatedTable"
import TextLink from "../atomic/TextLink"

interface IProps {
  taxid: number
  initalGenes: object[]
  pageTotal: number
}

const GenesTable: React.FC<IProps> = ({ taxid, initialGenes, pageTotal }) => {
  // Pagination state management
  const [ genesPage, setGenesPage ] = React.useState(initialGenes)
  const [ pageCount, setPageCount ] = React.useState(pageTotal)
  const [ loading, setLoading ] = React.useState(false)
  const fetchIdRef = React.useRef(0)

  // Table columns
  const columns = React.useMemo(() => [
    {
      Header: "Gene ID",
      accessor: "label",
      Cell: ({ value }: { value: string }) => (
        <TextLink href={`/species/${taxid}/genes/${value}`}>
          {value}
        </TextLink>
      ),
    },
    /* No Alias stored in DB yet for now, so leaving it out first */
    // {
    //   Header: "Alias",
    //   accessor: "alias",
    // },
    {
      Header: "Mapman annotations",
      accessor: "gene_annotations",
      Cell: ({ value: geneAnnotations }: { value: object[] }) => (
        <ul className="">
          {
            /* If not gene annotation in the DB, just rended MAPMAN bin 35.2 */
            (geneAnnotations.filter(ga => ga.type == "MAPMAN").length === 0) ? (
              <li className="mb-2 last:mb-0">
                not assigned.not annotated
              </li>
            ) :
            geneAnnotations.filter(ga => ga.type == "MAPMAN").map(ga => (
              <li className="mb-2 last:mb-0" key={ga.label}>
                {ga.name}
              </li>
            ))
          }
        </ul>
      )
    },
  ], [taxid])

  const fetchGenePage = React.useCallback(({ pageSize, pageIndex }: { pageSize: number; pageIndex: number }) => {
    const fetchId = ++fetchIdRef.current
    setLoading(true)
    if (fetchId === fetchIdRef.current) {
      fetch(`/api/species/${taxid}/genes?pageIndex=${pageIndex}&pageSize=${pageSize}`)
      .then(res => res.json())
      .then((data) => {
          setGenesPage(data.genes)
          setPageCount(data.pageTotal)
          setLoading(false)
        })
        .catch(err => console.log(err))
    }
  }, [taxid])

  return (
    <VirtualPaginatedTable
      columns={columns}
      data={genesPage}
      pageCount={pageCount}
      loading={loading}
      fetchData={fetchGenePage}
    />
  )
}

export default GenesTable
