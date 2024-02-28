import { Button, Chip, Typography } from '@mui/material'
import { GridColDef } from '@mui/x-data-grid'
import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { DataTable, PageHeader } from 'src/components/General'
import { useGetClients } from 'src/queries/clients'
import { Filters } from 'src/types/common'
import Form from './Form'
import { ClientObject } from './types'
import { Add } from '@mui/icons-material'

const Campaign = () => {
  // states
  const [filters, setFilters] = useState<Filters>({
    page: 1,
    limit: 10,
    search: '',
    sortField: 'name',
    sortOrder: 'desc'
  })
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false)
  const [dataToEdit, setDataToEdit] = useState<ClientObject | undefined>(
    undefined
  )

  // queries
  const queryCLient = useQueryClient()
  const { data, error, isError, isLoading, isFetching } = useGetClients(filters)

  if (isError) {
    toast.error(error.message)
  }

  const handleFilter = (incoming: Filters) => {
    const newFilters: Filters = {
      page: incoming?.page || filters.page,
      limit: incoming?.limit || filters.limit,
      search: incoming?.search || filters.search,
      sortField: incoming?.sortField || filters.sortField,
      sortOrder: incoming?.sortOrder || filters.sortOrder
    }

    queryCLient.refetchQueries({ queryKey: ['campaigns', newFilters] })

    setFilters(newFilters)
  }

  const columns: GridColDef[] = [
    {
      flex: 0.7,
      field: 'name',
      headerName: 'Name',
      renderCell: ({ row }) => <Typography>{row.name}</Typography>
    },
    {
      flex: 0.3,
      field: 'company_name',
      headerName: 'Company Name',
      renderCell: ({ row }) => <Typography>{row.company_name}</Typography>
    },
    {
      flex: 0.3,
      field: 'creator',
      headerName: 'Created By',
      sortable: false,
      renderCell: ({ row }) => (
        <Typography>{row.creator?.name || 'Self'}</Typography>
      )
    }
    // {
    //   flex: 0.1,
    //   field: 'status',
    //   headerName: 'Status',
    //   renderCell: ({ row }) => (
    //     <Chip
    //       label={row.status ? 'Active' : 'In-active'}
    //       color={row.status ? 'success' : 'error'}
    //       variant="outlined"
    //     />
    //   )
    // }
  ]
  return (
    <>
      <PageHeader header="Clients">
        <Button
          variant="contained"
          onClick={() => setIsFormOpen(true)}
          startIcon={<Add />}
        >
          New Client
        </Button>
      </PageHeader>
      <DataTable
        columns={columns}
        rows={data?.data || []}
        rowCount={data?.meta?.totalRecords || 0}
        filters={filters}
        onFilter={handleFilter}
        loading={isLoading || isFetching}
      />
      <Form open={isFormOpen} setIsOpen={() => setIsFormOpen(false)} />
    </>
  )
}

export default Campaign
