import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { FormValues } from 'src/pages/Campaign/common'
import { CampaignService } from 'src/services/CampaignService'

export const useDeleteCampaign = () =>
  useMutation({
    mutationFn: async (id: string) => await CampaignService.deleteCampaign(id),
    onSuccess: () => {
      toast.success('1 campaign deleted.')
    },
    onError: (error) => {
      toast.error(error.message)
    }
  })

export const useBulkDeleteCampaign = () =>
  useMutation({
    mutationFn: async (ids: string[]) =>
      await CampaignService.bulkDeleteCampaign(ids),
    onSuccess: (__, variables) => {
      toast.success(`${variables.length} campaigns deleted.`)
    },
    onError: (error) => {
      toast.error(error.message)
    }
  })

export const useUpdateCampaign = () =>
  useMutation({
    mutationFn: async ({ id, payload }: { id: string; payload: FormValues }) =>
      await CampaignService.updateCampaign(id, payload),
    onSuccess: () => {
      toast.success('The provided campaign updated successfully')
    },
    onError: (error) => {
      toast.error(error.message)
    }
  })
export const useCreateCampaign = () =>
  useMutation({
    mutationFn: async (payload: FormValues) =>
      await CampaignService.cerateCampaign(payload),
    onSuccess: () => {
      toast.success('Campaign created successfully')
    },
    onError: (error) => {
      toast.error(error.message)
    }
  })
