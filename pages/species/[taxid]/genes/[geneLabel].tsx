import React from "react"
import { NextPage, GetServerSideProps } from "next"
import { useRouter } from "next/router"
import Head from "next/head"
import dynamic from "next/dynamic"

import Layout from "../../../../components/Layout"
import TextLink from "../../../../components/atomic/TextLink"
import MapmanTable from "../../../../components/tables/MapmanTable"
import InterproTable from "../../../../components/tables/InterproTable"
import Header1 from "../../../../components/atomic/texts/Header1"
import Header2 from "../../../../components/atomic/texts/Header2"
import Header3 from "../../../../components/atomic/texts/Header3"

const ExpressionTabs = dynamic(() => import("../../../../components/graphs/ExpressionTabs"), {ssr: false})

import connectMongo from "../../../../utils/connectMongo"
import {
  getHighestSpmSA,
  findTopSpmSA,
  getSampleAnnotationsGraphData,
} from "../../../../utils/sampleAnnotations"
import { getOneSpecies } from "../../../../utils/species"
import { getOneGene } from "../../../../utils/genes"
import { capitalizeFirstLetter } from "../../../../utils/strings"
import TopSpmOrgansSection from "../../../../components/cards/TopSpmOrgansSection"

export const getServerSideProps: GetServerSideProps = async ({ params, query }) => {
  connectMongo()
  const species = await getOneSpecies(params.taxid)
  const gene = await getOneGene(species._id, params.geneLabel)
  const mapmanGas = gene.gene_annotations.filter(ga => ga.type === "MAPMAN")
  const interproGas = gene.gene_annotations.filter(ga => ga.type === "INTERPRO")
  const sampleAnnotations = await getSampleAnnotationsGraphData(params.taxid, params.geneLabel, "PO")
  const topSpmSas = findTopSpmSA(sampleAnnotations)

  return {
    props: {
      species: JSON.parse(JSON.stringify(species)),
      gene: JSON.parse(JSON.stringify(gene)),
      mapmanGas: JSON.parse(JSON.stringify(mapmanGas)),
      interproGas: JSON.parse(JSON.stringify(interproGas)),
      sampleAnnotations: JSON.parse(JSON.stringify(sampleAnnotations)),
      topSpmSas: JSON.parse(JSON.stringify(topSpmSas)),
    }
  }
}

const GenePage: NextPage = ({species, gene, mapmanGas, interproGas, sampleAnnotations, topSpmSas }) => {
  const router = useRouter()
  const { taxid, geneLabel } = router.query

  return (
    <Layout>
      <Head>
        <title>Gene {geneLabel}</title>
      </Head>

      <section className="mt-4 mb-4">
        <Header1>Gene {geneLabel}</Header1>
        <p>Species name: <span className="italic">{species.name}</span></p>
        <p>Taxanomic ID: {taxid}</p>
        <div className="flex italic text-sm gap-2 my-3">
          <TextLink href="#top-spm">
            Organ specificity
          </TextLink>|
          <TextLink href="#expression-graph">
            Expression graph
          </TextLink>|
          <TextLink href="#mapman-annotations">
            Mapman annotations
          </TextLink>|
          <TextLink href="#interpro-annotations">
            PFAM annotations
          </TextLink>|
          <TextLink href="#coexpression-table">
            Co-expressed genes
          </TextLink>
        </div>
      </section>

      <section className="mt-10 mb-4" id="top-spm">
        <Header2>Organ specificity</Header2>
        {!sampleAnnotations.length ? (
          <p>No annotated samples yet 😢</p>
        ) : (
          <p>For gene {geneLabel}, we found these organs to have the highest SPM values. Do explore and inspect the data distribution plot to make your inference.</p>
        )}
        <TopSpmOrgansSection topSpmSas={topSpmSas} />
      </section>

      <section className="mt-10 mb-4" id="expression-graph">
        <Header2>Gene expression profile by organs</Header2>
        {!sampleAnnotations.length ? (
          <p>No annotated samples yet 😢</p>
        ) : (
          <ExpressionTabs sampleAnnotations={sampleAnnotations} />
        )}
      </section>

      <section className="mt-10 mb-4" id="mapman-annotations">
        <Header2>Mapman annotations</Header2>
        <MapmanTable geneAnnotations={mapmanGas} />
      </section>

      <section className="mt-10 mb-4" id="interpro-annotations">
        <Header2>PFAM annotations</Header2>
        <InterproTable geneAnnotations={interproGas} />
      </section>

      <section className="mt-10 mb-4" id="coexpression-table">
        <Header2>Top co-expressed genes</Header2>
        <p>
          🚧👷🏻 Coming soon ...
        </p>
      </section>
    </Layout>
  )
}

export default GenePage
