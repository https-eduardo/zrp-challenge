import type { Hero } from './heroes';

export interface HistoryFetchResponse {
  data: History[];
  total: number;
}

interface History {
  id: number;
  heroes: Hero[];
  threatName: string;
  threatRank: string;
  finishDate: string;
  createdAt: string;
}
