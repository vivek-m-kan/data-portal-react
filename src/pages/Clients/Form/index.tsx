import React from 'react'
import { Close, Save } from '@mui/icons-material'
import {
  AppBar,
  Box,
  Button,
  Dialog,
  Grid,
  IconButton,
  Slide,
  Toolbar,
  Typography
} from '@mui/material'
import { TransitionProps } from '@mui/material/transitions'
import { FormProps, FormValues } from '../types'
import { RadioField, TextField } from 'src/components/inputs'
import { useForm } from 'react-hook-form'
import LoadingButton from 'src/components/General/LoadingButton'
import { schema } from './validation'

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />
})

const Form: React.FC<FormProps> = ({ open, setIsOpen }) => {
  const { control, reset, handleSubmit } = useForm<FormValues>({
    resolver: schema,
    mode: 'all'
  })
  const handleClose = () => {
    setIsOpen()
    reset()
  }

  const onSubmit = (values: FormValues) => {
    console.log('🚀 ~ onSubmit ~ values:: >>', values)
  }
  return (
    <Dialog fullScreen open={open} TransitionComponent={Transition}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <Close />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Create Client
            </Typography>
            <LoadingButton
              autoFocus
              color="inherit"
              type="submit"
              size="large"
              start={<Save />}
            >
              Save Changes
            </LoadingButton>
          </Toolbar>
        </AppBar>
        <Box
          sx={{
            display: 'flex',
            gap: 3,
            mt: 2,
            width: '100%',
            justifyContent: 'center'
          }}
        >
          <Box sx={{ display: 'flex', width: '50%' }}>
            <Grid container spacing={2}>
              <Grid item md={6}>
                <TextField
                  name="name"
                  label="Name"
                  control={control}
                  fieldProps={{ fullWidth: true }}
                />
              </Grid>
              <Grid item md={6}>
                <TextField
                  name="company_name"
                  label="Company Name"
                  control={control}
                  fieldProps={{ fullWidth: true }}
                />
              </Grid>

              <Grid item md={6}>
                <TextField
                  name="street"
                  label="Street"
                  control={control}
                  fieldProps={{ fullWidth: true }}
                />
              </Grid>
              <Grid item md={6}>
                <TextField
                  name="city"
                  label="City"
                  control={control}
                  fieldProps={{ fullWidth: true }}
                />
              </Grid>

              <Grid item md={6}>
                <TextField
                  name="state"
                  label="State"
                  control={control}
                  fieldProps={{ fullWidth: true }}
                />
              </Grid>
              <Grid item md={6}>
                <TextField
                  name="contry"
                  label="Contry"
                  control={control}
                  fieldProps={{ fullWidth: true }}
                />
              </Grid>

              <Grid item md={6}>
                <TextField
                  name="postal_code"
                  label="Postal Code"
                  control={control}
                  fieldProps={{ fullWidth: true }}
                />
              </Grid>
              <Grid item md={6}>
                <TextField
                  name="contact_number"
                  label="Contact Number"
                  control={control}
                  fieldProps={{ fullWidth: true }}
                />
              </Grid>
              <Grid item md={12}>
                <RadioField
                  name="status"
                  label="Status"
                  control={control}
                  options={[
                    { label: 'Active', value: 'active' },
                    { label: 'Inactive', value: 'inactive' }
                  ]}
                />
              </Grid>
            </Grid>
          </Box>
        </Box>
      </form>
    </Dialog>
  )
}

export default Form
