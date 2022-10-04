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

interface IProps {
  taxid: number
  geneLabel: string
}

const ExpressionTabs: React.FC<IProps> = ({ taxid, geneLabel }) => {
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
          {showLoader && (
            <p id="graph-loading-placeholder">Loading graph ...</p>
          )}
          {/*
            ExpressionBarplot will only be loaded on client side,
            so the loading placeholder should be outside of that component
          */}
          <ExpressionBarplot taxid={taxid} geneLabel={geneLabel} hideLoader={hideLoader} />
        </TabBodyItem>
        <TabBodyItem key="boxplot" tabIndex={1}>
          This is boxplot
        </TabBodyItem>
      </TabBodyGroup>
    </TabGroup>
  )
}

export default ExpressionTabs
