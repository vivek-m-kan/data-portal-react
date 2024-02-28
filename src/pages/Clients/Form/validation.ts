import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

export const schema = zodResolver(
  z.object({
    name: z
      .string({ required_error: 'Please enter client name' })
      .max(100, { message: 'You can add name up to 100 chars' })
      .min(1, { message: 'Client name is requiered' }),
    company_name: z
      .string()
      .max(100, { message: 'You can add name up to 100 chars' })
      .min(1, { message: 'Client name is requiered' })
  })
)
