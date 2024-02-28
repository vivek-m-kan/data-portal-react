import { auth, defaultAxiosInstance, getAxiosInstance } from 'src/configs'
import { FormValues } from 'src/pages/login/login'

export class AuthService {
  static axios = defaultAxiosInstance
  static authAxios = getAxiosInstance()

  static async getMe() {
    const response = await this.authAxios.get(auth.meEndpoint)

    if (response.status === 200) {
      return response.data
    }
  }

  static async login(payload: FormValues) {
    const response = await this.axios.post(auth.loginEndpoint, payload)

    if (response.status === 200) {
      return response.data
    }
  }

  static async logout() {
    const response = await this.authAxios.post(auth.logoutEndpoint)

    if (response.status === 200) {
      return response.data
    }
  }
}
