import Plotly from "plotly.js"
import React from "react"
import Plot from "react-plotly.js"

import Radio from "../atomic/inputs/Radio"

const ExpressionBoxplot = ({ hideLoader, sampleAnnotations }) => {
  const downloadIcon = {
    width: 500,
    height: 600,
    path: 'M64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V160H256c-17.7 0-32-14.3-32-32V0H64zM256 0V128H384L256 0zM216 232V334.1l31-31c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-72 72c-9.4 9.4-24.6 9.4-33.9 0l-72-72c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l31 31V232c0-13.3 10.7-24 24-24s24 10.7 24 24z',
  }

  const [ boxpoints, setBoxpoints ] = React.useState("all")  // "all" or "suspectedoutliers"
  const [ constrainYRange, setConstrainYRange ] = React.useState(false)
  const highestTopWhisker = Math.max(...sampleAnnotations.map(sa => sa.topWhisker))

  return (
    <div className="relative my-4">
      <Plot
        data={
          sampleAnnotations.map(sa => ({
            type: "box",
            y: sa.tpms,
            boxpoints: boxpoints,  // FROM STATE
            jitter: 0.5,
            name: sa.name,
            ids: sa.name,  // string[] for constancy of data points during animation
            showlegend: false,
            hoverinfo: "y",  // default: "all", but we hide the name here, bcos too repetitive
            // hovertemplate: "",  // Refer to D3 formatting syntax if we need this in future
            // yhoverformat: "",
            fillcolor: "green",
            opacity: 0.5,
            marker: {
              color: "rgb(84, 84, 84)",
              outliercolor: "rgba(172, 33, 33, 1)",
              opacity: 0.4,
              size: 4,
              line: {
              //   color: "rgb(220, 34, 164)",
                outliercolor: "rgba(220, 34, 164, 1)",
              }
            },
            line: {
              // color: "green",
              // color: "rgb(132, 168, 142)",
              color: "rgb(144, 142, 142)",
            },
          }))
        }
        layout={{
          xaxis: { automargin: true, tickangle: -90 },
          yaxis: {
            title: "TPM",
            range: constrainYRange ? [ 0, highestTopWhisker + 1 ] : undefined,  // FROM STATE
          },
          height: 600,
          // autosize: true,
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
                Plotly.downloadImage(gd, {format: 'svg', width: 800, height: 600, filename: 'barchart'})
              },
            },
            {
              title: "Download as png",
              name: "Download as png",
              icon: downloadIcon,
              click: (gd) => {
                Plotly.downloadImage(gd, {format: 'png', width: 800, height: 600, filename: 'barchart'})
              },
            },
          ],
          modeBarButtonsToRemove: ["select2d", "lasso2d", "zoomIn2d", "zoomOut2d", "autoScale2d", "toImage"],
        }}
        style={{
          position: "relative",
          width: "100%",
        }}
        onInitialized={hideLoader}
        // useResizeHandler={true}
      />
      <div className="my-3">
        <p className="italic text-stone-500 text-sm">
          Boxplot reflects median TPM of each organ with raw data points as points to the left of each bar.
        </p>
        <div className="mt-4 mb-8">
          <Radio
            groupName="boxplot-points-option"
            radioOptions={[
              { id: "all-points", label: "All datapoints" },
              { id: "only-outliers", label: "Only outliers" },
              { id: "crop-out-outliers", label: "All datapoints (axis scaled)" },
            ]}
            selected="all-points"
            handleChange={(id) => {
              switch (id) {
                case "all-points":
                  setBoxpoints("all")
                  setConstrainYRange(false)
                  break
                  case "only-outliers":
                    setBoxpoints("suspectedoutliers")
                    setConstrainYRange(false)
                    break
                  case "crop-out-outliers":
                    setBoxpoints("all")
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

export default ExpressionBoxplot
