import dynamic from "next/dynamic"
import React from "react"

import {
  TabGroup,
  TabHeaderGroup,
  TabHeaderItem,
  TabBodyGroup,
  TabBodyItem
} from "../atomic/tabs/index"

const ExpressionBarplot = dynamic(
  () => import("./ExpressionBarplot"),
  {ssr: false},
)
const ExpressionBoxplot = dynamic(
  () => import("./ExpressionBoxplot"),
  {ssr: false},
)

interface IProps {
  taxid: number
  geneLabel: string
  sampleAnnotations: object
}

const ExpressionTabs: React.FC<IProps> = ({ taxid, geneLabel, sampleAnnotations }) => {
  const [ showLoader, setShowLoader ] = React.useState(true)

  const hideLoader = () => {
    setShowLoader(false)
  }

  return (
    <TabGroup>
      <TabHeaderGroup>
        <TabHeaderItem key="barchart" tabIndex={0}>
          Barchart
        </TabHeaderItem>
        <TabHeaderItem key="boxplot" tabIndex={1}>
          Boxplot
        </TabHeaderItem>
      </TabHeaderGroup>
      <TabBodyGroup>
        <TabBodyItem key="barchart" tabIndex={0}>
          {
            /*
              ExpressionBarplot will only be loaded on client side,
              so the loading placeholder should be outside of that component
            */
            showLoader && (
              <p id="graph-loading-placeholder">Loading graph ...</p>
            )
          }
          <ExpressionBarplot taxid={taxid} geneLabel={geneLabel} hideLoader={hideLoader} />
        </TabBodyItem>
        <TabBodyItem key="boxplot" tabIndex={1}>
          {/* <ExpressionBoxplot taxid={taxid} geneLabel={geneLabel} hideLoader={hideLoader} /> */}
          {showLoader && (
            <p id="graph-loading-placeholder">Loading graph ...</p>
          )}
          <ExpressionBoxplot taxid={taxid} geneLabel={geneLabel} hideLoader={hideLoader} sampleAnnotations={sampleAnnotations} />
        </TabBodyItem>
      </TabBodyGroup>
    </TabGroup>
  )
}

export default ExpressionTabs
