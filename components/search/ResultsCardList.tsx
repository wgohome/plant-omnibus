import React from "react"

import GeneCard from "./GeneCard"

const ResultsCardList = ({ results, loading }) => {
  return (
    <div className="" id="result-child-cards">
      {loading ? (
        "Fetching results ..."
      ) : (
        results.genes.map((gene) => (
          <GeneCard label={gene.label} alias={gene.alias} speciesName={gene.species.name} taxid={gene.species.tax} key={gene._id} />
        ))
      )}
    </div>
  )
}

export default ResultsCardList
