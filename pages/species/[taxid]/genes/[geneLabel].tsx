import React from "react"
import { useRouter } from "next/router"
import Head from "next/head"
import { NextPage } from "next"
import { GetServerSideProps } from "next"

import Layout from "../../../../components/Layout"
import connectMongo from "../../../../utils/connectMongo"
import { getSampleAnnotations } from "../../../../utils/sampleAnnotations"

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

      <section>
        <h1 className="text-4xl py-3">Gene {geneLabel}</h1>
        <p>{}</p>
      </section>
      {/*{sampleAnnotations.map((sa) => (
        <div>{JSON.stringify(sa, null, 2)}</div>
      ))}*/}
    </Layout>
  )
}

export default GenePage
