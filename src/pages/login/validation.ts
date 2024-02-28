import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

export const schema = zodResolver(
  z.object({
    email: z
      .string({ required_error: 'Please enter the email' })
      .email({ message: 'Please enter a valid email' }),
    password: z.string({ required_error: 'Please enter the password' })
  })
)
