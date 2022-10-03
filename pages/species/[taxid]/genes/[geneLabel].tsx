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
import { getOneGene } from "../../../../utils/genes"
import MapmanTable from "../../../../components/tables/MapmanTable"
import InterproTable from "../../../../components/tables/InterproTable"
import TextLink from "../../../../components/atomic/TextLink"

const ExpressionPlot = dynamic(
  () => import("../../../../components/graphs/expression"),
  {ssr: false},
)

export const getServerSideProps: GetServerSideProps = async ({ params, query }) => {
  connectMongo()
  const sampleAnnotations = await getSampleAnnotations(params.taxid, params.geneLabel)
  let highestSpm = null
  if (sampleAnnotations.length > 0) {
    highestSpm = sampleAnnotations.reduce(
      (prev, curr) => prev.spm > curr.spm ? prev : curr
    )
    highestSpm.labelName = poNameMap[highestSpm.label]
  }

  const species = await getOneSpecies(params.taxid)
  const gene = await getOneGene(species._id, params.geneLabel)
  const mapmanGas = gene.gene_annotations.filter(ga => ga.type === "MAPMAN")
  const interproGas = gene.gene_annotations.filter(ga => ga.type === "INTERPRO")

  return {
    props: {
      species: JSON.parse(JSON.stringify(species)),
      gene: JSON.parse(JSON.stringify(gene)),
      mapmanGas: JSON.parse(JSON.stringify(mapmanGas)),
      interproGas: JSON.parse(JSON.stringify(interproGas)),
      highestSpm: JSON.parse(JSON.stringify(highestSpm)),
    }
  }
}

const GenePage: NextPage = ({species, gene, highestSpm, mapmanGas, interproGas}) => {
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
        {highestSpm && (
          <React.Fragment>
            <p>Organ with highest SPM: {highestSpm.labelName} ({highestSpm.label})</p>
            <p>Highest SPM value: {highestSpm.spm}</p>
          </React.Fragment>
        )}

        {/* For debugging purposes */}
        {/* {JSON.stringify(mapmanGas)}
        {JSON.stringify(interproGas)} */}

        <div className="flex italic text-sm gap-2 my-3">
          <TextLink href="#mapman-annotations">
            Mapman annotations
          </TextLink>
          <TextLink href="#interpro-annotations">
            PFAM annotations
          </TextLink>
          <TextLink href="#coexpression-table">
            Coexpressed genes
          </TextLink>
        </div>

      </section>

      <section className="my-4" id="expression-graph">
        <h3 className="text-2xl py-3">Gene expression profile by organs</h3>
        {!highestSpm && (
          <p>No annotated samples yet 😢</p>
        )}
        {loader}
        {/* TODO:
          Hide expression plot if no samples
          Prevent auto rehydrating of graph data
        */}
        <ExpressionPlot taxid={taxid} geneLabel={geneLabel} hideLoader={hideLoader} />
      </section>

      <section className="my-4" id="mapman-annotations">
        <h3 className="text-2xl py-3">Mapman annotations</h3>
        <MapmanTable geneAnnotations={mapmanGas} />
      </section>

      <section className="my-4" id="interpro-annotations">
        <h3 className="text-2xl py-3">PFAM annotations</h3>
        <InterproTable geneAnnotations={interproGas} />
      </section>

      <section className="my-4" id="coexpression-table">
        <h3 className="text-2xl py-3">Top co-expressed genes</h3>
        <p>
          🚧👷🏻 Coming soon ...
        </p>
      </section>
    </Layout>
  )
}

export default GenePage
