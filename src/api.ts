import { fetcher } from 'itty-fetcher'

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
  windows?: boolean
}

const client = fetcher({
  base: window.location.href,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
  },
  transformRequest(request) {
    return { ...request, url: `${request.url}?execute=php` }
  },
})

export function baseFetch(): Promise<FetchedData> {
  return client.get('')
}

export function download(): Promise<void> {
  return client.post('', {
    action: 'download',
  })
}
