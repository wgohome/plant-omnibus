import React from "react"
import Plot from "react-plotly.js"

const ExpressionBarplot = ({ sampleAnnotations, hideLoader }) => {
  const organNames = sampleAnnotations.map(sa => sa.name)
  const avgTpms = sampleAnnotations.map(sa => sa.avg_tpm)
  const stdDevs = sampleAnnotations.map(sa => sa.sd)

  return (
    <div className="my-4">
      <Plot
        data={[
          {
            type: 'bar',
            x: organNames,  // Use organ names instead of PO terms
            y: avgTpms,
            error_y: {
              type: "data",
              visible: true,
              // color: "black",
              thickness: 2,
              symmetric: true,
              array: stdDevs,
            },
            marker: {color: 'green'},  // TODO: map color to groups of organs?
            opacity: 0.4,
          },
        ]}
        layout={{
          // title: 'Gene expression in organs',
          xaxis: {automargin: true, tickangle: -90},
          yaxis: {title: "TPM", rangemode: "nonnegative"},
          height: 600,
        }}
        config={ {responsive: true} }
        style={{
          position: "relative",
        }}
        // style={ {width: "inherit", height: "inherit"} }
        onInitialized={hideLoader}
      />
    </div>
  )
}

export default ExpressionBarplot
