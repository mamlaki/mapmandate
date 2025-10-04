import './App.css'

function App() {
  return (
    <div className='mind-h-screen p-4 md:p-6 text-zinc-900'>
      <header className='max-w-7xl mx-auto mb-4'>
        <h1 className='text-2xl font-extrabold'>MapMandate</h1>
        <p className='text-sm text-zinc-600'>Interactive U.S. Presidential Electoral Map</p>
      </header>
      <main className='max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_18rem] gap-4'>
        <section className='space-y-3'>
          <div className='bg-white/90 rounded-xl shadow p-3'>
            TOPBAR PLACEHOLDER
          </div>
          <div className='bg-white/90 rounded-xl shadow p-3'>
            TOOLBAR PLACEHOLDER
          </div>
          <div className='bg-white/90 rounded-xl shadow p-3 h-[600px]'>
            MAP PLACEHOLDER
          </div>
        </section>
        <aside className='space-y-3'>
          <div className='bg-white/90 rounded-xl shadow p-3'>
            LEGEND PLACEHOLDER
          </div>
        </aside>
      </main>
    </div>
  )
}

export default App
