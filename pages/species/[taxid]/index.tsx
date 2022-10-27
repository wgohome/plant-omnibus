import React from "react";
import Head from "next/head"
import { NextPage } from "next"
import { useRouter } from "next/router"

import Layout from "../../../components/Layout"
import GenesTable from "../../../components/tables/GenesTable"
import Header1 from "../../../components/atomic/texts/Header1"
import connectMongo from "../../../utils/connectMongo"
import Species from "../../../models/species"
import { getGenesPage } from "../../../utils/genes"

export const getServerSideProps: GetServerSideProps = async ({ params, query }) => {
  connectMongo()
  const this_species = await Species.findOne({"tax": params.taxid})
  const pageIndex = query.pageIndex ? Math.max(parseInt(query.pageIndex), 0) : 0
  const genePage = await getGenesPage({
    taxid: params.taxid,
    pageIndex,
  })
  return {
    props: {
      species: JSON.parse(JSON.stringify(this_species)),
      initialGenes: JSON.parse(JSON.stringify(genePage.genes)),
      pageTotal: genePage.pageTotal,
      numGenes: genePage.numGenes,
    },
  }
}

interface IProps {
  species: Species
  numGenes: number
  initialGenes: object[]
  pageTotal: number
}

const SpeciesPage: NextPage<IProps> = ({ species, numGenes, initialGenes, pageTotal }) => {
  const router = useRouter()
  const taxid = parseInt(router.query.taxid as string)

  return (
    <Layout>
      <Head>
        <title>{species.name}</title>
      </Head>

      <section>
        <Header1 className="italic">
          {species.name}
        </Header1>
        <div className="mb-4">
          <p>Taxanomic ID: {taxid}</p>
          <p>Alias: {species.alias.length ? species.alias.join(", ") : "-"}</p>
          <p>Number of genes: {numGenes}</p>
        </div>
      </section>

      <section>
        <GenesTable taxid={taxid} initialGenes={initialGenes} pageTotal={pageTotal} />
      </section>
    </Layout>
  )
}

export default SpeciesPage
