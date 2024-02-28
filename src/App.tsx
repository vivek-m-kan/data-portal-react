import './App.css'
import { ThemeProvider } from '@mui/material'
import { BrowserRouter } from 'react-router-dom'
import AppRouter from './Router/AppRouter'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './contexts/AuthContext'
import { useSettings } from './hooks/useSettings'

function App() {
  const queryClient = new QueryClient()
  const { theme } = useSettings()

  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Toaster
          position="bottom-center"
          gutter={12}
          containerStyle={{ bottom: 40 }}
          toastOptions={{
            duration: 5000,
            style: {
              ...(theme.palette.mode === 'dark' && {
                background: theme.palette.grey[800],
                color: '#fff'
              })
            }
          }}
        />
        <BrowserRouter>
          <AuthProvider>
            <AppRouter />
          </AuthProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </ThemeProvider>
  )
}

export default App
