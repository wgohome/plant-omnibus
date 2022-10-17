import React from "react"
import Plot from "react-plotly.js"

const ExpressionBoxplot = ({ hideLoader, sampleAnnotations }) => {
  return (
    <div className="relative my-4">
      <Plot
        data={
          sampleAnnotations.map(sa => ({
            type: "box",
            y: sa.tpms,
            boxpoints: "all",
            name: sa.label,
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
          // title: 'Gene expression in organs',
          xaxis: {automargin: true, tickangle: -90},
          yaxis: {title: "TPM", range: [0, 50]},
          height: 600,
          // autosize: true,
        }}
        config={ {responsive: true} }
        // style={ {width: "inherit", height: "inherit"} }
        style={{
          position: "relative",
          // width: "100%",
          // height: "inherit",
        }}
        onInitialized={hideLoader}
        // useResizeHandler={true}
      />
    </div>
  )
}

export default ExpressionBoxplot
