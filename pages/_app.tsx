import '../styles/globals.css'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import type { AppProps } from 'next/app'
import { MoralisProvider } from 'react-moralis'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import { ChakraProvider } from '@chakra-ui/react'
import { Provider, createClient } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { providers } from 'ethers'

function MyApp({ Component, pageProps }: AppProps) {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL!
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const appId = process.env.NEXT_PUBLIC_APP_ID!

  const client = createClient({
    connectors: [new InjectedConnector()],
    provider(config) {
      return new providers.JsonRpcProvider('http://localhost:8545')
    },
  })

  return (
    <MoralisProvider serverUrl={serverUrl} appId={appId}>
      <Provider client={client}>
        <ChakraProvider>
          <NavBar />
          <div className="px-6 py-2 min-h-screen">
            <Component {...pageProps} />
            <ToastContainer />
          </div>
          <Footer />
        </ChakraProvider>
      </Provider>
    </MoralisProvider>
  )
}

export default MyApp
