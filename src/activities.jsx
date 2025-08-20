import React, { useMemo, useState } from 'react'

/** Erste Version der Activities-Sammlung. */
const ACTIVITIES = [
  {
  type: 'Aktivität',
  name: 'Fish River Canyon – Fotospots',
  city: 'Hobas / Viewpoints',
  address: 'Fish River Canyon Viewpoints (Hobas)',
  notes: 'Beste Lichtstimmung meist nachmittags bis Sonnenuntergang.',
  sections: [
    {
      title: 'Fotgrafie Tipps',
      items: [
        {
		order: 1,
		label: 'trulla'}
	],
    },
    {
      title: 'Ideale Fotospots',
      items: [
        {
          order: 1,
          label: 'Main Viewpoint (Hobas / Fish River Canyon Viewpoint)',
          notes: [
            'Klassisches Postkartenmotiv mit der großen Flussschleife.',
            'Perfekt für Sonnenuntergangsfotos.'
          ],
          mapQuery: 'Fish River Canyon Main Viewpoint Hobas'
        },
        {
          order: 2,
          label: 'Sunset Viewpoint (ca. 10 Min westlich)',
          notes: [
            'Weniger Besucher, breiter Blick auf die Schlucht.',
            'Ideal ab 16 Uhr bis Sonnenuntergang.'
          ],
          mapQuery: 'Fish River Canyon Sunset Viewpoint'
        },
        {
          order: 3,
          label: 'Punkte entlang der Rim Road',
          notes: [
            'Mehrere kleine Haltepunkte zwischen Hobas und Main View.',
            'Für Detailaufnahmen mit Teleobjektiv (Schichten, Felsformationen).'
          ],
          mapQuery: 'Fish River Canyon Rim Road Viewpoints'
        }
      ]
    }
  ]
},


  {
    type: 'Aktivität',
    name: 'Sandwich Harbour 4x4 Tour',
    city: 'Walvis Bay / Swakopmund',
    address: 'Abholung i. d. R. Walvis Bay',
    phone: '',
    email: '',
    website: '',
    mapQuery: 'Sandwich Harbour Walvis Bay',
    notes: 'Fix einplanen – Dünen treffen auf Atlantik.'
  },
  {
    type: 'Aktivität',
    name: 'Living Desert Tour',
    city: 'Swakopmund',
    address: '',
    phone: '',
    email: '',
    website: '',
    mapQuery: 'Living Desert Tour Swakopmund',
    notes: 'Kleintiere der Wüste (Chamäleon, Geckos, …).'
  },
]

function encodeMap(q) {
  return q ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}` : ''
}

function ItemCard({ c }) {
  const [open, setOpen] = useState(false)
  const telHref = c.phone ? `tel:${c.phone.replace(/\s+/g,'')}` : null
  const mailHref = c.email ? `mailto:${c.email}` : null
  const mapHref = encodeMap(c.mapQuery || c.address || `${c.name} ${c.city}`)

  return (
    <div className="rounded-2xl shadow p-4 bg-white/70 border">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-sm uppercase tracking-wide text-gray-500">{c.type}</div>
          <h3 className="text-lg font-semibold">{c.name}</h3>
          <p className="text-sm text-gray-600">{[c.city, c.address].filter(Boolean).join(' · ')}</p>
        </div>
        <button onClick={()=>setOpen(!open)} className="text-sm px-3 py-1 rounded-full border hover:bg-gray-50">
          {open ? 'Details schließen' : 'Details öffnen'}
        </button>
      </div>

      {open && (
        <div className="mt-3 text-sm space-y-2">
          {c.phone && <p><span className="font-medium">Telefon:</span> <a className="underline" href={telHref}>{c.phone}</a></p>}
          {c.email && <p><span className="font-medium">E-Mail:</span> <a className="underline" href={mailHref}>{c.email}</a></p>}
          {c.website && <p><span className="font-medium">Website:</span> <a className="underline" href={c.website} target="_blank" rel="noreferrer">{c.website}</a></p>}
          {mapHref && <p><span className="font-medium">Karte:</span> <a className="underline" href={mapHref} target="_blank" rel="noreferrer">In Google Maps öffnen</a></p>}
          {c.notes && <p><span className="font-medium">Notizen:</span> {c.notes}</p>}

          {Array.isArray(c.sections) && c.sections.length > 0 && (
            <div className="mt-4 space-y-4">
              {c.sections.map((sec, sIdx) => (
                <div key={sIdx}>
                  <h4 className="font-medium mb-2">{sec.title}</h4>
                  <ol className="list-decimal ml-6 space-y-2">
                    {sec.items?.slice().sort((a,b)=>(a.order??999)-(b.order??999)).map((it, iIdx) => {
                      const pointHref = encodeMap(it.mapQuery || it.label || '')
                      return (
                        <li key={iIdx}>
                          <div className="font-semibold">{it.label}</div>
                          {Array.isArray(it.notes) && it.notes.length > 0 && (
                            <ul className="list-disc ml-5 mt-1">
                              {it.notes.map((n, nIdx) => <li key={nIdx}>{n}</li>)}
                            </ul>
                          )}
                          {it.mapQuery && (
                            <div className="mt-1">
                              <a className="underline text-sm" href={pointHref} target="_blank" rel="noreferrer">
                                In Google Maps öffnen
                              </a>
                            </div>
                          )}
                        </li>
                      )
                    })}
                  </ol>
                </div>
              ))}
            </div>
          )}
          {/* --- Ende Section-Liste --- */}       

 </div>
      )}
    </div>
  )
}

export default function Activities() {
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('Alle')

  const filtered = useMemo(() => {
    const q = query.toLowerCase()
    return ACTIVITIES.filter(c => {
      const matchesText = [c.type, c.name, c.city, c.address, c.notes].filter(Boolean).join(' ').toLowerCase().includes(q)
      const matchesType = filter === 'Alle' || c.type === filter
      return matchesText && matchesType
    })
  }, [query, filter])

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2">Aktivitäten</h1>
      <p className="text-gray-600 mb-4">Touren & Erlebnisse entlang eurer Route.</p>

      <div className="flex flex-col md:flex-row gap-2 md:items-center mb-4">
        <input
          value={query}
          onChange={e=>setQuery(e.target.value)}
          placeholder="Suche nach Name, Ort, Notiz…"
          className="w-full md:w-80 rounded-xl border px-4 py-2 bg-white/80 focus:outline-none"
        />
        <select value={filter} onChange={e=>setFilter(e.target.value)} className="rounded-xl border px-3 py-2 bg-white/80">
          <option>Alle</option>
          <option>Aktivität</option>
        </select>
      </div>

      <div className="grid gap-3">
        {filtered.map((c, i) => <ItemCard key={`${c.name}-${i}`} c={c} />)}
        {filtered.length === 0 && <p className="text-sm text-gray-500">Keine Treffer – Suchbegriff ändern oder Filter zurücksetzen.</p>}
      </div>
    </div>
  )
}
