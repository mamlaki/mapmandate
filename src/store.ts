import { create } from 'zustand';
import { produce } from 'immer';
import { 
  EV_BY_STATE,
  EV_BY_UNIT,
  STATE_TO_UNITS,
  POLY_UNIT_FOR_STATE,
  SPLIT_UNITS
} from './data/ev'; 
import type {
  MapState,
  Party,
  Rating,
  PartyTotals,
  UnitId,
  Thresholds,
} from './types';

const DEFAULT_THRESHOLDS: Thresholds = {
  safe: 15, likely: 8, lean: 4, tilt: 1
};

function initialMap(): MapState {
  const state: MapState = {};
  Object.keys(EV_BY_STATE).forEach(abbr => {
    if (abbr in SPLIT_UNITS) {
      SPLIT_UNITS[abbr].forEach(unit => (state[unit] = { party: 'U', rating: 'tossup', locked: false}));
    } else {
      state[abbr] = { party: 'U', rating: 'tossup', locked: false};
    }
  });
  return state;
}

const clone = (m: MapState): MapState => JSON.parse(JSON.stringify(m));

interface StoreState {
  map: MapState;
  thresholds: Thresholds;
  selectedParty: Party;
  selectedRating: Rating;
  lockMode: boolean;
  past: MapState[];
  future: MapState[];

  setBrushParty: (p: Party) => void;
  setBrushRating: (r: Rating) => void;
  toggleLockMode: () => void;

  paintUnit: (unitId: UnitId, next?: Partial<{party: Party; rating: Rating}>) => void; 
  toggleLockUnit: (unitId: UnitId) => void;

  undo: () => void;
  redo: () => void;
  reset: () => void;

  totals: () => PartyTotals;
  displayColorForStatePolygon: (abbr: string) => { 
    party: Party;
    rating: Rating;
    locked: boolean;
  };

  stateUnits: (abbr: string) => UnitId[];
}

export const useStore = create<StoreState>((set, get) => ({
  map: initialMap(),
  thresholds: DEFAULT_THRESHOLDS,
  selectedParty: 'U',
  selectedRating: 'tossup',
  lockMode: false,
  past: [],
  future: [],

  setBrushParty: (p) => set({selectedParty: p}),
  setBrushRating: (r) => set({selectedRating: r}),
  toggleLockMode: () => set(s => ({ lockMode: !s.lockMode })),

  paintUnit: (unitId, next) => set(state => {
    const current = state.map[unitId];
    if (!current || current.locked) return {};
    const prev = clone(state.map);
    const party = next?.party ?? state.selectedParty;
    const rating = next?.rating ?? state.selectedRating;
    return produce(state, draft => {
      draft.past.push(prev);
      draft.future = [];
      draft.map[unitId]= { ...current, party, rating };
    });
  }),

  toggleLockUnit: (unitId: UnitId) => set(state => {
    const current = state.map[unitId];
    if (!current) return {};
    const prev = clone(state.map);
    return produce(state, draft => {
      draft.past.push(prev);
      draft.map[unitId].locked = !current.locked;
    });
  }),

  undo: () => set(state => {
    if (!state.past.length) return {};
    const prev = state.past[state.past.length - 1];
    const present = clone(state.map);
    return produce(state, draft => {
      draft.past.pop();
      draft.future.unshift(present);
      draft.map = prev;
    });
  }),

  redo: () => set(state => {
    if (!state.future.length) return {};
    const next = state.future[0];
    const present = clone(state.map);
    return produce(state, draft => {
      draft.future.shift();
      draft.past.push(present);
      draft.map = next;
    });
  }),

  reset: () => set(state => produce(state, draft => {
    draft.past.push(clone(state.map));
    draft.future = [];
    draft.map = initialMap();
  })),

  totals: () => {
    const map = get().map;
    const tally: PartyTotals = { D: 0, R: 0, O: 0, U: 0, total: 538 };
    Object.entries(map).forEach(([unit, st]) => { tally[st.party] += EV_BY_UNIT[unit] ?? 0; });
    return tally;
  },

  stateUnits: (abbr: string) => STATE_TO_UNITS[abbr] ?? [abbr],

  displayColorForStatePolygon: (abbr: string) => {
    if (abbr in POLY_UNIT_FOR_STATE) return get().map[POLY_UNIT_FOR_STATE[abbr]];
    return get().map[abbr];
  }
}));