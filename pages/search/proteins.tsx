import React from 'react'
import Head from 'next/head'
import type { NextPage } from 'next'

import Layout from '../../components/Layout'
import ProteinSearchBox from '../../components/search/ProteinSearchBox'
import ProteinResultTable from '../../components/search/ProteinResultTable'

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

  const resultFields = {
    "target": "Gene identifier",
    "p_identity": "% identity",
    "e_value": "E-value",
    "bit_score": "Bit score",
    "algn_length": "Alignment length",
    "mismatches": "Mismatches",
    "gap_openings": "Gap openings",
  }

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
            : <ProteinResultTable results={results} resultFields={resultFields} />
          : null
        }
      </section>
    </Layout>
  )
}

export default ProteinSearchPage
