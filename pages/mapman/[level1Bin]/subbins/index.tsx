import React from "react"
import Head from "next/head"
import { GetServerSideProps, NextPage } from "next"
import { useRouter } from "next/router"

import Layout from "../../../../components/Layout"
import Header1 from "../../../../components/atomic/texts/Header1"
import { getMapmanLevel1Bins } from "../../../../utils/geneAnnotations"
import TextLink from "../../../../components/atomic/TextLink"
import MapmanSubbinIndexTable from "../../../../components/tables/MapmanSubbinIndexTable"

export const getServerSideProps: GetServerSideProps = async ({ params, query }) => {
  const level1Bins = await getMapmanLevel1Bins()
  const level1BinsNameMap = level1Bins.reduce((collector, curr) => {
    collector[curr.bincode] = curr.binname
    return collector
  }, {})

  // const geneAnnotation = await getOneGeneAnnotation({ type: "MAPMAN", label: params.label })

  return {
    props: {
      level1BinsNameMap: JSON.parse(JSON.stringify(level1BinsNameMap)),
      // geneAnnotation: JSON.parse(JSON.stringify(geneAnnotation))
    }
  }
}

interface IProps {
  geneAnnotation: object
}

const MapmanSubbinIndexPage: NextPage<IProps> = ({ level1BinsNameMap }) => {
  const router = useRouter()
  const level1Bin = router.query.level1Bin


  return (
    <Layout>
      <Head>
        <title>{`Mapman Bin ${level1Bin}`}</title>
      </Head>

      <Header1>{level1BinsNameMap[level1Bin]}</Header1>
      <p>Mapman Bin {level1Bin}</p>
      <div className="my-2 italic">
        <TextLink href="/mapman">
          See all level 1 bins
        </TextLink>
      </div>

      <MapmanSubbinIndexTable data={[]} />
    </Layout>
  )
}

export default MapmanSubbinIndexPage
