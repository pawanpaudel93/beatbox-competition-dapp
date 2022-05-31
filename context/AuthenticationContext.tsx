import { createContext, useEffect, useContext } from 'react'
import { useMoralis } from 'react-moralis'
import Moralis from 'moralis'
import { toast } from 'react-toastify'

export const AuthenticationContext = createContext<{
  signin: () => Promise<void>
  signout: () => Promise<void>
  user: Moralis.User | null
  isAuthenticated: boolean
  isAuthenticating: boolean
  getReadyForTransaction: () => Promise<void>
}>({
  signin: () => Promise.resolve(),
  signout: () => Promise.resolve(),
  user: null,
  isAuthenticated: false,
  isAuthenticating: false,
  getReadyForTransaction: () => Promise.resolve(),
})

export const AuthenticationProvider = ({ children }) => {
  const {
    authenticate,
    isAuthenticated,
    isAuthenticating,
    logout,
    isWeb3Enabled,
    enableWeb3,
    authError,
    web3EnableError,
    userError,
    Moralis,
    user,
  } = useMoralis()
  // polygon testnet and local
  const supportedChainIds = ['0x13881']

  const switchNetworkMumbai = async () => {
    try {
      const chainId = await Moralis.chainId
      if (supportedChainIds.indexOf(chainId as string) == -1) {
        try {
          await Moralis.switchNetwork('0x13881')
        } catch (error) {
          if (error?.code === 4902) {
            try {
              await Moralis.addNetwork(
                '0x13881',
                'Polygon Mumbai testnet',
                'https://rpc-mumbai.matic.today',
                'Matic',
                'Matic',
                'https://explorer-mumbai.maticvigil.com'
              )
            } catch (error) {
              console.log(error)
            }
          }
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (isWeb3Enabled) {
      // Subscribe to onChainChanged events
      const unsubscribeOnChainChanged = Moralis.onChainChanged((chain) => {
        if (supportedChainIds.indexOf(chain as string) == -1) {
          toast.error('This application is not supported on this chain.')
          toast.info("Please switch to Polygon's mumbai testnet.")
          switchNetworkMumbai()
        }
      })

      // Unsubscribe to onChainChanged events
      const unsubscribeOnAccountChanged = Moralis.onAccountChanged(
        async (address) => {
          console.log('Account changed', address)
          await authenticate({
            signingMessage: 'Sign in to your account',
          })
        }
      )
      return () => {
        unsubscribeOnAccountChanged()
        unsubscribeOnChainChanged()
      }
    }
  }, [isWeb3Enabled])

  const getReadyForTransaction = async () => {
    if (!isWeb3Enabled) {
      await enableWeb3()
    }
    if (!isAuthenticated) {
      await authenticate({
        signingMessage: 'Sign in to your account',
      })
    }

    if (web3EnableError) {
      throw web3EnableError
    } else if (authError) {
      throw authError
    } else if (userError) {
      throw userError
    }
  }

  const signin = async () => {
    if (typeof window?.ethereum == 'undefined') {
      toast.error('This dApp Requires Metamask. Please install Metamask.', {
        autoClose: false,
      })
    }
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
        isAuthenticated,
        isAuthenticating,
        getReadyForTransaction,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  )
}

export const useAuthentication = () => {
  return useContext(AuthenticationContext)
}
