import React from 'react'
import Head from "next/head"
import { GetServerSideProps, NextPage } from 'next'

import Layout from '../../components/Layout'
import Header1 from '../../components/atomic/texts/Header1'
import { getGeneAnnotationsPage } from '../../utils/geneAnnotations'
import MapmanIndexTable from '../../components/tables/MapmanIndexTable'

export const getServerSideProps: GetServerSideProps = async () => {
  const page = await getGeneAnnotationsPage("MAPMAN")

  return {
    props: {
      geneAnnotations: JSON.parse(JSON.stringify(page.geneAnnotations)),
      numGeneAnnotations: JSON.parse(JSON.stringify(page.pageTotal))
    }
  }
}

interface IProps {
  geneAnnotations: object[]
  numGeneAnnotations: number
}

const MapmanIndexPage: NextPage<IProps> = ({ geneAnnotations, numGeneAnnotations }) => {
  return (
    <Layout>
      <Head>
        <title>PFAM terms</title>
      </Head>

      <Header1>Mapman terms</Header1>
      <MapmanIndexTable
        initialGeneAnnotations={geneAnnotations}
        pageTotal={numGeneAnnotations}
      />
    </Layout>
  )
}

export default MapmanIndexPage
