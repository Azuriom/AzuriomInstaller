import FetchedStatus from '@/store/FetchedStatus';

export default class FetchedData {
  minPhpVersion = '';

  phpVersion = '';

  phpFullVersion = '';

  phpIniPath = '';

  path = '';

  file = '';

  htaccess = true;

  requirements!: Record<string, string>;

  compatible = false;

  status!: FetchedStatus;
}
