import { Cancel, CheckCircle } from '@mui/icons-material'
import {
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
  RadioGroupProps,
  Box,
  Typography,
  Tooltip
} from '@mui/material'
import { Control, Controller, ControllerProps } from 'react-hook-form'

interface RadioOptions {
  label: string
  value: string | boolean | number
}

interface RadioFieldProps {
  controllerProps?: Omit<ControllerProps, 'render, rules'>
  fieldProps?: RadioGroupProps
  control: Control<any>
  name: string
  label: string
  required?: boolean
  options: RadioOptions[]
}

export const RadioField: React.FC<RadioFieldProps> = ({
  control,
  name,
  label,
  required = false,
  controllerProps,
  fieldProps,
  options
}) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={{ required }}
      render={({
        field: { value, onChange },
        fieldState: { error, isDirty }
      }) => (
        <Box
          sx={{
            display: 'flex',
            position: 'relative',
            alignItems: 'center',
            gap: 8,
            width: '100%',
            padding: '5px 12px',
            ...(error && { border: `2px solid #d32f2f`, borderRadius: 1 })
          }}
        >
          <FormLabel id="demo-form-control-label-placement">
            <Typography color={error ? 'error' : undefined}>{label}</Typography>
          </FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name={name}
            value={value}
            onChange={onChange}
            {...fieldProps}
          >
            {options.map((option, i) => (
              <FormControlLabel
                key={i}
                value={option.value}
                control={<Radio />}
                label={option.label}
              />
            ))}
          </RadioGroup>
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              transform: 'translateY(50%)',
              right: 13
            }}
          >
            {error && (
              <Tooltip title={error.message} placement="right-end">
                <Cancel color="error" />
              </Tooltip>
            )}
            {isDirty && !error && <CheckCircle color="success" />}
          </Box>
        </Box>
      )}
      {...controllerProps}
    />
  )
}
