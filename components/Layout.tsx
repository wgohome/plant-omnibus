import Head from "next/head"
import Link from "next/link"
import Image from 'next/image'

import TextLink from "./atomic/TextLink";

export default function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen font-ttinterfaces tracking-wide bg-stone-100">
      <Head>
        <title>Plant Gene Expression Omnibus</title>
        <meta
          name="description"
          content="A kingdom-wide resource for plant gene expression across organs"
        />
        {/* <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" /> */}
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header>
        <nav className="sticky w-full bg-plb-green text-white shadow-sm shadow-slate-200">
          <div className="flex flex-row items-end py-4">
            <Link href="/">
              <a className="grow text-2xl font-medium hover:underline active:text-blue-800 ml-8 mr-3">
                Omnibus
              </a>
            </Link>
            {[
              ["Species", "/species"],
              ["Organs", "#"],
              ["PFAM", "/pfam"],
              ["Mapman", "/mapman"],
            ].map(([title, url]) => (
              <Link href={url} key={title}>
                <a className="text-lg mx-3 last:mr-8 hover:underline active:text-blue-800">
                  {title}
                </a>
              </Link>
            ))}
          </div>
        </nav>
      </header>

      <main className="container mx-auto py-4 px-8">{children}</main>

      <footer className="mt-auto">
        <div className="text-center px-8 my-3">
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
        <div className="bg-amber-300/50 text-center px-3 py-3">
          <p className="text-sm">
            🚧👷🏻 We are in alpha testing.{" "}
            <TextLink href="https://forms.gle/AbVGtaGe8CxtmR8q9" target="_blank">
              Give your feedback
            </TextLink>.
          </p>
        </div>
      </footer>
    </div>
  );
}
