import * as React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import { Box, LinearProgress } from '@mui/material'

interface ConfirmationDialogProps {
  open: boolean
  setIsOpen: () => void
  callback: () => void
  title: string
  description: string
  buttonTexts?: { yes: string; no: string }
  buttonColors?: {
    yes:
      | 'error'
      | 'success'
      | 'primary'
      | 'secondary'
      | 'info'
      | 'warning'
      | 'inherit'
    no:
      | 'error'
      | 'success'
      | 'primary'
      | 'secondary'
      | 'info'
      | 'warning'
      | 'inherit'
  }
  loading?: boolean
  loadingColor?:
    | 'primary'
    | 'secondary'
    | 'error'
    | 'info'
    | 'success'
    | 'warning'
    | 'inherit'
}

export const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  open,
  setIsOpen,
  title,
  description,
  buttonTexts = { yes: 'Yes', no: 'Cancel' },
  buttonColors = { yes: 'primary', no: 'primary' },
  loading = false,
  loadingColor,
  callback
}) => {
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={setIsOpen}
      aria-labelledby="responsive-dialog-title"
    >
      {loading && (
        <Box width="100%">
          <LinearProgress color={loadingColor} />
        </Box>
      )}
      <DialogTitle id="responsive-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{description}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          autoFocus
          onClick={setIsOpen}
          disabled={loading}
          color={buttonColors.no}
        >
          {buttonTexts.no}
        </Button>
        <Button
          onClick={callback}
          autoFocus
          disabled={loading}
          color={buttonColors.yes}
        >
          {buttonTexts.yes}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
