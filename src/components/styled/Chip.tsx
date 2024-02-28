import { Chip as MuiChip } from '@mui/material'
import { green, red } from '@mui/material/colors'
import { styled } from '@mui/material/styles'

export const Chip = styled(MuiChip)(({ theme }) => ({
  '&.MuiChip-colorSuccess': {
    backgroundColor: green[300],
    color: green[900],
    ...(theme.palette.mode === 'light' && {
      backgroundColor: green[100]
      // border: `1px solid ${green[300]}`
    })
  },
  '&.MuiChip-colorError': {
    backgroundColor: red[300],
    color: red[50],
    ...(theme.palette.mode === 'light' && {
      backgroundColor: red[100],
      color: red[900]
      // border: `1px solid ${red[300]}`
    })
  }
}))
