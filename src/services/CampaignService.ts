import QueryString from 'qs'
import { getAxiosInstance } from 'src/configs/axios'
import { FormValues } from 'src/pages/Campaign/common'
import { Filters } from 'src/types/common'

function removeEmpty(obj: any) {
  return Object.keys(obj || {}).reduce((x: any, k) => {
    if (obj[k]) {
      x[k] = obj[k]
    }
    return x
  }, {})
}

export class CampaignService {
  static axios = getAxiosInstance()

  static async getCampaigns(filters: Filters) {
    const validatedFilters = removeEmpty(filters)
    const query = QueryString.stringify(validatedFilters)

    const response = await this.axios.get(`/campaigns?${query}`)

    if (response.status === 200) {
      return response.data
    }
  }

  static async getCampaignById(id: string) {
    const response = await this.axios.get(`/campaigns/${id}`)

    if (response.status === 200) {
      return response.data.data
    }
  }

  static async updateCampaign(id: string, payload: FormValues) {
    const response = await this.axios.patch(`/campaigns/${id}`, payload)

    if (response.status === 200) {
      return response
    }
  }

  static async cerateCampaign(payload: FormValues) {
    const response = await this.axios.post(`/campaigns`, payload)

    if (response.status === 200) {
      return response
    }
  }

  static async deleteCampaign(id: string) {
    const response = await this.axios.delete(`/campaigns/${id}`)

    if (response.status === 204) {
      return response
    }
  }

  static async bulkDeleteCampaign(ids: string[]) {
    const response = await this.axios.delete(`/campaigns`, { data: ids })

    if (response.status === 204) {
      return response
    }
  }
}
