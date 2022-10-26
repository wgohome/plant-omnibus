import React from "react"

import TextLink from "../atomic/TextLink"
import VirtualPaginatedFilterTable from "./generics/VirtualPaginatedFilterTable"

interface IProps {
  level1Bin: number
  initialGeneAnnotations: object[]
  pageTotal: number
}

const MapmanSubbinIndexTable: React.FC<IProps> = ({ level1Bin, initialGeneAnnotations, pageTotal }) => {
  const [ gaPage, setGaPage ] = React.useState(initialGeneAnnotations)
  const [ pageCount, setPageCount ] = React.useState(pageTotal)
  const [ loading, setLoading ] = React.useState(false)
  const fetchIdRef = React.useRef(0)

  const columns = React.useMemo(() => [
    {
      Header: "Bincode",
      accessor: "label",
      Cell: ({ value }: { value: string }) => (
        <TextLink href={`/mapman/${value}`}>
          {value}
        </TextLink>
      ),
    },
    {
      Header: "Bin name",
      accessor: "name",
    },
    {
      Header: "Description",
      accessor: "details.desc",
    },
  ], [])

  const fetchGaPage = React.useCallback(({ pageSize, pageIndex, queryFilter=null, sortByObject={} }: IPropsFetchData) => {
    const fetchId = ++fetchIdRef.current
    setLoading(true)
    if (fetchId === fetchIdRef.current) {
      let apiUrl = `/api/mapman?pageIndex=${pageIndex}&pageSize=${pageSize}&level1Bin=${level1Bin}`
      if (queryFilter) {
        apiUrl += `&queryFilter=${queryFilter}`
      }
      if (Object.keys(sortByObject).length > 0) {
        apiUrl += `&sortByObject=${JSON.stringify(sortByObject)}`
      }
      fetch(apiUrl)
      .then(res => res.json())
      .then((data) => {
          setGaPage(data.geneAnnotations)
          setPageCount(data.pageTotal)
          setLoading(false)
        })
        .catch(err => console.log(err))
    }
  }, [])

  return (
    <VirtualPaginatedFilterTable
      columns={columns}
      data={gaPage}
      pageCount={pageCount}
      loading={loading}
      fetchData={fetchGaPage}
    />
  )
}

export default MapmanSubbinIndexTable
