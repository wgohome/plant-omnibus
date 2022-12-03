import React from "react"
import Plotly from "plotly.js"
import Plot from "react-plotly.js"

import Radio from "../atomic/inputs/Radio"
import { GeneShowContext } from "../../pages/species/[taxid]/genes/[geneLabel]"

const ExpressionBarplot = ({ sampleAnnotations, hideLoader }) => {
  const { geneLabel } = React.useContext(GeneShowContext)

  const organNames = sampleAnnotations.map(sa => sa.name)
  const avgTpms = sampleAnnotations.map(sa => sa.avg_tpm)
  const stdDevs = sampleAnnotations.map(sa => sa.sd)

  const downloadIcon = {
    width: 500,
    height: 600,
    path: 'M64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V160H256c-17.7 0-32-14.3-32-32V0H64zM256 0V128H384L256 0zM216 232V334.1l31-31c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-72 72c-9.4 9.4-24.6 9.4-33.9 0l-72-72c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l31 31V232c0-13.3 10.7-24 24-24s24 10.7 24 24z',
  }

  const [ constrainYRange, setConstrainYRange ] = React.useState(false)
  const highestAvgTpm = Math.max(...sampleAnnotations.map(sa => sa.avg_tpm))

  return (
    <div className="my-4">
      <Plot
        className="overflow-hidden border border-stone-300 rounded-2xl shadow-lg min-h-[600px]"
        data={[
          {
            type: 'bar',
            x: organNames,
            y: avgTpms,
            error_y: {
              type: "data",
              visible: true,
              color: "rgba(84, 84, 84, 0.6)",
              thickness: 1.5,
              symmetric: true,
              array: stdDevs,
            },
            marker: {
              color: "rgb(170, 227, 159)",
            },
          },
        ]}
        layout={{
          xaxis: { automargin: true, tickangle: -90 },
          yaxis: {
            title: "TPM",
            rangemode: "nonnegative",
            range: constrainYRange ? [ 0, highestAvgTpm * 1.01 ] : undefined,  // FROM STATE
          },
          height: 600,
          modebar: { orientation: "v" },
        }}
        config={{
          responsive: true,
          displaylogo: false,
          displayModeBar: true,
          modeBarButtonsToAdd: [
            {
              title: "Download as svg",
              name: "Download as svg",
              icon: downloadIcon,
              click: (gd) => {
                Plotly.downloadImage(gd, {format: 'svg', width: 800, height: 600, scale: 4, filename: `barchart_${geneLabel}`})
              },
            },
            {
              title: "Download as png",
              name: "Download as png",
              icon: downloadIcon,
              click: (gd) => {
                Plotly.downloadImage(gd, {format: 'png', width: 800, height: 600, scale: 4, filename: `barchart_${geneLabel}`})
              },
            },
          ],
          modeBarButtonsToRemove: ["select2d", "lasso2d", "zoomIn2d", "zoomOut2d", "autoScale2d", "toImage"],
        }}
        style={{
          // position: "relative",
          // width: "100%",
        }}
        onInitialized={hideLoader}
        // useResizeHandler={true}
      />
      <div className="my-3">
        <p className="italic text-stone-500 text-sm">
          Bar chart reflects mean TPM of each organ with error bars reflecting standard deviation.
        </p>
        <div className="mt-4 mb-8">
          <Radio
            groupName="barplot-options"
            radioOptions={[
              { id: "barplot-full", label: "Full TPM-range" },
              { id: "barplot-scale-down", label: "Scaled TPM-range" },
            ]}
            selected="barplot-full"
            handleChange={(id) => {
              switch (id) {
                case "barplot-full":
                  setConstrainYRange(false)
                  break
                case "barplot-scale-down":
                  setConstrainYRange(true)
                  break
                default:
                  break
              }
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default ExpressionBarplot
