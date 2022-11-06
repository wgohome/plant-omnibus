import type { AppProps } from 'next/app'
import React from 'react';
import 'regenerator-runtime/runtime'

import NextNProgress from 'nextjs-progressbar'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  React.useEffect(() => {
    import("flowbite/dist/flowbite.js")
  }, [])

  return <>
    <NextNProgress height={5} color="#D87F61" />
    <Component {...pageProps} />
  </>
}

export default MyApp
