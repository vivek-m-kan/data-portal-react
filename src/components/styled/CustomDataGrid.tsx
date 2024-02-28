import { styled } from '@mui/material/styles'
import { DataGrid } from '@mui/x-data-grid'

export const CustomDataGrid = styled(DataGrid)(() => ({
  border: 0,
  '& .MuiDataGrid-iconSeparator': {
    display: 'none'
  },
  '& .MuiDataGrid-cell': {
    padding: '16px 0 16px 4px'
  },
  '& .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-columnHeader:focus-within, & .MuiDataGrid-cell:focus':
    {
      outline: 'none'
    },
  '& .MuiDataGrid-footerContainer': {
    borderTop: 0
  },
  '& .MuiDataGrid-newlyAdded': {
    backgroundColor: '#E3F2FD !important',
    transition: 'background-color 1s'
  }
}))

export default CustomDataGrid
