import { colorFor } from "../utils/colors";

const rows = [
  { label: 'Safe', key: 'safe' as const },
  { label: 'Likely', key: 'likely' as const },
  { label: 'Lean', key: 'lean' as const },
  { label: 'Tilt', key: 'tilt' as const },
  { label: 'Toss-Up', key: 'tossup' as const}
];

function Legend() {
  return (
    <div className='bg-white/90 redounded-xl shadow p-3 w-64'>
      <div className='font-semibold mb-2'>Legend</div>
      <table className='w-full text-sm'>
        <thead>
          <tr className='text-left text-zinc-500'>
            <th className='py-1'>Rating</th>
            <th className='py-1'>D</th>
            <th className='py-1'>R</th>
            <th className='py-1'>Other</th>
            <th className='py-1'>Und.</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(r => (
            <tr key={r.key}>
              <td className='py-1'>{r.label}</td>
              <td><span className='inline-block w-5 h-3 rounded' style={{background: colorFor('D', r.key)}}/></td>
              <td><span className='inline-block w-5 h-3 rounded' style={{background: colorFor('R', r.key)}}/></td>
              <td>
                {r.key === 'tossup' ? <span className='inline-block w-5 h-3 rounded' style={{background: colorFor('O', 'tossup')}}/> : null}
              </td>
              <td>
                {r.key === 'tossup' ? <span className='inline-block w-5 h-3 rounded' style={{background: colorFor('U', 'tossup')}}/> : null}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-3 text-xs text-zinc-500">
          Maine/Nebraska: state colour reflects <em>et-large</em> winner.
      </div>
    </div>
  )
}


export default Legend;