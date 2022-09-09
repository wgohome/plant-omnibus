import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import type { NextPage } from 'next'

import Layout from '../../components/Layout'
import ProteinSearchBox from '../../components/search/ProteinSearchBox'
import ProteinResultTable from '../../components/tables/ProteinResultTable'

export async function getServerSideProps(context) {
  return {
    props: {
      DIAMOND_URL: process.env.DIAMOND_URL
    },
  }
}

const ProteinSearchPage: NextPage = ({ DIAMOND_URL }) => {
  const [ results, setResults ] = React.useState([])
  const [ queryStatus, setQueryStatus ] = React.useState(null)

  const submitSearchQuery = (query: string) => {
    setQueryStatus("searching")
    fetch(
      `${DIAMOND_URL}/queries/proteins/wait`, {
        method: "POST",
        body: JSON.stringify({
          protein_seq: query,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
      )
      .then(res=>res.json())
      .then(data=>{
        setResults(data.result || [])
        setQueryStatus(data.status)
      })
      .catch(err=>console.log(err))
  }

  const columns = React.useMemo(
    () => [
      {
        Header: "Gene identifier",
        accessor: "target",
        Cell: ({ value }) => (
          <Link href={`/species//genes/${value}`}>
            <a className="hover:underline text-plb-green active:text-plb-red">{value}</a>
          </Link>
        ),
      },
      {
        Header: "Taxanomic ID",
        accessor: "taxid",
        Cell: ({ value }) => (
          <Link href={`/species/${value}`}>
            <a className="hover:underline text-plb-green active:text-plb-red">{value}</a>
          </Link>
        ),
      },
      {
        Header: "% identity",
        accessor: "p_identity",
      },
      {
        Header: "E-value",
        accessor: "e_value",
      },
      {
        Header: "Bit score",
        accessor: "bit_score",
      },
      {
        Header: "Alignment length",
        accessor: "algn_length",
      },
      {
        Header: "Mismatches",
        accessor: "mismatches",
      },
      {
        Header: "Gap openings",
        accessor: "gap_openings",
      },
    ], []
  )

  return (
    <Layout>
      <Head>
        <title>Protein sequence search</title>
      </Head>

      <h1 className="text-4xl py-3">Protein sequence search</h1>

      <section className="my-4" id="search-box">
        <ProteinSearchBox submitSearchQuery={submitSearchQuery} />
      </section>

      <section>
        {queryStatus
          ? (queryStatus === "searching")
            ? "Searching up your protein sequence ..."
            : <ProteinResultTable columns={columns} data={results} />
          : null
        }
      </section>
    </Layout>
  )
}

export default ProteinSearchPage
