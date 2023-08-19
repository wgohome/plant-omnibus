import Head from "next/head"
import Layout from "../../components/Layout"
import Header1 from "../../components/atomic/texts/Header1"
import { NextPage } from "next/types"
import dynamic from "next/dynamic"
import { useState } from "react"
import Loader from "../../components/atomic/Loader"

// import ExpressionHeatmap from "../../components/graphs/ExpressionHeatmap"
const ExpressionHeatmap = dynamic(
  () => import("../../components/graphs/ExpressionHeatmap"),
  {ssr: false},
);

const HeatmapPage: NextPage = () => {

  const [ loading, setLoading ] = useState(true)

  const hideLoader = () => {
    setLoading(false)
  }

  return (
    <Layout>
      <Head>Heatmap</Head>

      <Header1>Heatmap</Header1>
      {loading && (
        <Loader comment="Drawing the heatmap" />
      )}
      <ExpressionHeatmap hideLoader={hideLoader} />


    </Layout>
  )
}

export default HeatmapPage
