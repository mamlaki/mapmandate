import type { Party, Rating } from "../types";

export function colorFor(party: Party, rating: Rating): string {
  if (party === 'U') return 'var(--undecided)';
  if (party === 'O') return 'var(--other)';

  const scale = party == 'D' 
  ? { 
    safe: 'var(--blue-safe)',
    likely: 'var(--blue-likely)',
    lean: 'var(--blue-lean)',
    tilt: 'var(--blue-tilt)',
    tossup: 'var(--blue-toss)' 
  }
  : {
    safe: 'var(--red-safe)',
    likely: 'var(--red-likely)',
    lean: 'var(--red-lean)',
    tilt: 'var(--red-tilt)',
    tossup: 'var(--red-toss)'
  };
  return scale[rating];
}

export const PARTY_LABEL: Record<Party, string> = {
  D: 'Democratic',
  R: 'Republican',
  O: 'Other',
  U: "undecided"
};