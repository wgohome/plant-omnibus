import Head from "next/head"
import Link from "next/link"
import Image from 'next/image'


export default function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen font-ttinterfaces tracking-wide bg-stone-100">
      <Head>
        <title>Plant Gene Expression Omnibus</title>
        <meta
          name="description"
          content="A kingdom-wide resource for plant gene expression across organs"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header>
        <nav className="sticky w-full bg-plb-green text-white shadow-sm shadow-slate-200">
          <div className="flex flex-row items-end py-4">
            <Link href="/">
              <h1 className="grow text-2xl font-medium hover:underline active:text-blue-800 ml-8 mr-3">
                Omnibus
              </h1>
            </Link>
            {[
              ["Species", "/species"],
              ["Organs", "#"],
              ["PFAM", "#"],
            ].map(([title, url]) => (
              <Link href={url} key={title}>
                <p className="text-lg mx-3 last:mr-8 hover:underline active:text-blue-800">
                  {title}
                </p>
              </Link>
            ))}
          </div>
        </nav>
      </header>

      <main className="container mx-auto py-4 px-4">{children}</main>

      <footer className="mt-auto">
        <div className="text-center px-8 py-3">
          <a
            href="https://plant.tools"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            Mutwil Lab
          </a>{" "}
          🌱 , NTU Singapore
        </div>
      </footer>
    </div>
  );
}
