import React from "react";
import Head from "next/head";
import Link from "next/link";
import { NextPage } from "next";
import { useRouter } from "next/router";

import Layout from "../../../components/Layout";
import GenesTable from "../../../components/tables/GenesTable";
import Species from "../../../models/species";
import { getGenesPage } from "../../../utils/genes";
import connectMongo from "../../../utils/connectMongo";

export const getServerSideProps: GetServerSideProps = async ({ params, query }) => {
  connectMongo()
  const this_species = await Species.findOne({"tax": params.taxid})
  const pageIndex = query.pageIndex ? Math.max(parseInt(query.pageIndex), 0) : 0
  const genePage = await getGenesPage(params.taxid, pageIndex)
  return {
    props: {
      species: JSON.parse(JSON.stringify(this_species)),
      initialGenes: JSON.parse(JSON.stringify(genePage.genes)),
      numGenes: parseInt(genePage.numGenes),
    },
  }
}

const SpeciesPage: NextPage = ({ species, initialGenes, numGenes }) => {
  const router = useRouter()
  const { taxid } = router.query

  // Pagination state management
  const [ pageCount, setPageCount ] = React.useState(0)
  const [ loading, setLoading ] = React.useState(false)
  // Table body data
  const [ genes, setGenes ] = React.useState(initialGenes)
  const fetchIdRef = React.useRef(0)

  // Table columns
  const columns = React.useMemo(() => [
    {
      Header: "Gene ID",
      accessor: "label",
      Cell: ({ value }) => (
        <Link href={`/species/${taxid}/genes/${value}`}>
          <a className="text-plb-green hover:underline active:text-plb-red">{value}</a>
        </Link>
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
  ], [])

  const fetchGenes = React.useCallback(({ pageSize, pageIndex }: { pageSize: number, pageIndex: number }) => {
    // This will get called when the table needs new data
    // Give this fetch an ID
    const fetchId = ++fetchIdRef.current
    setLoading(true)
    // Only update the data if this is the latest fetch
    if (fetchId === fetchIdRef.current) {
      fetch(`/api/species/${taxid}/genes?pageIndex=${pageIndex}&pageSize=${pageSize}`)
        .then(res => res.json())
        .then((data) => {
          setGenes(data.genes)
          setPageCount(data.pageTotal)
          setLoading(false)
        })
        .catch(err => console.log(err))
    }
  }, [taxid, setGenes, setPageCount, setLoading])

  return (
    <Layout>
      <Head>
        <title>{species.name}</title>
      </Head>

      <section>
        <h1 className="text-4xl italic py-3">{species.name}</h1>
        <p>Taxanomic ID: {taxid}</p>
        <p>Alias: {species.alias.length ? species.alias.join(", ") : "-"}</p>
        <p>Number of genes: {numGenes}</p>
      </section>

      <section>
        <GenesTable columns={columns} data={genes} fetchGenes={fetchGenes} loading={loading} pageCount={pageCount} />
      </section>
    </Layout>
  )
}

export default SpeciesPage
