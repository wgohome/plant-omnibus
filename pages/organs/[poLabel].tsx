import Head from "next/head"
import { useRouter } from "next/router"
import React from "react"

import Header1 from "../../components/atomic/texts/Header1"
import Layout from "../../components/Layout"

import poNameMap from '/public/data/po_name_map.json' assert {type: 'json'}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const poTerm = params.poLabel as string

  return {
    props: {
      poName: poNameMap[poTerm]
    },
  }
}

interface IProps {
  poName: string
}

/*
  How many species is this organ represented in?
  For each species, which genes have the highest SPM?
*/

const OrganShowPage: NextPage<IProps> = ({ poName }) => {
  const router = useRouter()
  const poLabel = router.query.poLabel as string

  return (
    <Layout>
      <Head>
        <title>{poLabel}</title>
      </Head>

      <Header1>{poName}</Header1>
      <p>{poLabel}</p>
    </Layout>
  )
}

export default OrganShowPage
