import { PageHeader } from 'src/components/General'
import Form from '../Components/Form'
import { useGetCampaignById } from 'src/queries/campaigns'
import { useNavigate, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import { CircularProgress } from '@mui/material'

const EditCampaign = () => {
  const params = useParams()
  const navigate = useNavigate()
  if (!params.id) {
    navigate('/campaigns')
    toast.error('Please select the appropriate campaign to edit')
  }

  const { isFetching, isError, error, data } = useGetCampaignById(
    params.id as string
  )

  if (isError) {
    navigate('/campaigns')
    toast.error(error.message)
  }

  return (
    <>
      <PageHeader header="Edit Campaign" />
      {isFetching ? (
        <CircularProgress />
      ) : (
        <Form
          data={{ name: data?.name, status: data?.status?.toString() }}
          id={data?.id}
        />
      )}
    </>
  )
}

export default EditCampaign
