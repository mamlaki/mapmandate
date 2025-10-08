import './App.css'
import Legend from './components/Legend'
import MapCanvas from './components/MapCanvas'
import { useStore } from './store'
import Toolbar from './components/Toolbar'
import Topbar from './components/Topbar'
import { PARTY_LABEL } from './utils/colors'

function App() {
  const selParty = useStore(s => s.selectedParty);
  const selRating = useStore(s => s.selectedRating);

  return (
    <div className='mind-h-screen p-4 md:p-6 text-zinc-900'>
      <header className='max-w-7xl mx-auto mb-4'>
        <h1 className='text-2xl font-extrabold'>MapMandate</h1>
        <p className='text-sm text-zinc-600'>Interactive U.S. Presidential Electoral Map</p>
      </header>
      <main className='max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_18rem] gap-4'>
        <section className='space-y-3'>
          <Topbar />
          <Toolbar />
          <MapCanvas />
        </section>
        <aside className='space-y-3'>
          <Legend />
          <div className='bg-white/90 rounded-xl shadow p-3'>
            <div className='font-semibold mb-2'>Current Brush</div>
            <div className='text-sm'>
              Party: <span className='font-semibold'>{PARTY_LABEL[selParty]}</span><br />
              Margin: <span className='font-semibold capitalize'>{selRating}</span>
            </div>
            <div className='mt-2 text-xs text-zinc-500'>
              Tip: Toggle <b>Log Mode</b> to lock/unlock by clicking states/tiles.
            </div>
          </div>
        </aside>
      </main>
      <footer className='max-7xl mx-auto mt-6 text-xs text-zinc-500'>
        EVs reflects 204 apportionment; 270 to win the presidency. Maine &amp; Nebraska allocate by congressional district (2 at-large + 1 per district).
      </footer>
    </div>
  )
}

export default App
