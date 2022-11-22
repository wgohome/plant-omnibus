import Head from "next/head"
import { useRouter } from "next/router"
import React from "react"

import Header1 from "../../components/atomic/texts/Header1"
import Layout from "../../components/Layout"
import OrganShowTable from "../../components/tables/OrganShowTable"
import OrganShowTableMean from "../../components/tables/OrganShowTableMean"
import { getOrganSpecificSasByMedian, getOrganSpecificSasByMean } from "../../utils/sampleAnnotations"
import { TabGroup, TabHeaderGroup, TabHeaderItem, TabBodyGroup, TabBodyItem } from "../../components/atomic/tabs"

import poNameMap from '/public/data/po_name_map.json' assert {type: 'json'}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const poTerm = params.poLabel as string
  const specificSas = await getOrganSpecificSasByMedian({
    poLabel: poTerm,
  })

  return {
    props: {
      poName: poNameMap[poTerm],
      specificSas: JSON.parse(JSON.stringify(specificSas)),
    },
  }
}

interface IProps {
  poName: string
  specificSas: object[]
}

/*
  How many species is this organ represented in?
  For each species, which genes have the highest SPM?
*/

const OrganShowPage: NextPage<IProps> = ({ poName, specificSas }) => {
  const router = useRouter()
  const poLabel = router.query.poLabel as string
  const capsPoName = poName.charAt(0).toUpperCase() + poName.slice(1).toLowerCase()

  return (
    <Layout>
      <Head>
        <title>{poLabel}</title>
      </Head>

      <section className="mb-4">
        <Header1>{capsPoName}</Header1>
        <p className="mb-1">{poLabel}</p>{/* TODO: explainer on plant ontology terms */}
        <p className="mb-1">Explore genes that are expressed specifically in the {poName}.</p>
        <p className="text-stone-500 text-sm italic">Context-specific expression is quantified with the SPM measure. The SPM is conventionally calculated by considering the mean TPM of each organ. However, this is prone to distortion due to extreme outliers. We provide the results from SPM using both mean and median here.</p>
      </section>

      <TabGroup>
        <TabHeaderGroup>
          <TabHeaderItem key="spm-mean" tabIndex={0}>
            SPM (through mean TPM)
          </TabHeaderItem>
          <TabHeaderItem key="spm-median" tabIndex={1}>
            SPM (through median TPM)
          </TabHeaderItem>
        </TabHeaderGroup>
        <TabBodyGroup>
          <TabBodyItem key="spm-mean" tabIndex={0}>
            <OrganShowTableMean
              poLabel={poLabel}
              initialSaPage={specificSas.sas}
              pageTotal={specificSas.pageTotal}
            />
          </TabBodyItem>
          <TabBodyItem key="spm-median" tabIndex={1}>
            <OrganShowTable
              poLabel={poLabel}
              initialSaPage={specificSas.sas}
              pageTotal={specificSas.pageTotal}
            />
          </TabBodyItem>
        </TabBodyGroup>
      </TabGroup>

      {/* {JSON.stringify(specificSas)} */}
    </Layout>
  )
}

export default OrganShowPage
