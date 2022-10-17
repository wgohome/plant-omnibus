import React from "react"
import { NextPage, GetServerSideProps } from "next"
import { useRouter } from "next/router"
import Head from "next/head"

import Layout from "../../../../components/Layout"
import TextLink from "../../../../components/atomic/TextLink"
import MapmanTable from "../../../../components/tables/MapmanTable"
import InterproTable from "../../../../components/tables/InterproTable"
import ExpressionTabs from "../../../../components/graphs/ExpressionTabs"

import connectMongo from "../../../../utils/connectMongo"
import { getHighestSpmSA, getSampleAnnotations } from "../../../../utils/sampleAnnotations"
import { getOneSpecies } from "../../../../utils/species"
import { getOneGene } from "../../../../utils/genes"

export const getServerSideProps: GetServerSideProps = async ({ params, query }) => {
  connectMongo()
  const sampleAnnotations = await getSampleAnnotations(params.taxid, params.geneLabel)
  const highestSpmSa = await getHighestSpmSA(params.taxid, params.geneLabel)

  const species = await getOneSpecies(params.taxid)
  const gene = await getOneGene(species._id, params.geneLabel)
  const mapmanGas = gene.gene_annotations.filter(ga => ga.type === "MAPMAN")
  const interproGas = gene.gene_annotations.filter(ga => ga.type === "INTERPRO")

  return {
    props: {
      sampleAnnotations: JSON.parse(JSON.stringify(sampleAnnotations)),
      species: JSON.parse(JSON.stringify(species)),
      gene: JSON.parse(JSON.stringify(gene)),
      mapmanGas: JSON.parse(JSON.stringify(mapmanGas)),
      interproGas: JSON.parse(JSON.stringify(interproGas)),
      highestSpmSa: JSON.parse(JSON.stringify(highestSpmSa)),
    }
  }
}

const GenePage: NextPage = ({species, gene, highestSpmSa, mapmanGas, interproGas, sampleAnnotations}) => {
  const router = useRouter()
  const { taxid, geneLabel } = router.query

  return (
    <Layout>
      <Head>
        <title>Gene {geneLabel}</title>
      </Head>

      <section className="my-4">
        <h1 className="text-4xl py-4">Gene {geneLabel}</h1>
        <p>Species name: <span className="italic">{species.name}</span></p>
        <p>Taxanomic ID: {taxid}</p>
        {highestSpmSa && (
          <React.Fragment>
            <p>Organ with highest SPM: {highestSpmSa.labelName} ({highestSpmSa.label})</p>
            <p>Highest SPM value: {highestSpmSa.spm}</p>
          </React.Fragment>
        )}

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
        {!highestSpmSa && (
          <p>No annotated samples yet 😢</p>
        )}
        <ExpressionTabs taxid={taxid} geneLabel={geneLabel} sampleAnnotations={sampleAnnotations} />
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
