import React from "react"
import { NextPage, GetServerSideProps } from "next"
import { useRouter } from "next/router"
import Head from "next/head"
import dynamic from "next/dynamic"

import Layout from "../../../../components/Layout"
import connectMongo from "../../../../utils/connectMongo"
import { getSampleAnnotations } from "../../../../utils/sampleAnnotations"
import { getOneSpecies } from "../../../../utils/species"
// import ExpressionPlot from "../../../../components/graphs/expression"
import * as poNameMap from '/public/data/po_name_map.json' assert {type: 'json'}

const ExpressionPlot = dynamic(
  () => import("../../../../components/graphs/expression"),
  {ssr: false},
)

export const getServerSideProps: GetServerSideProps = async ({ params, query }) => {
  connectMongo()
  const sampleAnnotations = await getSampleAnnotations(params.taxid, params.geneLabel)
  const highestSpm = sampleAnnotations.reduce(
    (prev, curr) => prev.spm > curr.spm ? prev : curr
  )
  highestSpm.labelName = poNameMap[highestSpm.label]
  const species = await getOneSpecies(params.taxid)
  return {
    props: {
      species: JSON.parse(JSON.stringify(species)),
      highestSpm: JSON.parse(JSON.stringify(highestSpm)),
    }
  }
}

const GenePage: NextPage = ({species, highestSpm}) => {
  const router = useRouter()
  const { taxid, geneLabel } = router.query

  const loader = <p id="graph-loading-placeholder">Loading graph ...</p>

  const hideLoader = () => {
    const placeholder = document.getElementById("graph-loading-placeholder")
    placeholder.hidden = true
  }

  return (
    <Layout>
      <Head>
        <title>Gene {geneLabel}</title>
      </Head>

      <section className="my-4">
        <h1 className="text-4xl py-4">Gene {geneLabel}</h1>
        <p>Species name: <span className="italic">{species.name}</span></p>
        <p>Taxanomic ID: {taxid}</p>
        <p>Organ with highest SPM: {highestSpm.labelName} ({highestSpm.label})</p>
        <p>Highest SPM value: {highestSpm.spm}</p>
      </section>

      <section className="my-4">
        <h3 className="text-2xl py-3">Gene expression profile by organs</h3>
        {loader}
        <ExpressionPlot taxid={taxid} geneLabel={geneLabel} hideLoader={hideLoader} />
      </section>

      <section className="my-4">
        <h3 className="text-2xl py-3">Mapman annotations</h3>
        {/* TODO: make a react table */}
      </section>

      <section className="my-4">
        <h3 className="text-2xl py-3">PFAM annotations</h3>

      </section>

      <section className="my-4">
        <h3 className="text-2xl py-3">Top co-expressed genes</h3>

      </section>
    </Layout>
  )
}

export default GenePage
