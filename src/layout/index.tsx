import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import { Container } from '@mui/material'
import PortalAppBar from './PortalAppBar'
import PortalSideBar from './PortalSideBar'
import DrawerHeader from 'src/components/styled/DrawerHeader'
import { Outlet } from 'react-router-dom'
import { useState } from 'react'
import { ConfirmationDialog } from 'src/components/General'
import { useAuth } from 'src/hooks/useAuth'
import { useSettings } from 'src/hooks/useSettings'

interface LayoutProps {
  header?: boolean
  sidebar?: boolean
  children?: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({
  header = true,
  sidebar = true,
  children
}) => {
  const {
    sidebar: { collapse },
    setSidebar
  } = useSettings()
  // ** States
  const [open, setOpen] = useState<boolean>(!collapse)

  const [dialogOpen, setDialogOpen] = useState<boolean>(false)

  const { logout, loading } = useAuth()

  // ** Functions
  const handleDrawer = () => {
    setOpen(!open)
    setTimeout(() => {
      setSidebar && setSidebar({ collapse: open })
    }, 2000)
  }
  const handleDialog = () => {
    setDialogOpen(!dialogOpen)
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      {header && <PortalAppBar open={open} setIsDrawerOpen={handleDrawer} />}
      {sidebar && (
        <PortalSideBar
          open={open}
          setIsOpen={handleDrawer}
          logout={handleDialog}
        />
      )}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Container maxWidth="xl">
          <Box display="flex" flexDirection="column" gap={8}>
            {children || <Outlet />}
          </Box>
        </Container>
      </Box>
      <ConfirmationDialog
        open={dialogOpen}
        setIsOpen={handleDialog}
        title="Are you sure?"
        description="If you logout you have to login again with email and password !"
        callback={logout}
        loading={loading}
      />
    </Box>
  )
}
export default Layout
