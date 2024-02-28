import axios, { CreateAxiosDefaults } from 'axios'
import toast from 'react-hot-toast'

export const defaultOptions: CreateAxiosDefaults = {
  baseURL: process.env.REACT_APP_API_ENDPOINT
}
export const defaultAxiosInstance = axios.create(defaultOptions)
export const getAxiosInstance = () => {
  const axiosInstance = defaultAxiosInstance

  axiosInstance.interceptors.request.use(async (request) => {
    const accessToken = window.sessionStorage.getItem('accessToken')

    if (accessToken) {
      request.headers.Authorization = `Bearer ${accessToken}`
    }

    return request
  })

  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error?.status === 401 || error?.response?.status === 401) {
        console.log('Hello')
        window.sessionStorage.clear()
        window.location.href = '/login'
      }
      if (error?.status === 429 || error?.response?.status === 429) {
        toast.error('Too many request attempted')
      }

      throw new Error(
        error?.data?.message ||
          error?.response?.data?.message ||
          error?.message ||
          'Something went wrong.'
      )
    }
  )
  return axiosInstance
}
