import { createContext, useEffect, useContext } from 'react'
import { useMoralis } from 'react-moralis'
import Moralis from 'moralis'
import { toast } from 'react-toastify'

export const AuthenticationContext = createContext<{
  signin: () => Promise<void>
  signout: () => Promise<void>
  user: Moralis.User | null
}>({
  signin: () => Promise.resolve(),
  signout: () => Promise.resolve(),
  user: null,
})

export const AuthenticationProvider = ({ children }) => {
  const {
    authenticate,
    isAuthenticated,
    isAuthenticating,
    logout,
    isWeb3Enabled,
    enableWeb3,
    Moralis,
    user,
  } = useMoralis()
  // polygon testnet and local
  const supportedChainIds = ['0x13881', '0x7a69']

  useEffect(() => {
    authentication()
    // Subscribe to onChainChanged events
    const unsubscribeOnChainChanged = Moralis.onChainChanged((chain) => {
      if (supportedChainIds.indexOf(chain as string) == -1) {
        toast.error('This application is not supported on this chain')
        toast.info(
          "Please switch to Polygon's testnet or local development network"
        )
      }
    })

    // Unsubscribe to onChainChanged events
    const unsubscribeOnAccountChanged = Moralis.onAccountChanged(
      async (address) => {
        if (!isAuthenticating) {
          console.log('Account changed', address)
          await authenticate({
            signingMessage: 'Sign in to your account',
          })
        }
      }
    )
    return () => {
      unsubscribeOnAccountChanged()
      unsubscribeOnChainChanged()
    }
  }, [isWeb3Enabled])

  const authentication = async () => {
    try {
      if (!isWeb3Enabled) {
        await enableWeb3()
      }
    } catch (e) {
      console.log(e)
    }
  }

  const signin = async () => {
    if (!isAuthenticated) {
      try {
        await authenticate({
          signingMessage: 'Sign in to your account',
        })
      } catch (error) {
        console.error(error)
      }
    }
  }

  const signout = async () => {
    await logout()
  }

  return (
    <AuthenticationContext.Provider
      value={{
        signin,
        signout,
        user,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  )
}

export const useAuthentication = () => {
  return useContext(AuthenticationContext)
}
