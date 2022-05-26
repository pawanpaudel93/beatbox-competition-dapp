import '../styles/globals.css'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import type { AppProps } from 'next/app'
import { MoralisProvider } from 'react-moralis'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import { ChakraProvider } from '@chakra-ui/react'
import NextNProgress from 'nextjs-progressbar'
import { AuthenticationProvider } from '../context/AuthenticationContext'

function MyApp({ Component, pageProps }: AppProps) {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL!
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const appId = process.env.NEXT_PUBLIC_APP_ID!

  return (
    <MoralisProvider serverUrl={serverUrl} appId={appId}>
      <AuthenticationProvider>
        <ChakraProvider>
          <NextNProgress />
          <NavBar />
          <div
            className="md:px-6 py-2 min-h-screen"
            style={{ marginTop: '70px' }}
          >
            <Component {...pageProps} />
            <ToastContainer />
          </div>
          <Footer />
        </ChakraProvider>
      </AuthenticationProvider>
    </MoralisProvider>
  )
}

export default MyApp
