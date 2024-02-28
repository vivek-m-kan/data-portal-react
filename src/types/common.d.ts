export interface Filters {
  page?: number
  limit?: number
  search?: string
  sortField?: string
  sortOrder?: 'asc' | 'desc' | null | undefined
}
