import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import Layout from '../components/Layout'

const Home: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>Plant Gene Expression Omnibus</title>
      </Head>
      <section>
        <div>
          <div className="h-36" />
          <h1 className="text-4xl my-3">
            Plant Gene Expression Omnibus
          </h1>
          <p className="text-xl my-3">
            The largest annotated gene expression resource for <span className="font-bold text-plb-red">100</span> plant species
          </p>
          <div className="h-12" />
          <Link href="/species">
            <button type="button" className="text-xl text-white bg-plb-green hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 rounded-full px-6 py-3 text-center">
              Browse species
            </button>
          </Link>
        </div>

        {/* <div className="">
          <Image
            src="/images/pots_of_plants.jpg"
            alt="background image"
            width={400}
            height={180}
            layout="responsive"
            objectFit="cover"
            objectPosition="50% bottom"
          />
        </div> */}

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
