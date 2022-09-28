import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import type { NextPage } from 'next'

import Layout from '../../components/Layout'
import SearchBox from '../../components/search/SearchBox'
import Pagination from "../../components/search/Pagination"
import ResultsCardList from "../../components/search/ResultsCardList"
import TextLink from '../../components/atomic/TextLink'

const GlobalSearchPage: NextPage = ({}) => {
  const router = useRouter()

  const [ loading, setLoading ] = React.useState(false)
  const [ queryTerm, setQueryTerm ] = React.useState("")
  const [ results, setResults ] = React.useState({
    pageIndex: 0,
    pageTotal: 0,
    numGenes: 0,
    genes: []
  })

  /*
    Updates url query params
    to allow copying the url to rerun same search again
  */
  // React.useEffect(() => {
  //   // if (refNum === ++refNum.current) return
  //   console.log(`from effect ${queryTerm}`)
  //   router.push(
  //     {
  //       pathname: "/search",
  //       query: {...router.query, searchTerm: queryTerm}
  //     },
  //     undefined,
  //     {shallow: true}
  //   )
  // }, [])
  /*
    Do not pass router as dependency as router is always updating on navigation
    Causes infinite navigation and browser will throttle and block navigation altogether
  */

  /*
    Custom callback to obtain suggestions based on query
    to be passed to generic SearchBox component
    TODO: if global search may call another endpoint
    TODO: perphaps make it generic Object, must return an _id and label
  */
  const getGenesSuggestions = async (query) => {
    const genes = await fetch(`/api/search/geneLabels?searchTerm=${query}`)
      .then(res => res.json())
      .then(data => data.genes)
    return genes
  }

  const fetchResults = (query: string) => {
    setLoading(true)
    setQueryTerm(query)
    router.push(
      {
        pathname: "/search",
        query: {...router.query, searchTerm: queryTerm}
      },
      undefined,
      {shallow: true}
    )
    // setQueryTerm(query)
    // update query term state
    // to be passed down to the results side too?
    // and url update?
    fetch(`/api/search/genes?searchTerm=${query}`)
      .then(res => res.json())
      .then(data => {
        setResults(data)
        setLoading(false)
      })
  }

  const changeSearchPage = async (pageIndex: number) => {
    setLoading(true)
    const genes = await fetch(`/api/search/genes?searchTerm=${queryTerm}&pageIndex=${pageIndex}`)
      .then(res => res.json())
      .then(data => {
        setResults(data)
        setLoading(false)
      })
  }

  // TODO
  // Create card components for different results returned
  // Server side pagination of results returned

  return (
    <Layout>
      <Head>
        <title>Search</title>
      </Head>
      <h1 className="text-4xl py-3">Search</h1>
      <section className="my-4" id="search-box">
        <SearchBox
          initialValue={queryTerm}
          placeholder="Search for anything (genes for now) ..."
          isLoadingResults={loading}
          getSuggestions={getGenesSuggestions}
          submitSearchQuery={fetchResults}
        />
        <TextLink href="/search/proteins" moreClassName="mx-2">
          Search by protein sequence instead
        </TextLink>
      </section>

      <section className="pt-4 my-4" id="results">
        <div className="grid grid-cols-4">
          <div className="col-span-1">
            <div className="p-3">
              <h3 className="text-xl font-medium my-2">Filters</h3>
              <p className="text-sm italic my-2">Only gene identifiers for now</p>
            </div>
          </div>
          <div className="col-span-3">
            <Pagination pageIndex={results.pageIndex} pageTotal={results.pageTotal} changeSearchPage={changeSearchPage} />
            {/*
              CASE #1: When user enter a new query term
                -> Re-render this component with new results, first page
              CASE #2: When user navigate to next/prev pages of search
                -> No re-render, use callback inside component to get next pages
                -> Still calling the same API endpoint but states for {query term, filters} are unchanged
              CASE #3: When user select different filters
                -> Re-render this component as filter states would have changed
            */}
            <ResultsCardList results={results} loading={loading} />
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default GlobalSearchPage
