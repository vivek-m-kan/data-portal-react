import {
  ThemeOptions as MuiThemeOptions,
  Theme,
  createTheme
} from '@mui/material'
import { createContext, useEffect, useState } from 'react'
import PortalTheme, { ThemeOptions } from 'src/Theme'

interface SidebarOptions {
  collapse: boolean
}

interface DefaultProviderProps {
  theme: Theme
  setTheme: (options: MuiThemeOptions) => void
  themeOptions: MuiThemeOptions
  sidebar: SidebarOptions
  setSidebar?: (options: SidebarOptions) => void
}
// ** Defaults
const defaultProvider: DefaultProviderProps = {
  theme: PortalTheme,
  setTheme: (options: MuiThemeOptions) =>
    createTheme({ ...ThemeOptions, ...options }),
  themeOptions: ThemeOptions,
  sidebar: { collapse: false }
}

const SettingsContext = createContext(defaultProvider)

interface SettingsProviderProps {
  children: React.ReactNode
}

const SettingsProvider = ({ children }: SettingsProviderProps) => {
  const [theme, setTheme] = useState<Theme>(defaultProvider.theme)
  const [sidebar, setSidebar] = useState<SidebarOptions>(
    defaultProvider.sidebar
  )
  const [themeOptions, setThemeOptions] = useState<MuiThemeOptions>(
    defaultProvider.themeOptions
  )

  const handleTheme = (options: MuiThemeOptions) => {
    if (options?.palette) {
      options.palette.primary = ThemeOptions.palette?.primary
      options.palette.secondary = ThemeOptions.palette?.secondary
    }
    const newOptions = {
      ...ThemeOptions,
      ...options
    }
    const newTheme = createTheme(newOptions)
    setTheme(newTheme)
    setThemeOptions(newOptions)
    window.localStorage.setItem('theme', JSON.stringify(newOptions))
  }

  const handleSidebar = (options: SidebarOptions) => {
    const newOptions = { ...sidebar, ...options }

    setSidebar(newOptions)
    window.localStorage.setItem('sidebar', JSON.stringify(newOptions))
  }

  useEffect(() => {
    if (window.localStorage.getItem('theme')) {
      const th = JSON.parse(window.localStorage.getItem('settings') as string)
      setTheme(createTheme(th))
    }
    if (window.localStorage.getItem('sidebar')) {
      const sb = JSON.parse(window.localStorage.getItem('sidebar') as string)
      setSidebar(sb)
    }
  }, [])

  const values = {
    theme,
    setTheme: handleTheme,
    themeOptions,
    sidebar,
    setSidebar: handleSidebar
  }

  return (
    <SettingsContext.Provider value={values}>
      {children}
    </SettingsContext.Provider>
  )
}

export { SettingsContext, SettingsProvider }
