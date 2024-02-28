import { Add, Delete, Edit } from '@mui/icons-material'
import { Badge, Button, IconButton, Typography } from '@mui/material'
import { GridColDef, GridRowId, GridRowSelectionModel } from '@mui/x-data-grid'
import { useQueryClient } from '@tanstack/react-query'
import moment from 'moment'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
import {
  ConfirmationDialog,
  DataTable,
  PageHeader
} from 'src/components/General'
import { ROUTES } from 'src/constants/routes'
import {
  useBulkDeleteCampaign,
  useDeleteCampaign
} from 'src/mutations/campaigns'
import { useGetCampaigns } from 'src/queries/campaigns'
import { Filters } from 'src/types/common'
import { CampaignObject } from './common'
import { Chip } from 'src/components/styled'
import ContextMenu from './Components/ContextMenu'
import { red } from '@mui/material/colors'

const Campaign = () => {
  // ** States
  const [filters, setFilters] = useState<Filters>({
    page: 1,
    limit: 10,
    search: '',
    sortField: 'created_at',
    sortOrder: 'desc'
  })
  const [campaignToDelete, setCampaignToDelete] =
    useState<CampaignObject | null>(null)
  const [bulkCampaignsToDelete, setBulkCampaignsToDelete] =
    useState<boolean>(false)
  const [selectedRows, setSelectedRows] = useState<GridRowId[]>([])

  const toastMessage = (error: unknown) => {
    if (error instanceof Error) {
      toast.error(error.message)
    } else {
      toast.error('Something went wrong')
    }
  }

  // ** Queries & Mutations
  const queryCLient = useQueryClient()
  const { data, error, isError, isLoading, isFetching, refetch } =
    useGetCampaigns(filters)
  const deleteMutation = useDeleteCampaign()
  const bulkDeleteMutation = useBulkDeleteCampaign()
  if (isError) {
    toastMessage(error)
  }

  // ** Functions
  const handleFilter = (incoming: Filters) => {
    const newFilters: Filters = {
      page: incoming?.page || filters.page,
      limit: incoming?.limit || filters.limit,
      search: incoming?.search !== undefined ? incoming.search : filters.search,
      sortField: incoming?.sortField || filters.sortField,
      sortOrder: incoming?.sortOrder || filters.sortOrder
    }

    if (incoming?.page && incoming.page !== filters.page) {
      setSelectedRows([])
    }

    queryCLient.refetchQueries({ queryKey: ['campaigns', newFilters] })

    setFilters(newFilters)
  }
  const handleDelete = async () => {
    if (campaignToDelete) {
      try {
        await deleteMutation.mutateAsync(campaignToDelete.id)
        setCampaignToDelete(null)
        queryCLient.refetchQueries({ queryKey: ['campaigns', filters] })
      } catch (error) {
        toastMessage(error)
      }
    } else if (bulkCampaignsToDelete) {
      try {
        await bulkDeleteMutation.mutateAsync(selectedRows as string[])
        setSelectedRows([])
        queryCLient.refetchQueries({ queryKey: ['campaigns', filters] })
        setBulkCampaignsToDelete(false)
        refetch()
      } catch (error) {
        toastMessage(error)
      }
    }
  }

  const [contextMenu, setContextMenu] = useState<{
    mouseX: number
    mouseY: number
  } | null>(null)

  const handleContextMenu = (event: React.MouseEvent) => {
    event.preventDefault()
    setContextMenu(
      contextMenu === null
        ? {
            mouseX: event.clientX + 2,
            mouseY: event.clientY - 6
          }
        : null
    )
  }

  const handleCloseContext = () => {
    setContextMenu(null)
  }

  // ** Columns
  const columns: GridColDef[] = [
    {
      flex: 0.7,
      field: 'name',
      headerName: 'Name',
      renderCell: ({ row }) => (
        <Typography
          onContextMenu={(event) => handleContextMenu(event)}
          style={{ cursor: 'context-menu' }}
        >
          {row.name}
        </Typography>
      )
    },
    {
      flex: 0.2,
      field: 'created_at',
      headerName: 'Created On',
      renderCell: ({ row }) => (
        <Typography>{moment(row.createdOn).format('DD/MM/YYYY')}</Typography>
      )
    },
    {
      flex: 0.3,
      field: 'creator',
      headerName: 'Created By',
      sortable: false,
      renderCell: ({ row }) => <Typography>{row.creator.name}</Typography>
    },
    {
      flex: 0.2,
      field: 'status',
      headerName: 'Status',
      sortable: false,
      renderCell: ({ row }) => (
        <Chip
          label={row.status ? 'Active' : 'In-active'}
          color={row.status ? 'success' : 'error'}
        />
      )
    },
    {
      flex: 0.15,
      field: 'id',
      headerName: '',
      sortable: false,
      renderHeader: () => (
        <>
          {selectedRows.length > 0 && (
            <IconButton
              size="small"
              color="error"
              sx={{ position: 'absolute' }}
              onClick={() => setBulkCampaignsToDelete(true)}
            >
              <Badge
                badgeContent={selectedRows.length}
                sx={{
                  '& .MuiBadge-badge': {
                    background: red[300],
                    color: red[50]
                  }
                }}
              >
                <Delete />
              </Badge>
            </IconButton>
          )}
        </>
      ),
      renderCell: ({ row }) => (
        <>
          <IconButton onClick={() => setCampaignToDelete(row)} color="error">
            <Delete />
          </IconButton>
          <IconButton
            component={Link}
            to={ROUTES.EDIT_CAMPAIGN.replace(':id', row.id)}
            color="info"
          >
            <Edit />
          </IconButton>
        </>
      )
    }
  ]

  return (
    <>
      <PageHeader header="Campaigns">
        <Button
          variant="contained"
          component={Link}
          to={ROUTES.CREATE_CAMPAIGN}
          startIcon={<Add />}
        >
          New Campaign
        </Button>
      </PageHeader>
      <DataTable
        columns={columns}
        rows={data?.data || []}
        rowCount={data?.meta?.totalRecords || 0}
        filters={filters}
        onFilter={handleFilter}
        loading={isLoading || isFetching}
        slotProps={{
          row: {
            onContextMenu: (e) => handleContextMenu(e)
          }
        }}
        onRowSelect={(selection: GridRowSelectionModel) =>
          setSelectedRows(selection)
        }
        search={filters.search}
      />
      <ContextMenu open={contextMenu} setIsOpen={handleCloseContext} />
      <ConfirmationDialog
        open={Boolean(campaignToDelete) || bulkCampaignsToDelete}
        setIsOpen={() => {
          setCampaignToDelete(null)
          setBulkCampaignsToDelete(false)
        }}
        title="Delete campaign?"
        description="This action will delete a campaign as softly you can find this into the trash"
        buttonTexts={{ yes: 'Delete', no: 'Cancel' }}
        buttonColors={{ yes: 'error', no: 'primary' }}
        loading={deleteMutation.isPending}
        loadingColor="error"
        callback={handleDelete}
      />
    </>
  )
}

export default Campaign
