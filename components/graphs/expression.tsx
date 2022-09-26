import React from "react"
import Plot from "react-plotly.js"
import useSWR from "swr"

const fetcher = (...args) => fetch(...args).then((res) => res.json())

const ExpressionPlot = ({taxid, geneLabel, hideLoader}) => {
  // TODO: may want to store Plot attributes as state

  const { data, error } = useSWR(`/api/species/${taxid}/genes/${geneLabel}/forBarchart`, fetcher)

  if (error) return <div>Failed to load</div>
  if (!data) return <div>Fetching data ...</div>

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
        onAfterPlot={hideLoader}
      />
    </div>
  )
}

export default ExpressionPlot