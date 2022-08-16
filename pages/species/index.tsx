import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import { ObjectId } from 'bson'

import Layout from '../../components/Layout'
import Species from '../../models/species'
import connectMongo from '../../utils/connectMongo'
import Table from '../../components/tables/SpeciesTable'
import React from 'react'
import Link from 'next/link'

export const getServerSideProps: GetServerSideProps = async () => {
  await connectMongo()
  const species = await Species.find({})
  return { props: { species: JSON.parse(JSON.stringify(species)) } }
}

const SpeciesIndexPage: NextPage = ({ species }) => {
  const columns = React.useMemo(
    () => [
      {
        Header: "Tax ID",
        accessor: "tax",
        Cell: ({ value }) => {
          return (
            <Link href={`/species/${value}`}>
              <a className="hover:underline text-plb-green active:text-plb-red">{value}</a>
            </Link>
          )
        },
      },
      {
        Header: "Scientific name",
        accessor: "name",
      },
      {
        Header: "Alias",
        accessor: "alias",
      },
      {
        Header: "Source",
        accessor: "cds.source",
      },
      {
        Header: "Source url",
        accessor: "cds.url",
      },
    ], []
  )

  return (
    <Layout>
      <Head>
        <title>All species</title>
      </Head>

      <section>
        <h1 className="text-4xl font-medium my-3 mb-8">Species</h1>
        <Table columns={columns} data={species} />
      </section>
    </Layout>
  )
}

export default SpeciesIndexPage
