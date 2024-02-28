// ** React Imports
import { createContext, useEffect, useState } from 'react'

// ** Config
import { auth } from 'src/configs'
import { AuthService } from 'src/services/AuthService'
import { FormValues } from 'src/pages/login/login'
import toast from 'react-hot-toast'
import { useLocation, useNavigate } from 'react-router-dom'
import { ROUTES } from 'src/constants/routes'

interface PortalUser {
  id: number
  name: string
  email: string
  created: string
}

// ** Defaults
interface DefaultProviderProps {
  user: PortalUser | null
  loading: boolean
  setUser: React.Dispatch<React.SetStateAction<PortalUser | null>>
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
  login: (params: FormValues, callback: (err: string) => void) => Promise<void>
  logout: () => Promise<void>
}
const defaultProvider: DefaultProviderProps = {
  user: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve()
}
const AuthContext = createContext(defaultProvider)

interface AuthProviderProps {
  children: React.ReactNode
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  // ** States
  const [user, setUser] = useState(defaultProvider.user)
  const [loading, setLoading] = useState(defaultProvider.loading)

  // ** Hooks
  const navigate = useNavigate()
  const location = useLocation()

  const initAuth = async () => {
    const storedToken = window.sessionStorage.getItem(auth.storageTokenKeyName)
    if (storedToken) {
      AuthService.getMe()
        .then(async (response) => {
          setLoading(false)
          setUser({ ...response.user })
        })
        .catch(() => {
          setUser(null)
          setLoading(false)
        })
    } else {
      setLoading(false)
    }
  }

  useEffect(() => {
    initAuth()
    const storedToken = window.sessionStorage.getItem(auth.storageTokenKeyName)
    if (!storedToken) {
      setUser(null)
    } else {
      setLoading(false)
    }
  }, [location.pathname])

  useEffect(() => {
    setLoading(true)
    initAuth()
    const storedToken = window.sessionStorage.getItem(auth.storageTokenKeyName)
    if (!storedToken) {
      setLoading(false)
      navigate('/login')
    }
  }, [])

  const handleLogin = async (
    params: FormValues,
    callback: (err: string) => void
  ) => {
    const storedToken = window.sessionStorage.getItem(auth.storageTokenKeyName)
    if (storedToken) {
      return navigate(ROUTES.DASHBOARD)
    }

    return AuthService.login(params)
      .then((response) => {
        window.sessionStorage.setItem(auth.storageTokenKeyName, response.token)
        window.sessionStorage.setItem(
          auth.storageUserKeyName,
          JSON.stringify(response.user)
        )
        navigate(ROUTES.DASHBOARD)
        toast.success(`Welcome to portal, ${response.user.name}`)
      })
      .catch((err) => {
        return callback(err.message)
      })
  }

  const handleLogout = async () => {
    setLoading(true)
    try {
      await AuthService.logout()
      window.sessionStorage.clear()
      setUser(null)
      navigate('/login')
      setLoading(false)
    } catch (error) {
      setLoading(false)
      toast.error(
        error instanceof Error ? error.message : 'Something went wrong'
      )
    }
  }

  const values = {
    user,
    loading,
    setUser,
    setLoading,
    login: handleLogin,
    logout: handleLogout
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
