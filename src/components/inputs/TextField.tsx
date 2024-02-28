import { Cancel, CheckCircle } from '@mui/icons-material'
import {
  TextFieldProps as MuiTextFieldProps,
  TextField as MuiTextField,
  InputAdornment,
  Tooltip,
  Typography
} from '@mui/material'
import { Control, Controller, ControllerProps } from 'react-hook-form'

interface TextFieldProps {
  controllerProps?: Omit<ControllerProps, 'render, rules'>
  fieldProps?: MuiTextFieldProps
  control: Control<any>
  name: string
  label: string
  required?: boolean
}

export const TextField: React.FC<TextFieldProps> = ({
  control,
  name,
  label,
  required = false,
  controllerProps,
  fieldProps
}) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={{ required }}
      render={({
        field: { value, onBlur, onChange },
        fieldState: { error, isDirty }
      }) => (
        <MuiTextField
          id="outlined-required"
          name={name}
          label={label}
          defaultValue={value || ''}
          onBlur={onBlur}
          onChange={onChange}
          {...fieldProps}
          InputProps={
            isDirty
              ? {
                  endAdornment: (
                    <InputAdornment position="end">
                      <Tooltip
                        title={<Typography>{error?.message}</Typography>}
                        placement="right-end"
                      >
                        {error ? (
                          <Cancel color="error" />
                        ) : (
                          <CheckCircle color="success" />
                        )}
                      </Tooltip>
                    </InputAdornment>
                  )
                }
              : undefined
          }
          error={isDirty && Boolean(error)}
          color={isDirty && !error ? 'success' : undefined}
        />
      )}
      {...controllerProps}
    />
  )
}
