import React from "react"
import Head from "next/head"
import { NextPage } from "next"
import { useRouter } from "next/router"

import Layout from "../../components/Layout"
import Header1 from "../../components/atomic/texts/Header1"

export const getServerSideProps: GetServerSideProps = async ({ params, query }) => {
  return {
    props: {

    }
  }
}

interface IProps {

}

const InterproShowPage: NextPage<IProps> = ({  }) => {
  const router = useRouter()
  const label = router.query.label

  return (
    <Layout>
      <Head>
        <title>PFAM {label}</title>
      </Head>

      <Header1>PFAM {label}</Header1>
    </Layout>
  )
}

export default InterproShowPage
