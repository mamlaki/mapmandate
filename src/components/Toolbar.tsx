import { useStore } from '../store';
import type { Party, Rating } from '../types';
import cn from 'classnames';

const partyBtns: { id: Party; label: string }[] = [
  { id: 'D', label: 'Dem' },
  { id: 'R', label: 'Rep' },
  { id: 'O', label: 'Other' },
  { id: 'U', label: 'Undec'}
];

const ratingBtns: { id: Rating; label: string }[] = [
  { id: 'safe', label: 'Safe' },
  { id: 'likely', label: 'Likely' },
  { id: 'lean', label: 'Lean'},
  { id: 'tilt', label: 'Tilt'},
  { id: 'tossup', label: 'Toss-Up'}
];

function Toolbar() {
  const {
    selectedParty,
    setBrushParty,
    selectedRating,
    setBrushRating,
    undo,
    redo,
    reset,
    lockMode,
    toggleLockMode,
    thresholds
  } = useStore();

  return (
    <div className='flex flex-wrap items-center gap-3 p-3 bg-white/90 rounded-xl shadow'>
      <div className='flex items-center gap-2'>
        <span className='text-sm font-medium text-zinc-700'>Party: </span>
        {partyBtns.map(b => (
          <button 
            key={b.id} 
            onClick={()=>setBrushParty(b.id)}
            className={cn('px-2.5 py-1 rounded-md text-sm border',
              b.id===selectedParty 
              ? 'bg-zinc-900 text-white border-zinc-900'
              : 'bg-white hover:bg-zinc-100 border-zinc-300'
            )}
          >
            {b.label}
          </button>
        ))}
      </div>

      <div className='flex items-center gap-2'>
        <span className='text-sm font-medium text-zinc-700'>Margin:</span>
        {ratingBtns.map(b => (
          <button
            key={b.id}
            onClick={()=>setBrushRating(b.id)}
            className={cn('px-2.5 py-1 rounded-md text-sm border',
              b.id === selectedRating
              ? 'bg-zinc-900 text-white border-zinc-900'
              : 'bg-white hover:bg-zinc-100 border-zinc-300'
            )}
          >
            {b.label}
          </button>
        ))}
      </div>

      <div className='flex items-center gap-2'>
        <button 
          onClick={undo}
          className='px-2.5 py-1 rounded-md text-sm border bg-white hover:bg-zinc-100'
        >
          Undo
        </button>
        <button 
          onClick={redo}
          className='px-2.5 py-1 rounded-md text-sm border bg-white hover:bg-zinc-100'
        >
          Redo
        </button>
        <button 
          onClick={reset}
          className='px-2.5 py-1 rounded-md text-sm border bg-white hover:bg-zinc-100'
        >
          Reset
        </button>
      </div>

      <div className='ml-auto'>
        <button 
          onClick={toggleLockMode}
          className={cn('px-2.5 py-1 rounded-md text-sm border',
            lockMode 
            ? 'bg-yellow-500 text-white border-yellow-600'
            : 'bg-white hover:bg-zinc-100 border-zinc-300'
          )}
        >
          {lockMode ? 'Lock Mode: ON' : 'Lock Mode: OFF'}
        </button>
      </div>
      
      <div className='w-full text-xs text-zinc-500'>
          Default thresholds: Safe &ge; {thresholds.safe}, Likely {thresholds.likely}&ndash;{thresholds.safe-0.1}, Lean {thresholds.lean}&ndash;{thresholds.likely-0.1}, Tilt {thresholds.tilt}&ndash;{thresholds.lean-0.1}, Toss-up &lt; {thresholds.tilt}.
      </div>
    </div>
  )
}

export default Toolbar