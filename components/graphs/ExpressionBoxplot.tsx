import Plotly from "plotly.js"
import React from "react"
import Plot from "react-plotly.js"

import Toggle from "../atomic/inputs/Toggle"
import { GeneShowContext } from "../../pages/species/[taxid]/genes/[geneLabel]"

const ExpressionBoxplot = ({ hideLoader, sampleAnnotations }) => {
  const { geneLabel } = React.useContext(GeneShowContext)

  const downloadIcon = {
    width: 500,
    height: 600,
    path: 'M64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V160H256c-17.7 0-32-14.3-32-32V0H64zM256 0V128H384L256 0zM216 232V334.1l31-31c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-72 72c-9.4 9.4-24.6 9.4-33.9 0l-72-72c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l31 31V232c0-13.3 10.7-24 24-24s24 10.7 24 24z',
  }

  const [ boxpoints, setBoxpoints ] = React.useState(true)
  const [ constrainYRange, setConstrainYRange ] = React.useState(false)
  const [ scrollZoomable, setScrollZoomable ] = React.useState(false)

  const highestTopWhisker = Math.max(...sampleAnnotations.map(sa => sa.topWhisker))

  const handleScrollZoomableToggle = () => {
    setScrollZoomable(!scrollZoomable)
  }

  const handleYRangeConstrain = () => {
    setConstrainYRange(!constrainYRange)
  }

  const handleBoxpointsChange = () => {
    setBoxpoints(!boxpoints)
  }

  return (
    <div className="my-4">
      <Plot
        className="overflow-hidden border border-stone-300 rounded-2xl shadow-lg min-h-[600px]"
        data={
          sampleAnnotations.map(sa => ({
            type: "box",
            quartilemethod: "exclusive",
            y: sa.tpms,
            // boxpoints as "all" or "suspectedoutliers" or "outliers"
            boxpoints: boxpoints ? "all" : "outliers",
            jitter: 0.5,
            name: sa.name,
            ids: sa.name,  // string[] for constancy of data points during animation
            showlegend: false,
            // hoverinfo: "y",  // default: "all", but we hide the name here, bcos too repetitive
            text: sa.sampleLabels,
            hovertemplate: "<b>%{text}</b>: %{y}<extra></extra>",
            // yhoverformat: "",
            fillcolor: "rgb(170, 227, 159)",
            marker: {
              color: "rgba(84, 84, 84, 1)",
              opacity: 0.4,
              size: 4,
              line: { width: 0 }
            },
            line: {
              color: "rgba(84, 84, 84, 0.6)",
            },
          }))
        }
        layout={{
          xaxis: { automargin: true, tickangle: -90 },
          yaxis: {
            title: "TPM",
            range: constrainYRange ? [ 0, highestTopWhisker * 1.01] : undefined,  // FROM STATE
          },
          height: 600,
          modebar: { orientation: "v" },
          dragmode: "pan",
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
                Plotly.downloadImage(gd, {format: 'svg', width: 800, height: 600, scale: 4, filename: `boxplot_${geneLabel}`})
              },
            },
            {
              title: "Download as png",
              name: "Download as png",
              icon: downloadIcon,
              click: (gd) => {
                Plotly.downloadImage(gd, {format: 'png', width: 800, height: 600, scale: 4, filename: `boxplot_${geneLabel}`})
              },
            },
          ],
          modeBarButtonsToRemove: ["select2d", "lasso2d", "zoomIn2d", "zoomOut2d", "autoScale2d", "toImage"],
          scrollZoom: scrollZoomable,
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
          Boxplot reflects median TPM of each organ with raw data points as points to the left of each bar.
        </p>
        <Toggle currState={boxpoints} handleChange={handleBoxpointsChange} prompt="Show raw data points" />
        <Toggle currState={constrainYRange} handleChange={handleYRangeConstrain} prompt="Zoom Y-axis to exclude outliers" />
        <Toggle currState={scrollZoomable} handleChange={handleScrollZoomableToggle} prompt="Allow zoom on scroll" />
      </div>
    </div>
  )
}

export default ExpressionBoxplot
