import type { Hero } from "./heroes";

interface AllocationPosition {
  lat: number;
  lng: number;
}

export interface Allocation {
  heroes: Hero[];
  threatName: string;
  threatRank: string;
  position: AllocationPosition;
  duration: number;
}
export interface FailedAllocation {
  threatName: string;
  threatRank: string;
}
