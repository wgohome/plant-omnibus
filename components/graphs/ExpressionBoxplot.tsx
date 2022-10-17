import Plotly from "plotly.js"
import React from "react"
import Plot from "react-plotly.js"

const ExpressionBoxplot = ({ hideLoader, sampleAnnotations }) => {
  const downloadIcon = {
    width: 500,
    height: 600,
    path: 'M64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V160H256c-17.7 0-32-14.3-32-32V0H64zM256 0V128H384L256 0zM216 232V334.1l31-31c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-72 72c-9.4 9.4-24.6 9.4-33.9 0l-72-72c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l31 31V232c0-13.3 10.7-24 24-24s24 10.7 24 24z',
  }

  return (
    <div className="relative my-4">
      <Plot
        data={
          sampleAnnotations.map(sa => ({
            type: "box",
            y: sa.tpms,
            boxpoints: "all",
            name: sa.name,
            showlegend: false,
            opacity: 0.8,
            fillcolor: "rgb(94, 126, 103)",
            marker: {
              color: "rgb(84, 84, 84)",
              opacity: 0.4,
              size: 3,
              // line: {
              //   color: "rgb(220, 34, 164)",
              // }
            },
            line: {
              color: "rgb(132, 168, 142)"
            },
          }))
        }
        layout={{
          xaxis: {automargin: true, tickangle: -90},
          yaxis: {title: "TPM"},
          height: 600,
          autosize: true,
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
        useResizeHandler={true}
      />
      <div className="my-3">
        <p className="italic text-stone-500 text-sm">
          Boxplot reflects median TPM of each organ with raw data points as points to the left of each bar.
        </p>
      </div>
    </div>
  )
}

export default ExpressionBoxplot
