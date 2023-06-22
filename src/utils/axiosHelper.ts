import axios, { AxiosResponse, AxiosRequestConfig } from 'axios'
import prettyBytes from 'pretty-bytes'

axios.interceptors.request.use((request: any) => {
  request.customData = request.customData || {}
  request.customData.startTime = new Date().getTime()
  return request
})

function updateEndTime(response: any) {
  response.customData = response.customData || {}
  response.customData.time =
    new Date().getTime() - response.config.customData.startTime
  return response
}

axios.interceptors.response.use(updateEndTime, (e) => {
  return Promise.reject(updateEndTime(e.response))
})

interface CustomAxiosResponse<T = any> extends AxiosResponse<T> {
  customData?: {
    startTime: number
    time: number
  }
}

function getResponseDetails(response: CustomAxiosResponse<any>) {
  const responseStatus = response.status
  const responseTime = response.customData?.time
  const responseSize = prettyBytes(
    JSON.stringify(response.data).length +
      JSON.stringify(response.headers).length
  )
  const jsonResponse = JSON.stringify(response.data, null, 2)
  return { responseStatus, responseTime, responseSize, jsonResponse }
}

export type responseDetails = ReturnType<typeof getResponseDetails>

export { getResponseDetails }
export type { AxiosRequestConfig, CustomAxiosResponse }
export default axios
