// TODO virtual paginated table, shouldnt be sortable
import React from "react"

import VirtualPaginatedFilterTable from "./generics/VirtualPaginatedFilterTable"
import TextLink from "../atomic/TextLink"
import { IPropsFetchData } from "./generics/VirtualPaginatedFilterTable"

interface IProps {
  poLabel: string
  initialSaPage: object[]
  pageTotal: number
}

const OrganShowTable: React.FC<IProps> = ({ poLabel, initialSaPage, pageTotal }) => {
  // Pagination state management
  const [ saPage, setSaPage ] = React.useState(initialSaPage)
  const [ pageCount, setPageCount ] = React.useState(pageTotal)
  const [ loading, setLoading ] = React.useState(false)
  const fetchIdRef = React.useRef(0)

  // Table columns
  const columns = React.useMemo(() => [
    {
      Header: "Species",
      accessor: "species.tax",
      Cell: ({ value }: { value: number }) => (
        <TextLink href={`/species/${value}`}>
          {value}
        </TextLink>
      ),
      disableSortBy: true,
    },
    {
      Header: "Gene",
      accessor: "gene.label",
      Cell: ({ value, row }: { value: string, row: object }) => (
        <TextLink href={`/species/${row.values["species.tax"]}/genes/${value}`}>
          {value}
        </TextLink>
      ),
      disableSortBy: true,
    },
    {
      Header: "SPM",
      accessor: "spm_med",
    },
    {
      Header: "Median TPM",
      accessor: "med_tpm",
    },
    {
      Header: "Mean TPM",
      accessor: "avg_tpm",
    },
    {
      Header: "Num of samples",
      accessor: "samples",
      Cell: ({ value }: {value: object[]}) => {
        return value.length
      },
    },
    {
      Header: "Mapman Terms",
      accessor: "gene.mapman_annotations",
      Cell: ({ value: gaTerms }: { value: object[] | "-" }) =>
      (
        <ul className="min-w-[400px]">
          {
            (gaTerms.length === 0)
              ? "not assigned.not annotated"
              : gaTerms.map(ga => (
                <p className="mt-1.5 first:mt-0" key={ga._id}>{ga.name}</p>
              ))
          }
        </ul>
      ),
      disableSortBy: true,
    },
  ], [])

  const fetchSaPage = React.useCallback(({ pageSize, pageIndex, queryFilter=null, sortByObject={} }: IPropsFetchData) => {
    const fetchId = ++fetchIdRef.current
    setLoading(true)
    if (fetchId === fetchIdRef.current) {
      let apiUrl = `/api/sampleAnnotations/PO/${poLabel}?pageIndex=${pageIndex}&pageSize=${pageSize}&variant=median`
      if (queryFilter) {
        apiUrl += `&queryFilter=${queryFilter}`
      }
      if (Object.keys(sortByObject).length > 0) {
        apiUrl += `&sortByObject=${JSON.stringify(sortByObject)}`
      }
      fetch(apiUrl)
      .then(res => res.json())
      .then((data) => {
          setSaPage(data.sas)
          setPageCount(data.pageTotal)
          setLoading(false)
        })
        .catch(err => console.log(err))
    }
  }, [])

  return (
    <VirtualPaginatedFilterTable
      columns={columns}
      data={saPage}
      pageCount={pageCount}
      loading={loading}
      fetchData={fetchSaPage}
    />
  )
}

export default OrganShowTable
