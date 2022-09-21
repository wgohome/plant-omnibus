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
            // x: data.xValues,
            x: data.organNames,
            y: data.yValues,
            error_y: {
              type: "data",
              visible: true,
              color: "black",
              thickness: 2,
              symmetric: true,
              array: data.stdDevValues,
            },
            marker: {color: 'green'},  // TODO: map color to groups of organs?
            opacity: 0.4,
          },
        ]}
        layout={{
          // title: 'Gene expression in organs',
          xaxis: {automargin: true, tickangle: -90},
          yaxis: {title: "TPM"},
          height: 600,
        }}
        config={ {responsive: true} }
        style={ {width: "inherit", height: "inherit"} }
      />
    </div>
  )
}

export default ExpressionPlot
