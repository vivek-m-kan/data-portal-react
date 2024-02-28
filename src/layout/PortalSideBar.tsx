import * as React from 'react'
import IconButton from '@mui/material/IconButton'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { CSSObject, styled, Theme } from '@mui/material/styles'
import MuiDrawer from '@mui/material/Drawer'
import {
  Avatar,
  Box,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
  Zoom
} from '@mui/material'
import {
  KeyboardBackspace,
  Logout,
  PersonAdd,
  Settings
} from '@mui/icons-material'
import { drawerWidth } from 'src/constants/general'
import { TOP_LINKS } from 'src/constants/routes'
import DrawerHeader from 'src/components/styled/DrawerHeader'
import { Link, matchRoutes, useLocation } from 'react-router-dom'
import { useSettings } from 'src/hooks/useSettings'
import { ucfirst } from 'src/utils'

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen
  }),
  overflowX: 'hidden'
})

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`
  }
})

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open'
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme)
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme)
  })
}))

interface PortalSideBarProps {
  open: boolean
  setIsOpen: () => void
  logout: () => void
}

const PortalSideBar: React.FC<PortalSideBarProps> = ({
  open,
  setIsOpen,
  logout
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const currentLocation = useLocation()
  const profileOpen = Boolean(anchorEl)
  const { theme, setTheme } = useSettings()

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (event.currentTarget.parentElement?.parentElement) {
      setAnchorEl(event.currentTarget.parentElement?.parentElement)
    }
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const getActiveClassIf = (paths: string[] | string) => {
    const shouldMatch: { path: string }[] = Array.isArray(paths)
      ? paths.map((path: string) => {
          return { path }
        })
      : [{ path: paths }]

    return Boolean(matchRoutes(shouldMatch, currentLocation))
  }

  const getSelectedIconColor = (paths: string[] | string) =>
    getActiveClassIf(paths) ? 'primary' : undefined

  return (
    <>
      <Drawer
        variant="permanent"
        open={open}
        // onMouseOver={setIsOpen}
        // onMouseOut={setIsOpen}
      >
        <DrawerHeader>
          <Box
            display="flex"
            width="100%"
            justifyContent="space-between"
            alignItems="center"
            px={1}
          >
            <Typography>Data Portal</Typography>
            <IconButton onClick={setIsOpen}>
              <KeyboardBackspace />
            </IconButton>
          </Box>
        </DrawerHeader>
        <Divider />
        <List>
          {TOP_LINKS.map((link) => (
            <ListItem key={link.title} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: open ? 1 : 2.5
                }}
                component={Link}
                to={link.route}
                selected={getActiveClassIf([
                  ...link.connectedRoutes,
                  ...[link.route]
                ])}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 1 : 'auto',
                    justifyContent: 'center'
                  }}
                >
                  <Tooltip title={link.title} placement="right-end">
                    <link.icon
                      color={getSelectedIconColor([
                        ...link.connectedRoutes,
                        ...[link.route]
                      ])}
                    />
                  </Tooltip>
                </ListItemIcon>
                <Zoom in={open} appear={false}>
                  <ListItemText
                    primary={
                      <Typography
                        color={getSelectedIconColor([
                          ...link.connectedRoutes,
                          ...[link.route]
                        ])}
                      >
                        {link.title}
                      </Typography>
                    }
                  />
                </Zoom>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        {/* <Divider /> */}
        <List sx={{ mt: 'auto' }}>
          <Divider />
          <ListItem disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center'
              }}
              onClick={handleClick}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 1 : 'auto',
                  justifyContent: 'center'
                }}
              >
                <Avatar sx={{ width: 32, height: 32 }} variant="rounded" />
              </ListItemIcon>
              <Zoom in={open} appear={false}>
                <ListItemText primary={'Profile'} />
              </Zoom>
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={profileOpen}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            // bgcolor: '#1d1d1d',
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1
            },
            '&::before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              bottom: -10,
              left: 12,
              width: 10,
              height: 10,
              bgcolor: 'backgroud.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0
            }
          }
        }}
        transformOrigin={{ horizontal: 'left', vertical: 'bottom' }}
        anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
      >
        <MenuItem onClick={handleClose}>
          <Avatar /> Profile
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Avatar /> My account
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add another account
        </MenuItem>
        <MenuItem
          onClick={() =>
            setTheme({
              palette: {
                mode: theme.palette.mode === 'light' ? 'dark' : 'light'
              }
            })
          }
        >
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          {`${ucfirst(theme.palette.mode)} Mode`}
        </MenuItem>
        <MenuItem onClick={logout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  )
}

export default PortalSideBar
