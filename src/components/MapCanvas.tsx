import cn from "classnames";
import { geoCentroid } from "d3-geo";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import statesTopo from 'us-atlas/states-10m.json' with { type: 'json' };

import { FIPS_TO_ABBR } from "../data/stateMeta";
import { EV_BY_STATE, SPLIT_UNITS, POLY_UNIT_FOR_STATE } from "../data/ev";
import { useStore } from "../store";
import { colorFor } from "../utils/colors";

const SPLIT_OFFSETS: Record<string, [number, number]> = {ME:[20, -10], NE:[20, 10] };

function StateLabel({ cx, cy, abbr, ev, locked }: {cx: number; cy: number; abbr: string; ev: number; locked: boolean}) {
  return (
    <g>
      <text
        x={cx}
        y={cy}
        textAnchor='middle'
        className='text-[9px] font-semibold fill-white text-shadow'
      >
        {abbr} {ev}
      </text>
      {locked && (
        <text
          x={cx}
          y={cy+10}
          textAnchor='middle'
          className='text-[8px] fill-white text-shadow'
        >
          🔒
        </text>
      )}
    </g>
  );
}

function SplitTiles({ abbr, cx, cy }: {abbr: string, cx: number, cy: number}) {
  const { map, paintUnit, toggleLockUnit, lockMode } = useStore();
  const parts = SPLIT_UNITS[abbr] ?? [];
  if (!parts.length) return null;

  const [ox, oy] = SPLIT_OFFSETS[abbr] ?? [18, 8];
  const size = 12, gap = 2;

  return (
    <g transform={`translate(${cx + ox},${cy + oy})`}>
      {parts.map((unit, idx) => {
        const st = map[unit];
        const fill = colorFor(st.party, st.rating);
        const x = idx * (size + gap);
        const onClick = (e: React.MouseEvent) => { e.stopPropagation(); lockMode ? toggleLockUnit(unit) : paintUnit(unit); };
        return (
          <g key={unit} className='cursor-pointer' onClick={onClick}>
            <rect 
              x={x} 
              width={size}
              height={size} 
              rx={2} 
              ry={2} 
              fill={fill} 
              stroke={st.locked ? 'var(--lock)' : 'white'}
              strokeWidth={st.locked ? 1.5 : 1}
            />
            <text
              x={x+size/2}
              y={size/2+3}
              textAnchor='middle'
              className='text-[8px] fill-white text-shadow'
            >
              {unit.endsWith('AL') ? 'AL' : unit.slice(-2)}
            </text>
          </g>
        );
      })}
    </g>
  )
}

function MapCanvas() {
  const { map, paintUnit, toggleLockUnit, lockMode, displayColorForStatePolygon,stateUnits } = useStore();

  const onStateClick = (abbr: string) => (e: React.MouseEvent) => {
    if (lockMode) { 
      stateUnits(abbr).forEach(u => toggleLockUnit(u)); 
      return;
    }
    const unit = (abbr in POLY_UNIT_FOR_STATE) ? POLY_UNIT_FOR_STATE[abbr] : abbr;
    paintUnit(unit);
  };

  return (
    <div className='bg-white/90 rounded-xl shadow p-2'>
      <ComposableMap projection='geoAlbersUsa' width={980} height={600}>
        <Geographies geography={statesTopo as any}>
          {({ geographies, projection }) => (
            <>
              {geographies.map((geo) => {
                const abbr = FIPS_TO_ABBR[geo.id as string];
                if (!abbr) return null;

                const disp = displayColorForStatePolygon(abbr);
                const fill = colorFor(disp.party, disp.rating);
                const centroid = geoCentroid(geo);
                const projected = projection(centroid);
                if (!projected) return null;
                const [cx, cy] = projected;
                const ev = EV_BY_STATE[abbr];
                const isLocked = stateUnits(abbr).some(u => map[u]?.locked);

                return (
                  <g key={abbr} className='cursor-pointer'>
                    <Geography 
                      geography={geo}
                      onClick={onStateClick(abbr)}
                      className={cn('outline-none focus:ring-2 focus:ring-black/40')}
                      style={{
                        default: { fill, stroke: '#FFFFFF', strokeWidth: 0.7, outline: 'none' },
                        hover: {fill, stroke: '#111827', strokeWidth: 1.1, outline: 'none'},
                        pressed: { fill, stroke: '#111827', strokeWidth: 1.1, outline: 'none' }
                      }}
                    />
                    <StateLabel 
                      cx={cx}
                      cy={cy}
                      abbr={abbr}
                      ev={ev}
                      locked={isLocked}
                    />
                    {abbr in SPLIT_UNITS ? <SplitTiles abbr={abbr} cx={cx} cy={cy}/> : null}
                  </g>
                )
              })}
            </>
          )}
        </Geographies>
      </ComposableMap>
    </div>
  )
}

export default MapCanvas
