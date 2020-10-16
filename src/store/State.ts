import FetchedData from '@/store/FetchedData';

export default class State {
  public loading = false;

  public data = new FetchedData();

  public phpIniPath?: string;

  public step = 'requirements';

  public errors: string[] = [];
}
