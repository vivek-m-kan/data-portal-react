export interface FormProps {
  open: boolean
  setIsOpen: () => void
}

export interface ClientObject {
  name: string
  company_name: string
  street: string
  city: string
  state: string
  country: string
  postal_code: string
  contact_number: string
  status: 'active' | 'inactive'
  creator: string | null
}

export interface FormValues {
  name: string
  company_name: string
  street: string
  city: string
  state: string
  country: string
  postal_code: string
  contact_number: string
}
