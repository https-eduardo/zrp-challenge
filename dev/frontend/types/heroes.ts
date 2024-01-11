export interface Hero {
  id: number;
  name: string;
  imageUrl: string | null;
  rank: string;
  status: "AVAILABLE" | "UNAVAILABLE";
}

export interface HeroesFetchResponse {
  data: Hero[];
  total: number;
}
