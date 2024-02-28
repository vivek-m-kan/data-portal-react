import { Cancel, CheckCircle } from '@mui/icons-material'
import {
  TextFieldProps as MuiTextFieldProps,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent
} from '@mui/material'
import { Control, Controller, ControllerProps } from 'react-hook-form'

interface SelectOptions {
  label: string
  value: string | number
}

interface TextFieldProps {
  controllerProps?: Omit<ControllerProps, 'render, rules'>
  fieldProps?: MuiTextFieldProps
  control: Control<any>
  name: string
  label: string
  required?: boolean
  options: SelectOptions[]
}

export const TextField: React.FC<TextFieldProps> = ({
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
        field: { value, onBlur, onChange },
        fieldState: { error, isDirty }
      }) => (
        <>
          <InputLabel id="demo-simple-select-label">Age</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={value}
            label="Age"
            onChange={onChange}
            onBlur={onBlur}
          >
            {options.map((option, i) => (
              <MenuItem value={option.value}>{option.label}</MenuItem>
            ))}
          </Select>
        </>
      )}
      {...controllerProps}
    />
  )
}
