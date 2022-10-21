import React from 'react'
import Head from "next/head"
import { GetServerSideProps, NextPage } from 'next'

import Layout from '../../components/Layout'
import Header1 from '../../components/atomic/texts/Header1'
import { getGeneAnnotationsPage, getMapmanLevel1Bins } from '../../utils/geneAnnotations'
import MapmanIndexTable from '../../components/tables/MapmanIndexTable'
import MapmanLevel1IndexTable from '../../components/tables/MapmanLevel1IndexTable'

export const getServerSideProps: GetServerSideProps = async ({ params, query }) => {
  const level1Bins = await getMapmanLevel1Bins()
  const page = await getGeneAnnotationsPage("MAPMAN")

  return {
    props: {
      level1Bins: JSON.parse(JSON.stringify(level1Bins)),

      geneAnnotations: JSON.parse(JSON.stringify(page.geneAnnotations)),
      numGeneAnnotations: JSON.parse(JSON.stringify(page.pageTotal))
    }
  }
}

interface IProps {
  level1Bins: any[]
  geneAnnotations: object[]
  numGeneAnnotations: number
}

const MapmanIndexPage: NextPage<IProps> = ({ level1Bins, geneAnnotations, numGeneAnnotations }) => {
  return (
    <Layout>
      <Head>
        <title>PFAM terms</title>
      </Head>

      <Header1>Mapman terms (level 1)</Header1>
      <MapmanLevel1IndexTable level1Bins={level1Bins} />
    </Layout>
  )
}

export default MapmanIndexPage
