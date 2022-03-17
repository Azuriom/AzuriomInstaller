import axios, { AxiosResponse } from 'axios'

export interface FetchedData {
  installerVersion: string
  minPhpVersion: string
  phpVersion: string
  phpFullVersion: string
  phpIniPath: string
  path: string
  file: string
  htaccess: boolean
  requirements: Record<string, boolean>
  compatible: boolean
  extracted?: boolean
}

const client = axios.create({
  baseURL: window.location.href,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
  },
})

export function baseFetch(): Promise<AxiosResponse> {
  return client.get('')
}

export function download(): Promise<AxiosResponse> {
  return client.post('', {
    action: 'download',
  })
}
