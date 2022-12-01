import type { AppProps } from 'next/app'
import React from 'react';
import 'regenerator-runtime/runtime'

import NextNProgress from 'nextjs-progressbar'
import '../styles/globals.css'

// Fontawesome setup for Next.js
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

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
