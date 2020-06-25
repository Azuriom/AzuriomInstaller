import axios from 'axios';

interface DatabaseCredentials {
  host: string;
  port: number;
  database: string;
  user: string;
  password?: string;
}

interface DatabaseConfig {
  type: string;
  credentials?: DatabaseCredentials;
}

const client = axios.create({
  //baseURL: 'http://127.0.0.1:8000/install.php',
  baseURL: window.location.href,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
  },
});

export default {
  fetch() {
    return client.get('', {
      params: {
        action: 'info',
      },
    });
  },

  download() {
    return client.post('', {
      action: 'download',
    });
  },

  database(config: DatabaseConfig) {
    return client.post('', {
      ...config,
      action: 'database',
    });
  },

  config(game: string, data: object) {
    return client.post('', {
      ...data,
      action: 'config',
      game: game,
    });
  },
};
