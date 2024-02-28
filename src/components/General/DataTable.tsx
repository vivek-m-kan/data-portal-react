import {
  DataGridProps,
  GridPaginationModel,
  GridRowSelectionModel,
  GridSortModel
} from '@mui/x-data-grid'
import { Filters } from 'src/types/common'
import CustomDataGrid from '../styled/CustomDataGrid'
import { Box, InputAdornment, TextField } from '@mui/material'
import { useState } from 'react'
import { Search } from '@mui/icons-material'

interface DataTableProps extends DataGridProps {
  filters: Filters
  onFilter: (filters: Filters) => void
  onRowSelect?: (selection: GridRowSelectionModel) => void
  search?: string
}

export const DataTable: React.FC<DataTableProps> = ({
  columns = [],
  rows = [],
  filters,
  onFilter,
  onRowSelect,
  search,
  ...rest
}) => {
  const [time, setTime] = useState<ReturnType<typeof setTimeout> | undefined>(
    undefined
  )

  const handlePagination = (model: GridPaginationModel) =>
    onFilter({ page: model.page + 1, limit: model.pageSize })

  const handleSorting = (model: GridSortModel) => {
    const sort = model?.[0]
    if (sort) {
      onFilter({ sortField: sort.field, sortOrder: sort.sort })
    }
  }

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    clearTimeout(time)
    const timer: ReturnType<typeof setTimeout> = setTimeout(() => {
      onFilter({ search: event.target.value })
    }, 1000)
    setTime(timer)
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
      {search !== undefined && (
        <Box
          sx={{ display: 'flex', width: '100%', justifyContent: 'flex-end' }}
        >
          <TextField
            name="search"
            type="search"
            placeholder="Search"
            onChange={handleSearch}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              )
            }}
          />
        </Box>
      )}
      <CustomDataGrid
        columns={columns}
        autoHeight
        rows={rows}
        paginationMode="server"
        pageSizeOptions={[5, 10, 25]}
        paginationModel={
          filters && {
            ...filters,
            page: filters?.page ? filters?.page - 1 : 1,
            pageSize: filters?.limit || 10
          }
        }
        onPaginationModelChange={handlePagination}
        sortingMode="server"
        initialState={{
          sorting: {
            sortModel: [
              { field: filters.sortField || 'name', sort: filters.sortOrder }
            ]
          }
        }}
        onSortModelChange={handleSorting}
        sortingOrder={['asc', 'desc']}
        disableColumnMenu
        checkboxSelection
        disableRowSelectionOnClick
        // keepNonExistentRowsSelected
        onRowSelectionModelChange={onRowSelect}
        {...rest}
      />
    </Box>
  )
}
