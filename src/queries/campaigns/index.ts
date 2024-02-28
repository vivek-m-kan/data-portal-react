import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { CampaignService } from 'src/services/CampaignService'
import { Filters } from 'src/types/common'

export const useGetCampaigns = (filters: Filters) =>
  useQuery({
    queryKey: ['campaigns', filters],
    queryFn: async () => await CampaignService.getCampaigns(filters),
    placeholderData: keepPreviousData
  })

export const useGetCampaignById = (id: string) =>
  useQuery({
    queryKey: ['campaign_by_id', id],
    queryFn: async () => await CampaignService.getCampaignById(id)
  })
