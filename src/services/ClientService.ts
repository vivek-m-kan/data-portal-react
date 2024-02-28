import QueryString from 'qs'
import { getAxiosInstance } from 'src/configs/axios'
import { Filters } from 'src/types/common'

function removeEmpty(obj: any) {
  return Object.keys(obj || {}).reduce((x: any, k) => {
    if (obj[k]) {
      x[k] = obj[k]
    }
    return x
  }, {})
}

export class ClientService {
  static axios = getAxiosInstance()

  static async getClients(filters: Filters) {
    const validatedFilters = removeEmpty(filters)
    const query = QueryString.stringify(validatedFilters)

    const response = await this.axios.get(`/clients?${query}`)

    if (response.status === 200) {
      return response.data
    }
  }
}
