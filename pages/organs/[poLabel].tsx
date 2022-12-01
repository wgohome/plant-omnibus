import Head from "next/head"
import { useRouter } from "next/router"
import React from "react"
import Turnstone from "turnstone"
import Select from 'react-select'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons'

import Header1 from "../../components/atomic/texts/Header1"
import Layout from "../../components/Layout"
import OrganShowTable from "../../components/tables/OrganShowTable"
import OrganShowTableMean from "../../components/tables/OrganShowTableMean"
import { getOrganSpecificSasByMedian, getOrganSpecificSasByMean } from "../../utils/sampleAnnotations"
import { getAllSpecies } from "../../utils/species"
import { TabGroup, TabHeaderGroup, TabHeaderItem, TabBodyGroup, TabBodyItem } from "../../components/atomic/tabs"
import Species from "../../models/species"

import poNameMap from '/public/data/po_name_map.json' assert {type: 'json'}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const poTerm = params.poLabel as string
  const species = await getAllSpecies()

  const specificSas = await getOrganSpecificSasByMedian({
    poLabel: poTerm,
  })

  return {
    props: {
      poName: poNameMap[poTerm],
      species: JSON.parse(JSON.stringify(species)),
      specificSas: JSON.parse(JSON.stringify(specificSas)),
    },
  }
}

interface IProps {
  species: (typeof Species)[]
  poName: string
  specificSas: object[]
}

/*
  How many species is this organ represented in?
  For each species, which genes have the highest SPM?
*/

const OrganShowPage: NextPage<IProps> = ({ poName, species, specificSas }) => {
  const router = useRouter()
  const poLabel = router.query.poLabel as string
  const capsPoName = poName.charAt(0).toUpperCase() + poName.slice(1).toLowerCase()

  const speciesOptions = species.map(sp => ({
    value: sp.tax,
    label: sp.name,
  }))
  const [ selectedSpecies, setSelectedSpecies ] = React.useState(speciesOptions[0])

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

      <div className="my-3">
        <div className="flex items-center mb-2">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
          <label htmlFor="speciesSelect" className="block ml-1.5 text-sm font-medium text-gray-900">Select a species</label>
        </div>
        {/* <p>Selected species taxid: {JSON.stringify(selectedSpecies)}</p> */}
        <Select
          defaultValue={speciesOptions[0]}
          options={speciesOptions}
          noOptionsMessage={() => "No such species"}
          onChange={(choice) => {
            console.log(choice)
            setSelectedSpecies(choice)
          }}
          closeMenuOnScroll={true}
          closeMenuOnSelect={true}
          // unstyled={true}
          // classNames={{
          //   // container: () => "",
          //   container: () => "outline-none w-full rounded-full shadow border border-stone-300 focus:ring focus:ring-1 focus:ring-plb-green focus:border-plb-green",
          //   control: () => "outline-none w-full rounded-full shadow border border-stone-300 focus:ring focus:ring-1 focus:ring-plb-green focus:border-plb-green",
          // }}
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              borderRadius: "9999px",
              padding: "0.375rem",
              outline: "2px solid transparent",
              outlineOffset: "2px",
            }),
          }}
        />
      </div>

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
