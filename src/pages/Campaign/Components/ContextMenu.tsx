import { Delete, Edit } from '@mui/icons-material'
import { Typography } from '@mui/material'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'

export default function ContextMenu({
  open,
  setIsOpen
}: {
  open: {
    mouseX: number
    mouseY: number
  } | null
  setIsOpen: () => void
}) {
  return (
    <Menu
      open={Boolean(open)}
      onClose={setIsOpen}
      anchorReference="anchorPosition"
      anchorPosition={
        open !== null ? { top: open.mouseY, left: open.mouseX } : undefined
      }
      onContextMenu={(e) => e.preventDefault()}
    >
      <MenuItem onClick={setIsOpen} sx={{ display: 'flex', gap: 2, pl: 1 }}>
        <Delete fontSize="small" color="error" />
        <Typography>Delete</Typography>
      </MenuItem>
      <MenuItem onClick={setIsOpen} sx={{ display: 'flex', gap: 2, pl: 1 }}>
        <Edit fontSize="small" color="primary" />
        <Typography>Edit</Typography>
      </MenuItem>
    </Menu>
  )
}
