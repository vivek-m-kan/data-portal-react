import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { ClientService } from 'src/services/ClientService'
import { Filters } from 'src/types/common'

export const useGetClients = (filters: Filters) =>
  useQuery({
    queryKey: ['clients', filters],
    queryFn: async () => await ClientService.getClients(filters),
    placeholderData: keepPreviousData
  })
