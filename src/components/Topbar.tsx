import { useStore } from "../store";

function Pill({label, value}: {label: string; value: number}) {
  return <div className='px-3 py-1.5 rounded-full bg-zinc-100 border text-sm'>
    <b>{label}</b><span className='ml-1 text-zinc-600'>{value}</span>
  </div>;
}

function Topbar() {
  const totals = useStore(s => s.totals)();
  const needed = 270;

  return (
    <div className='bg-white/90 rounded-xl shadow p-3 flex items-center gap-6'>
      <div className='text-lg font-bold'>Electoral Votes</div>
      <Pill label='D' value={totals.D} />
      <Pill label='R' value={totals.R} />
      <Pill label='Other' value={totals.O} />
      <Pill label='Und.' value={totals.U} />
      <div className='ml-auto text-sm text-zinc-600'>Need to win: <b>{needed}</b></div>
    </div>
  );
}

export default Topbar