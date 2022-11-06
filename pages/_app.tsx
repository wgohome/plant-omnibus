import type { AppProps } from 'next/app'
import React from 'react';
import 'regenerator-runtime/runtime';

import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  React.useEffect(() => {
    import("flowbite/dist/flowbite.js")
  }, [])

  return <Component {...pageProps} />
}

export default MyApp
