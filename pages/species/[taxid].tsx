import { NextPage } from "next";
import { useRouter } from "next/router";

import Layout from "../../components/layout";
import Species from "../../models/species";
import connectMongo from "../../utils/connectMongo";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  await connectMongo()
  const this_species = await Species.findOne({"tax": params.taxid})
  // const genes = await Species.find({"label"})

  // TODO: How to fetch genes chunk by chunk

  return {
    props: {
      species: JSON.parse(JSON.stringify(this_species)),
      genes: [],
    },
  }
}

const SpeciesPage: NextPage = ({ species, genes }) => {
  const router = useRouter()
  const { taxid } = router.query

  console.log(species.name)
  return (
    <Layout>
      <h1 className="text-4xl italic py-3">{species.name}</h1>
      <p>Tax ID {taxid}</p>

      <div>
        Render table of genes, searchable, paginated, lazy loaded
      </div>
    </Layout>
  )
}

export default SpeciesPage
