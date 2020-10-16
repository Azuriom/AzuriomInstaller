import FetchedStatus from '@/store/FetchedStatus';

export default class FetchedData {
  minPhpVersion = '';

  phpVersion = '';

  phpFullVersion = '';

  phpIniPath = '';

  path = '';

  file = '';

  htaccess = true;

  requirements!: object;

  compatible = false;

  status!: FetchedStatus;
}
