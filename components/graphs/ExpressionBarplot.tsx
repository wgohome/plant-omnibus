import React from "react"
import Plotly from "plotly.js"
import Plot from "react-plotly.js"
import Radio from "../atomic/inputs/Radio"

const ExpressionBarplot = ({ sampleAnnotations, hideLoader }) => {
  const organNames = sampleAnnotations.map(sa => sa.name)
  const avgTpms = sampleAnnotations.map(sa => sa.avg_tpm)
  const stdDevs = sampleAnnotations.map(sa => sa.sd)

  const downloadIcon = {
    width: 500,
    height: 600,
    path: 'M64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V160H256c-17.7 0-32-14.3-32-32V0H64zM256 0V128H384L256 0zM216 232V334.1l31-31c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-72 72c-9.4 9.4-24.6 9.4-33.9 0l-72-72c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l31 31V232c0-13.3 10.7-24 24-24s24 10.7 24 24z',
  }

  const [ constrainYRange, setConstrainYRange ] = React.useState(false)
  const highestTopWhisker = Math.max(...sampleAnnotations.map(sa => sa.topWhisker))

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
          xaxis: { automargin: true, tickangle: -90 },
          yaxis: {
            title: "TPM",
            rangemode: "nonnegative",
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
          Bar chart reflects mean TPM of each organ with error bars reflecting standard deviation.
        </p>
        <div className="mt-4 mb-8">
          <Radio
            groupName="barplot-points-option"
            radioOptions={[
              { id: "full-range", label: "Full range" },
              { id: "crop-out-outliers", label: "Scale without outliers" },
            ]}
            selected="full-range"
            handleChange={(id) => {
              switch (id) {
                case "full-range":
                  setConstrainYRange(false)
                  break
                case "crop-out-outliers":
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
