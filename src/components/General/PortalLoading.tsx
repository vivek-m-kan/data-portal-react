import { DataObject } from '@mui/icons-material'
import { Box, CircularProgress } from '@mui/material'

export const PortalLoading = () => {
  return (
    <Box
      sx={(theme) => ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: theme.palette.mode === 'dark' ? '#000' : '#fff',
        position: 'absolute',
        height: '100%',
        width: '100%',
        top: 0,
        left: 0
      })}
    >
      <Box sx={{ m: 1, position: 'relative' }}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          width={74}
          height={74}
        >
          <DataObject color="primary" fontSize="large" />
        </Box>
        <CircularProgress
          size={86}
          color="secondary"
          sx={{
            position: 'absolute',
            top: -6,
            left: -6,
            zIndex: 1
          }}
        />
      </Box>
    </Box>
  )
}
