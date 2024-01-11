export enum HeroRank {
  S = "S",
  A = "A",
  B = "B",
  C = "C",
}

export interface HeroPosition {
  lat: number;
  lng: number;
}

export interface HeroesForm {
  name: string;
  imageUrl?: string;
  rank: HeroRank;
  position: HeroPosition;
}

export interface Hero {
  id: number;
  name: string;
  imageUrl: string | null;
  rank: HeroRank;
  status: "AVAILABLE" | "UNAVAILABLE";
  latitude: number;
  longitude: number;
}

export interface HeroesFetchResponse {
  data: Hero[];
  total: number;
}
