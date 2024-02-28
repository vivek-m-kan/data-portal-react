import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'

import { Divider, Slide } from '@mui/material'
import { useLocation } from 'react-router-dom'
import routes from 'src/Router/routes'
import { StyledAppBar } from 'src/components/styled'

interface PortalAppBarProps {
  open: boolean
  setIsDrawerOpen: () => void
}

export default function PortalAppBar({
  open,
  setIsDrawerOpen
}: PortalAppBarProps) {
  const currentLocation = useLocation()

  const getHeaderName = () =>
    routes.find((route) => route.path === currentLocation.pathname)?.title || ''
  return (
    <StyledAppBar position="fixed" open={open} color="inherit">
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={setIsDrawerOpen}
          edge="start"
          sx={{
            marginRight: 5,
            ...(open && { display: 'none' })
          }}
        >
          <MenuIcon />
        </IconButton>
        <Slide in={open} direction="right" timeout={500} appear={false}>
          <Typography variant="h6" noWrap component="div">
            {getHeaderName()}
          </Typography>
        </Slide>
      </Toolbar>
      <Divider />
    </StyledAppBar>
  )
}
