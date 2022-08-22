import React from "react"

import GeneCard from "./GeneCard"

const ResultsCardList = ({ results }) => {
  return (
    <div>
      <div id="results-pagination">
        <span>Page {results.pageIndex + 1} of {results.pageTotal}</span>

      </div>
      <div className="py-3" id="result-child-cards">
        {results.genes.map((gene) => (
          <GeneCard label={gene.label} alias={gene.alias} speciesName={gene.species.name} taxid={gene.species.tax} key={gene._id} />
          ))}
      </div>
    </div>
  )
}

export default ResultsCardList
