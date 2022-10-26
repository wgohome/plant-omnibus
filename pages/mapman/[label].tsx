import React from "react"
import Head from "next/head"
import { NextPage } from "next"
import { useRouter } from "next/router"

import { getOneGeneAnnotation } from "../../utils/geneAnnotations"

import Layout from "../../components/Layout"
import Header1 from "../../components/atomic/texts/Header1"
import MapmanShowTable from "../../components/tables/MapmanShowTable"

export const getServerSideProps: GetServerSideProps = async ({ params, query }) => {
  const geneAnnotation = await getOneGeneAnnotation({ type: "MAPMAN", label: params.label })

  return {
    props: {
      geneAnnotation: JSON.parse(JSON.stringify(geneAnnotation))
    }
  }
}

interface IProps {
  geneAnnotation: object
}

const MapmanShowPage: NextPage<IProps> = ({ geneAnnotation }) => {
  const router = useRouter()
  const label = router.query.label

  return (
    <Layout>
      <Head>
        <title>Mapman Bin {label}</title>
      </Head>

      <Header1>Mapman Bin {label}</Header1>
      <p><b>Bin name:</b> {geneAnnotation.name}</p>
      <p><b>Description:</b> {geneAnnotation.details.desc}</p>
      <MapmanShowTable data={geneAnnotation.gene_annotation_buckets} />
    </Layout>
  )
}

export default MapmanShowPage
