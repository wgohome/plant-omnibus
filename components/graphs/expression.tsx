import React from "react"
import Plot from "react-plotly.js"
import useSWR from "swr"

const fetcher = (...args) => fetch(...args).then((res) => res.json())

const ExpressionPlot = ({}) => {
  // TODO: may want to store Plot attributes as state

  const { data, error } = useSWR(`/api/species/3702/genes/AT1G01540/forBarchart`, fetcher)

  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>

  return (
    <div className="my-4">
      <Plot
        data={[
          {
            type: 'bar',
            // x: sampleAnnotations.map(sa => sa.label),
            // y: sampleAnnotations.map(sa => sa.avg_tpm),
            x: data.xValues,
            y: data.yValues,
            error_y: {
              type: "data",
              visible: true,
              color: "black",
              thickness: 2,
              symmetric: true,
              array: data.stdDevValues,
              // value: 10,
              // valueminus: 12,
              // TODO: Get ranges
            },
            marker: {color: 'green'},  // TODO: map color to groups of organs?
            opacity: 0.4,
          },
        ]}
        layout={{
          // title: 'Gene expression in organs',
          xaxis: {title: "Organs", automargin: true},
          yaxis: {title: "TPM"},
        }}
        config={ {responsive: true} }
        style={ {height: "inherit"} }
      />
    </div>
  )
}

export default ExpressionPlot
