import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { MoralisProvider } from 'react-moralis'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import { ChakraProvider } from '@chakra-ui/react'

function MyApp({ Component, pageProps }: AppProps) {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL!
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const appId = process.env.NEXT_PUBLIC_APP_ID!

  return (
    <MoralisProvider serverUrl={serverUrl} appId={appId}>
      <ChakraProvider>
        <NavBar />
        <div className="px-6 py-2 min-h-screen">
          <Component {...pageProps} />
        </div>
        <Footer />
      </ChakraProvider>
    </MoralisProvider>
  )
}

export default MyApp
