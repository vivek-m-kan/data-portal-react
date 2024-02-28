import { useForm } from 'react-hook-form'
import { RadioField, TextField } from 'src/components/inputs'
import { Box } from '@mui/material'
import LoadingButton from 'src/components/General/LoadingButton'
import { Save } from '@mui/icons-material'
import { FormProps, FormValues, schema } from '../common'
import { useCreateCampaign, useUpdateCampaign } from 'src/mutations/campaigns'
import { useNavigate } from 'react-router-dom'
import { toastMessage } from 'src/utils'

const Form: React.FC<FormProps> = ({ data, id }) => {
  const { control, handleSubmit } = useForm<FormValues>({
    mode: 'all',
    resolver: schema,
    defaultValues: data
  })

  const navigate = useNavigate()
  const updateMutation = useUpdateCampaign()
  const createMutation = useCreateCampaign()

  const onSubmit = async (values: FormValues) => {
    if (id) {
      try {
        await updateMutation.mutateAsync({ id, payload: values })
        navigate('/campaigns')
      } catch (error) {
        toastMessage(error)
      }
    } else {
      try {
        await createMutation.mutateAsync(values)
        navigate('/campaigns')
      } catch (error) {
        toastMessage(error)
      }
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box display="flex" flexDirection="column" gap={3} width="50%">
        <TextField control={control} name="name" label="Campaign Name" />
        <RadioField
          control={control}
          name="status"
          label="Status"
          options={[
            { label: 'Active', value: 'true' },
            { label: 'Inactive', value: 'false' }
          ]}
        />
        <Box display="flex" justifyContent="flex-end" width="100%">
          <LoadingButton
            start={<Save />}
            variant="contained"
            size="large"
            type="submit"
            loading={updateMutation.isPending}
          >
            Save Changes
          </LoadingButton>
        </Box>
      </Box>
    </form>
  )
}

export default Form
