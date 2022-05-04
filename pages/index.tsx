import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { ReactElement, useEffect } from 'react'
import { useMoralis } from 'react-moralis'
import Layout from '../components/layout'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  const {
    authenticate,
    isAuthenticated,
    isAuthenticating,
    user,
    account,
    logout,
  } = useMoralis()

  return (
    <div className="h-screen">
      <h1>Hello</h1>
    </div>
  )
}

export default Home
