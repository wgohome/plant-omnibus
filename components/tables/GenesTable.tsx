import React from "react"

import VirtualPaginatedTable from "./generics/VirtualPaginatedTable"
import TextLink from "../atomic/TextLink"

interface IProps {
  taxid: number
}

const GenesTable: React.FC<IProps> = ({ taxid }) => {
  // Pagination state management
  const [ genesPage, setGenesPage ] = React.useState([])
  const [ pageCount, setPageCount ] = React.useState(0)
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
    {
      Header: "Alias",
      accessor: "alias",
    },
    {
      Header: "Annotations",
      accessor: "ga_ids",
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
