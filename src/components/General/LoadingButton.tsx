import { Button, ButtonProps, CircularProgress } from '@mui/material'

export interface LoadingButtonProps extends ButtonProps {
  children: React.ReactElement | string | number
  loading?: boolean
  end?: React.ReactNode
  start?: React.ReactNode
}

const LoadingButton: React.FC<LoadingButtonProps> = ({
  loading = false,
  end = undefined,
  start = undefined,
  style = {},
  size = 'small',
  children,
  ...rest
}) => {
  const Loader: React.ReactElement = (
    <CircularProgress data-testid="loading-button-icon" size={20} />
  )

  return (
    <Button
      endIcon={end && loading ? Loader : end}
      startIcon={start && loading ? Loader : start}
      sx={{ marginRight: '5px', ...style }}
      size={size}
      disabled={loading}
      data-testid="custom-loading-button"
      {...rest}
    >
      {!end && !start && loading ? Loader : children}
    </Button>
  )
}

export default LoadingButton
