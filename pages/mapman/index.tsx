import React from 'react'
import Head from "next/head"
import { GetServerSideProps, NextPage } from 'next'

import { getGeneAnnotationsPage, getMapmanLevel1Bins } from '../../utils/geneAnnotations'

import Layout from '../../components/Layout'
import Header1 from '../../components/atomic/texts/Header1'
import MapmanIndexTable from '../../components/tables/MapmanIndexTable'
import MapmanLevel1IndexTable from '../../components/tables/MapmanLevel1IndexTable'
import { TabBodyGroup, TabBodyItem, TabGroup, TabHeaderGroup, TabHeaderItem } from '../../components/atomic/tabs'

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

      <Header1>Mapman bins</Header1>

      <TabGroup>
        <TabHeaderGroup>
          <TabHeaderItem key="cards-level1" tabIndex={0}>
            Level 1 bins (grid)
          </TabHeaderItem>
          <TabHeaderItem key="table-level1" tabIndex={1}>
            Level 1 bins (table)
          </TabHeaderItem>
          <TabHeaderItem key="table-all" tabIndex={2}>
            All Mapman bins
          </TabHeaderItem>
        </TabHeaderGroup>
        <TabBodyGroup>
          <TabBodyItem key="cards-level1" tabIndex={0}>
            Cards index
          </TabBodyItem>
          <TabBodyItem key="table-level1" tabIndex={1}>
            <MapmanLevel1IndexTable level1Bins={level1Bins} />
          </TabBodyItem>
          <TabBodyItem key="table-all" tabIndex={2}>
            <MapmanIndexTable
              initialGeneAnnotations={geneAnnotations}
              pageTotal={numGeneAnnotations}
            />
          </TabBodyItem>
        </TabBodyGroup>
      </TabGroup>

    </Layout>
  )
}

export default MapmanIndexPage
