import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { MoralisProvider } from 'react-moralis'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'

function MyApp({ Component, pageProps }: AppProps) {
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL!
  const appId = process.env.NEXT_PUBLIC_APP_ID!

  return (
    <MoralisProvider serverUrl={serverUrl} appId={appId}>
      <NavBar />
      <Component {...pageProps} />
      <Footer />
    </MoralisProvider>
  )
}

export default MyApp
