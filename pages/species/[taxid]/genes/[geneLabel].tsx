import React from "react"
import { useRouter } from "next/router"
import Head from "next/head"
import { NextPage } from "next"
import { GetServerSideProps } from "next"
import GeneBoxplot from "../../../../components/graphs/boxplots.js";
import { fetchTableInfo, fetchPlotData, imageOptions, groupColors } from "../../../../utils/genePageFunctions.js";

import Layout from "../../../../components/Layout"
import connectMongo from "../../../../utils/connectMongo"
import { getSampleAnnotations } from "../../../../utils/sampleAnnotations"

import $ from "jquery";
import 'datatables.net-dt';

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
  let payload = [];

  $(document).ready(function() {
    $('#mapmanAnnot').DataTable()
    $('#mapmanTerm').DataTable()
    $('#geneFamily').DataTable()
    $('#goTable').DataTable()
    $('#proteinDomain').DataTable()
  })

  return (
    <Layout>
      <Head>
        <title>Gene {geneLabel}</title>
      </Head>

      <section className = "divide-y divide-black-900 space-y-5">
        <h1 className="text-4xl py-3">Gene {geneLabel}</h1>
        <div className = "inline-grid grid-cols-2 gap-10 pt-7 py-5">
          <ul className = 'space-y-4'>
            <li className = 'font-semibold'> Description: </li>
            <li className = 'font-semibold'> Organism: </li>
            <li className = 'font-semibold'> Related gene(s): </li>
            <li className = 'font-semibold'> Source(s) of information: </li>
          </ul>
          <ul className = 'space-y-4'>
            <li className = 'font-normal'> Some descriptor </li>
            <li className = 'font-normal'> Some organism </li>
            <li className = 'font-normal'> Some gene(s) </li>
            <li className = 'font-normal'> Some information source(s) </li>
          </ul>
        </div>

        {sampleAnnotations.forEach(sa => payload.push(sa))}
        <div>
          <GeneBoxplot data = {fetchPlotData(payload, 'boxplot')}
          geneID = { geneLabel } />
        </div>

        {/* JSON.stringify(sa, null, 2) */}

        {/* Show PO terms */}
        <div>
          <h2 className = "font-bold text-3xl text-gray-500 py-3"> PO Terms </h2>
          <table className="min-w-full text-center" id = "proteinDomain">
            <thead className="border-b bg-[#dee2e6]">
              <tr>
                <th scope="col" className="text-sm font-semibold text-gray-900 px-6 py-4">
                  Domain
                </th>
                <th scope="col" className="text-sm font-semibold text-gray-900 px-6 py-4">
                  Description
                </th>
                <th scope="col" className="text-sm font-semibold text-gray-900 px-6 py-4">
                  Start
                </th>
                <th scope="col" className="text-sm font-semibold text-gray-900 px-6 py-4">
                  Stop
                </th>
              </tr>
            </thead>
            <tbody>
              {fetchTableInfo(payload, 'po').map(gene => {
                return (
                  <tr className= "border-b bg-[#e9ecef]">
                    <td className="text-sm text-gray-900 font-normal px-6 py-4 whitespace-nowrap hover:text-gray-500 duration-200">
                      {gene.domain}
                    </td>
                    <td className="text-sm text-gray-900 font-normal px-6 py-4 whitespace-nowrap">
                      {gene.desc}
                    </td>
                    <td className="text-sm text-gray-900 font-normal px-6 py-4 whitespace-nowrap">
                      {gene.start}
                    </td>
                    <td className="text-sm text-gray-900 font-normal px-6 py-4 whitespace-nowrap">
                      {gene.stop}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* Show GO Terms*/}
        <div>
          <h2 className = "font-bold text-3xl text-gray-500 py-3"> GO Terms </h2>
          <table className="min-w-full text-center" id = "goTable">
            <thead className="border-b bg-[#dee2e6]">
              <tr>
                <th scope="col" className="text-sm font-semibold text-gray-900 px-6 py-4">
                  Type
                </th>
                <th scope="col" className="text-sm font-semibold text-gray-900 px-6 py-4">
                  GO
                </th>
                <th scope="col" className="text-sm font-semibold text-gray-900 px-6 py-4">
                  Name
                </th>
              </tr>
            </thead>
            <tbody>
              {fetchTableInfo(payload, 'go').map(gene => {
                return (
                  <tr className= "border-b bg-[#e9ecef]">
                    <td className="text-sm text-gray-900 font-normal px-6 py-4 whitespace-nowrap hover:text-gray-500 duration-200">
                      {gene.type}
                    </td>
                    <td className="text-sm text-gray-900 font-normal px-6 py-4 whitespace-nowrap">
                      {gene.go}
                    </td>
                    <td className="text-sm text-gray-900 font-normal px-6 py-4 whitespace-nowrap">
                      {gene.name}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* Show the gene families */}
        <div>
          <h2 className = "font-bold text-3xl text-gray-500 py-3"> Gene Families </h2>
          <table className="min-w-full text-center" id = "geneFamily">
            <thead className="border-b bg-[#dee2e6]">
              <tr>
                <th scope="col" className="text-sm font-semibold text-gray-900 px-6 py-4">
                  Family
                </th>
                <th scope="col" className="text-sm font-semibold text-gray-900 px-6 py-4">
                  Desc
              </th>
              </tr>
            </thead>
            <tbody>
              {fetchTableInfo(payload, 'gene family').map(gene => {
                return (
                  <tr className= "border-b bg-[#e9ecef]">
                    <td className="text-sm text-gray-900 font-normal px-6 py-4 whitespace-nowrap hover:text-gray-500 duration-200">
                      {gene.family}
                    </td>
                    <td className="text-sm text-gray-900 font-normal px-6 py-4 whitespace-nowrap">
                      {gene.desc}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* Mapman gene annotations */}
        <div>
          <h2 className = "font-bold text-3xl text-gray-500 py-3"> Mapman Gene Annotations </h2>
          <table className="min-w-full text-center" id = "mapmanAnnot">
            <thead className="border-b bg-[#dee2e6]">
              <tr>
                <th scope="col" className="text-sm font-semibold text-gray-900 px-6 py-4">
                  Type
                </th>
                <th scope="col" className="text-sm font-semibold text-gray-900 px-6 py-4">
                  GO
                </th>
                <th scope="col" className="text-sm font-semibold text-gray-900 px-6 py-4">
                  Evidence
                </th>
              </tr>
            </thead>
            <tbody>
              {fetchTableInfo(payload, 'mapman gene annotations').map(gene => {
                return (
                  <tr className= "border-b bg-[#e9ecef]">
                    <td className="text-sm text-gray-900 font-normal px-6 py-4 whitespace-nowrap hover:text-gray-500 duration-200">
                      {gene.type}
                    </td>
                    <td className="text-sm text-gray-900 font-normal px-6 py-4 whitespace-nowrap">
                      {gene.go}
                    </td>
                    <td className="text-sm text-gray-900 font-normal px-6 py-4 whitespace-nowrap">
                      {gene.evidence}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* Mapman Terms */}
        <div>
          <h2 className = "font-bold text-3xl text-gray-500 py-3"> Mapman Terms </h2>
          <table className="min-w-full text-center" id = "mapmanTerm">
            <thead className="border-b bg-[#dee2e6]">
              <tr>
                <th scope="col" className="text-sm font-semibold text-gray-900 px-6 py-4">
                  Term
                </th>
                <th scope="col" className="text-sm font-semibold text-gray-900 px-6 py-4">
                  Description
                </th>
              </tr>
            </thead>
            <tbody>
              {fetchTableInfo(payload, 'mapman terms').map(gene => {
                return (
                  <tr className= "border-b bg-[#e9ecef]">
                    <td className="text-sm text-gray-900 font-normal px-6 py-4 whitespace-nowrap hover:text-gray-500 duration-200">
                      {gene.term}
                    </td>
                    <td className="text-sm text-gray-900 font-normal px-6 py-4 whitespace-nowrap">
                      {gene.description}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          </div>
          <div>
          <h2 className = "font-bold text-3xl text-gray-500 py-4"> More options </h2>
          <button className = 'px-4 py-2 bg-white rounded-full border-stone-800 bg-gray-200 duration-200 hover:bg-[#C2D1C2]'>
            View similar genes!
          </button>
        </div>
      </section>
    </Layout>
  )
}

export default GenePage
