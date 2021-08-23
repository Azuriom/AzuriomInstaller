import axios, { AxiosResponse } from 'axios';

const client = axios.create({
  baseURL: window.location.href,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
  },
});

export default {
  fetch(): Promise<AxiosResponse> {
    return client.get('', {
      params: {
        action: 'info',
      },
    });
  },

  download(): Promise<AxiosResponse> {
    return client.post('', {
      action: 'download',
    });
  },
};
