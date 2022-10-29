import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

import Layout from '../components/Layout'
import SearchBox from '../components/search/SearchBox'
import TextLink from '../components/atomic/TextLink'

const Home: NextPage = () => {
  const router = useRouter()

  const getGenesSuggestions = async (query) => {
    const genes = await fetch(`/api/search/geneLabels?searchTerm=${query}`)
      .then(res => res.json())
      .then(data => data.genes)
    return genes
  }

  return (
    <Layout>
      <Head>
        <title>Plant Gene Expression Omnibus</title>
      </Head>

      <section id="home-banner-section">
        <div className="pt-16 pb-8" id="home-banner-img-container">
          <div className="relative w-64 h-64 mx-auto drop-shadow-2xl" id="home-banner-img">
            <Image
              src="/images/binary-code-bro-green.svg"
              alt="home banner image"
              layout="fill"
              objectFit="cover"
              priority
            />
          </div>
        </div>
        <div className="text-center drop-shadow" id="home-banner-text">
          <h1 className="text-4xl py-3">
            Plant Gene Expression Omnibus
          </h1>
          <p className="text-xl py-3">
            The largest annotated gene expression resource for{" "}
            <Link href="/species">
              <a className="hover:underline active:text-plb-green">
                <span className="font-bold text-xl text-plb-red">100</span> plant species
              </a>
            </Link>
          </p>
        </div>
      </section>

      <section className="py-4" id="home-search-global">
        <div className="max-w-4xl mx-auto my-4" id="search-box">
          {/*
            * Give suggestions
            * Redirect to search page on enter
          */}
          <SearchBox
            initialValue=""
            placeholder="Search for your favorite gene ..."
            getSuggestions={getGenesSuggestions}
            submitSearchQuery={(query: string) => {
              router.push({
                pathname: "/search",
                query: {...router.query, searchTerm: query, loadResults: true}
              },)
            }}
          />
        </div>
      </section>

      <section id="home-other-actions">
        <div className="flex justify-center">
          <TextLink href="/search/proteins">
            Search by protein sequence instead
          </TextLink>
        </div>

        {/* <div className="flex justify-center my-4">
          <Link href="/species">
            <a type="button" className="text-xl text-stone-500 outline outline-plb-green hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 rounded-full px-6 py-3 text-center">
              Browse species
            </a>
          </Link>
          <Link href="#">
            <a type="button" className="text-xl text-stone-500 outline outline-plb-green hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 rounded-full px-6 py-3 text-center">
              Search genes
            </a>
          </Link>

        </div> */}
      </section>

      <section id="home-draft">
        {/* <div className="h-40"></div>

        <h2>1. Select your species</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 place-items-center gap-4 my-3 py-3">

          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-bold text-2xl my-3">Genes</h3>
            <p className="my-3">See how your gene of interest is expressed across organs. To search for your gene, select your species from our record of 100 plant species.</p>
          </div>

        </div>

        <h2>2. You can search for</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 justify-items-center gap-4 my-3 py-3">

          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-bold text-2xl my-3">Genes</h3>
            <p className="my-3">See how your gene of interest is expressed across organs. To search for your gene, select your species from our record of 100 plant species.</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-bold text-2xl my-3">Organs</h3>
            <p className="my-3">Find out which genes are specifically expressed</p>
          </div>

        </div>


        <div className="py-12"></div>

        <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-lg flex items-center space-x-4">
          <div className="shrink-0">
          </div>
          <div>
            <div className="text-xl font-medium text-black">ChitChat</div>
            <p className="text-slate-500">You have a new message!</p>
          </div>
        </div> */}
      </section>
    </Layout>
  )
}

export default Home
