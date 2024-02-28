import { ThemeOptions as MuiThemeOptions, createTheme } from '@mui/material'
import { deepOrange } from '@mui/material/colors'

const theme = createTheme({
  palette: {
    // primary: {
    //   light: '#757ce8',
    //   main: '#3f50b5',
    //   dark: '#002884',
    //   contrastText: '#fff'
    // },
    // secondary: {
    //   light: '#4aedc4',
    //   main: '#1de9b6',
    //   dark: '#14a37f',
    //   contrastText: '#fff'
    // },
    error: {
      main: deepOrange[600]
    }
  }
})

export const ThemeOptions: MuiThemeOptions = {
  palette: {
    ...theme.palette
  },
  components: {
    MuiList: {
      styleOverrides: {
        root: {
          padding: '16px 8px'
        }
      }
    },
    // MuiListItem: {
    //   styleOverrides: {
    //     root: {
    //       '& .MuiListItemButton-root:hover': {
    //         backgroundColor: theme.palette.primary[theme.palette.mode],
    //         color: '#fff',
    //         '& .MuiListItemIcon-root': {
    //           color: '#fff'
    //         },
    //         '& .MuiAvatar-root': {
    //           color: '#fff'
    //         }
    //       }
    //     }
    //   }
    // },
    // MuiAvatar: {
    //   styleOverrides: {
    //     root: {
    //       backgroundColor: theme.palette.primary[theme.palette.mode]
    //     }
    //   }
    // },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          padding: '8px',
          borderRadius: 4
        }
      }
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          borderRadius: 4
          // '&:hover': {
          //   backgroundColor: theme.palette.primary[theme.palette.mode],
          //   color: '#fff',
          //   '& .MuiListItemIcon-root': {
          //     color: '#fff'
          //   },
          //   '& .MuiAvatar-root': {
          //     color: '#fff'
          //   }
          // }
        }
      }
    }
  }
}

const PortalTheme = createTheme(ThemeOptions)

export default PortalTheme
