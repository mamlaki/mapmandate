export type Party = "D" | "R" | "O" | "U";
export type Rating = "safe" | "likely" | "lean" | "tilt" |"tossup";
export type UnitId = string;

export interface UnitState {
  party: Party;
  rating: Rating;
  locked: boolean;
}

export interface MapState {
  [unitId: UnitId]: UnitState;
}

export interface Thresholds {
  safe: number;
  likely: number;
  lean: number;
  tilt: number;
}

export type PartyTotals = {
  D: number;
  R: number;
  O: number;
  U: number;
  total: number;
}