import React from "react"
import { NextPage, GetServerSideProps } from "next"
import { useRouter } from "next/router"
import Head from "next/head"
import dynamic from "next/dynamic"

import Layout from "../../../../components/Layout"
import connectMongo from "../../../../utils/connectMongo"
import { getSampleAnnotations } from "../../../../utils/sampleAnnotations"
// import ExpressionPlot from "../../../../components/graphs/expression"

const ExpressionPlot = dynamic(
  () => import("../../../../components/graphs/expression"),
  {ssr: false},
)

export const getServerSideProps: GetServerSideProps = async ({ params, query }) => {
  connectMongo()
  const sas = await getSampleAnnotations(params.taxid, params.geneLabel)
  return {
    props: {
      sampleAnnotations: JSON.parse(JSON.stringify(sas)),
    }
  }
}

const GenePage: NextPage = ({sampleAnnotations}) => {
  const router = useRouter()
  const { taxid, geneLabel } = router.query

  return (
    <Layout>
      <Head>
        <title>Gene {geneLabel}</title>
      </Head>

      <section className="my-4">
        <h1 className="text-4xl py-4">Gene {geneLabel}</h1>
        <p>Taxanomic ID: {taxid}</p>
        <p>Organ with highest SPM: {}(SPM = )</p>
      </section>

      <section className="my-4">
        <h3 className="text-2xl py-3">Gene expression profile by organs</h3>
        <ExpressionPlot />
      </section>
    </Layout>
  )
}

export default GenePage
