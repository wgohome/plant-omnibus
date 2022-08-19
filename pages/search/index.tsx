import type { NextPage } from 'next'
import React from 'react'
import Head from 'next/head'

import Layout from '../../components/Layout'
import SearchBox from '../../components/searchBox'

const GlobalSearchPage: NextPage = ({}) => {
  const [ results, setResults ] = React.useState([])
  const [ loading, setLoading ] = React.useState(false)

  /*
    Custom callback to obtain suggestions based on query
    to be passed to generic SearchBox component
    TODO: if global search may call another endpoint
  */
  const getGenesSuggestions = async (query) => {
    const genes = await fetch(`/api/search/genes?searchTerm=${query}`)
      .then(res => res.json())
    return genes
  }

  const submitSearchQuery = (query) => {
    setLoading(true)
    fetch(`/api/search/genes?searchTerm=${query}`)
      .then(res => res.json())
      .then(genes => {
        setResults(genes)
        setLoading(false)
      })
  }

  // TODO
  // Create card components for different results returned
  // Server side pagination of results returned

  return (
    <Layout>
      <h1 className="text-4xl py-3">Search</h1>
      <section id="search-box">
        <SearchBox
          initialValue=""
          placeholder="Search for anything (genes for now) ..."
          getSuggestions={getGenesSuggestions}
          submitSearchQuery={submitSearchQuery}
        />
      </section>

      <section id="results">
        <h3>Results</h3>
        {loading ?
          ("Fetching results ...")
          :
          (JSON.stringify(results))
        }
      </section>
    </Layout>
  )
}

export default GlobalSearchPage
