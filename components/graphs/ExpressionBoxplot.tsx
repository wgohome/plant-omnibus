import React from "react"
import Plot from "react-plotly.js"
import useSWRImmutable from "swr/immutable"

import * as poNameMap from '../../public/data/po_name_map.json' assert {type: 'json'}


const fetcher = (...args) => fetch(...args).then((res) => res.json())

const ExpressionBoxplot = ({ taxid, geneLabel, hideLoader, sampleAnnotations }) => {
  // const { data, error } = useSWRImmutable(`/api/species/${taxid}/genes/${geneLabel}/forBarchart`, fetcher)
  // if (error) return <div>Failed to load</div>
  // if (!data) return <div>Fetching data ...</div>

  const tracesData = sampleAnnotations.map(sa => ({
    tpms: sa.samples.map(sample => sample.tpm),
    label: poNameMap[sa.label],
  }))

  return (
    <div className="relative my-4">
      <Plot
        data={
          tracesData.map(trace => ({
            type: "box",
            y: trace.tpms,
            boxpoints: "all",
            name: trace.label,
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
          yaxis: {title: "TPM"},
          height: 600,
        }}
        config={ {responsive: true} }
        // style={ {width: "inherit", height: "inherit"} }
        style={{
          position: "relative",
        }}
        onInitialized={hideLoader}
      />
    </div>
  )
}

export default ExpressionBoxplot
