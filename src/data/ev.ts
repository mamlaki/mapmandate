export const EV_BY_STATE: Record<string, number> = {
  AL: 9,
  AK: 3,
  AZ: 11,
  AR: 6,
  CA: 54,
  CO: 10,
  CT: 7,
  DC: 3,
  DE: 3, 
  FL: 30,
  GA: 16,
  HI: 4,
  IA: 6,
  ID: 4,
  IL: 19,
  IN: 11,
  KS: 6,
  KY: 8,
  LA: 8,
  MA: 11, 
  MD: 10,
  ME: 4,
  MI: 15,
  MN: 10,
  MO: 10,
  MS: 6,
  MT: 4,
  NC: 16,
  ND: 3,
  NE: 5,
  NH: 4,
  NJ: 14,
  NM: 5,
  NV: 6,
  NY: 28,
  OH: 17,
  OK: 7,
  OR: 8,
  PA: 19,
  RI: 4,
  SC: 9,
  SD: 3,
  TN: 11,
  TX: 40,
  UT: 6,
  VA: 13,
  VT: 3,
  WI: 10,
  WA: 12,
  WV: 4,
  WY: 3
};

export const SPLIT_UNITS: Record<string, string[]> = {
  ME: ['ME-AL', 'ME-01', 'ME-02'],
  NE: ['NE-AL', 'NE-01', 'NE-02', 'NE-03']
};

export const EV_BY_UNIT: Record<string, number> = {
  ...Object.fromEntries(Object.keys(EV_BY_STATE).map(s => [s, EV_BY_STATE[s]])),
  'ME-AL': 2, 'ME-01': 1, 'ME-02': 1,
  'NE-AL': 2, 'NE-01': 1, 'NE-03': 1
};

export const POLY_UNIT_FOR_STATE: Record<string, string> = {
  ME: 'ME-AL', 
  NE: 'NE-AL'
};

export const STATE_TO_UNITS: Record<string, string[]> = Object.fromEntries(
  Object.keys(EV_BY_STATE).map(s => s in SPLIT_UNITS ? [s, SPLIT_UNITS[s]] : [s, [s]])
);