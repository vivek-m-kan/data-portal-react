import {
  Box,
  BoxProps,
  Divider,
  Typography,
  TypographyProps
} from '@mui/material'

interface PageHeaderProps {
  header: string | number
  headerProps?: TypographyProps
  children?:
    | React.ReactNode
    | React.ReactElement
    | JSX.Element
    | string
    | number
  wrapperProps?: BoxProps
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  children,
  header,
  headerProps,
  wrapperProps
}) => {
  return (
    <Box>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        {...wrapperProps}
      >
        <Typography variant="h4" padding="16px 0" {...headerProps}>
          {header}
        </Typography>
        {children}
      </Box>
      <Divider />
    </Box>
  )
}
