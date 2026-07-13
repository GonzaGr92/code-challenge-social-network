import { useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import { broadcastQueryClient } from '@tanstack/query-broadcast-client-experimental'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { AppProps } from 'next/app'
import Head from 'next/head'

import '../src/styles/globals.scss'

const DEFAULT_STALE_TIME = 1000 * 60 * 5 // 5 minutes

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // refetchOnWindowFocus: false,
            staleTime: DEFAULT_STALE_TIME,
          },
        },
      }),
  )

  useEffect(() => {
    return broadcastQueryClient({
      queryClient,
      broadcastChannel: 'tanstack-query',
    })
  }, [queryClient])

  return (
    <>
      <Head>
        <title>Social Network</title>
        <meta name="description" content="A simple social network" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <QueryClientProvider client={queryClient}>
        <main className="container">
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            draggable
            //TODO: Adjust theme
            theme="dark"
          />
          <Component {...pageProps} />
        </main>
      </QueryClientProvider>
    </>
  )
}
