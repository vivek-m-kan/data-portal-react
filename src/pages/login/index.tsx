import { Box, Button, Container, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import { TextField } from 'src/components/inputs'
import { schema } from './validation'
import { FormValues } from './login'
import { useAuth } from 'src/hooks/useAuth'
import toast from 'react-hot-toast'

const Login = () => {
  const { control, handleSubmit } = useForm<FormValues>({
    mode: 'all',
    resolver: schema
  })

  const { login } = useAuth()

  const onSubmit = async (values: FormValues) => {
    await login(values, (error) => {
      toast.error(error)
    })
  }

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="calc(100vh - 100px)"
      // sx={(theme) => ({
      //   bgcolor: theme.palette.mode === 'dark' ? '#121212' : '#fff'
      // })}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          display="flex"
          flexDirection="column"
          gap={3}
          justifyContent="center"
          alignItems="center"
          padding={3}
          boxShadow={1}
          borderRadius={1}
          sx={(theme) => ({
            [theme.breakpoints.up('sm')]: {
              width: 500
            }
          })}
        >
          <Typography variant="h4" color="primary">
            Data Portal
          </Typography>
          <Box display="flex" flexDirection="column" gap={3} width="inherit">
            <TextField
              control={control}
              name="email"
              label="Email"
              fieldProps={{ fullWidth: true, type: 'email' }}
            />
            <TextField
              control={control}
              name="password"
              label="Password"
              fieldProps={{ fullWidth: true, type: 'password' }}
            />
          </Box>
          <Box display="flex" justifyContent="flex-end" width="100%">
            <Button variant="contained" size="large" type="submit">
              Login
            </Button>
          </Box>
        </Box>
      </form>
    </Box>
  )
}

export default Login
