import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

export const schema = zodResolver(
  z.object({
    name: z
      .string({ required_error: 'Campaign name is requiered' })
      .max(100, { message: 'You can add name up to 100 chars' })
      .min(1, { message: 'Campaign name is requiered' }),
    status: z.string({ required_error: 'Status is required' })
  })
)

export interface CampaignObject {
  id: string
  name: string
  createdOn: string
  creator: {
    id: string
    name: string
    email: string
    created: string
  }
  status: boolean
}

export interface FormValues {
  name: string
  status: string
}

export interface FormProps {
  data?: FormValues
  id?: string
}
