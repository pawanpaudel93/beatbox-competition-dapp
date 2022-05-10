import { createContext, useEffect, useContext } from 'react'
import { useMoralis } from 'react-moralis'

export const AuthenticationContext = createContext<{
  signin: () => Promise<void>
  signout: () => Promise<void>
}>({
  signin: () => Promise.resolve(),
  signout: () => Promise.resolve(),
})

export const AuthenticationProvider = ({ children }) => {
  const { authenticate, isAuthenticated, logout, isWeb3Enabled, enableWeb3 } =
    useMoralis()

  useEffect(() => {
    authentication()
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
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  )
}

export const useAuthentication = () => {
  const { signin, signout } = useContext(AuthenticationContext)
  return { signin, signout }
}
