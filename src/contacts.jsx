import React, { useMemo, useState } from 'react'

/** Erste Version der Kontakt-/Location-Sammlung.
 *  Fülle/ergänze einfach die Felder – du kannst beliebig Einträge hinzufügen.
 */
const CONTACTS = [
  // --- Notfall / Service ---
  {
    type: 'Notfall',
    name: 'Allgemeiner Notruf Namibia',
    city: 'landesweit',
    address: '',
    phone: '10111',
    email: '',
    website: '',
    mapQuery: '',
    notes: 'Polizei; Rettung in abgelegenen Gebieten vorab mit der Unterkunft abklären.'
  },
  {
    type: 'Service',
    name: 'AA Namibia (Pannenhilfe)',
    city: 'landesweit',
    address: '',
    phone: '+264 61 222 409',
    email: '',
    website: 'https://www.aa-namibia.com/',
    mapQuery: '',
    notes: 'Mit Mietwagenanbieter abklären, welche Nummer im Pannenfall gilt.'
  },

  // --- Unterkünfte (Beispiele aus eurer Route) ---
  {
    type: 'Unterkunft',
    name: 'Krumhuk Guestfarm',
    city: 'südlich von Windhoek',
    address: 'Krumhuk Farm, B1, ~25 km südlich Windhoek',
    phone: '',
    email: '',
    website: 'https://krumhuk.de/',
    mapQuery: 'Krumhuk Guest Farm Namibia',
    notes: 'Ruhiger Start, Farmtour möglich.'
  },
  {
    type: 'Unterkunft',
    name: 'Bagatelle Kalahari Game Ranch',
    city: 'nahe Mariental',
    address: '',
    phone: '',
    email: '',
    website: 'https://bagatelle-lodge.com/',
    mapQuery: 'Bagatelle Kalahari Game Ranch Namibia',
    notes: 'Game Drive / Sundowner in den roten Dünen.'
  },
  {
    type: 'Unterkunft',
    name: 'Garas Park (Quiver Tree Camp)',
    city: 'Keetmanshoop',
    address: 'B1, ~14 km nördlich Keetmanshoop',
    phone: '',
    email: '',
    website: '',
    mapQuery: 'Garas Park Quiver Tree Campsite',
    notes: 'Nähe Köcherbaumwald & Giant’s Playground.'
  },
  {
    type: 'Unterkunft',
    name: 'Canyon Roadhouse',
    city: 'Fish River Canyon (Hobas)',
    address: '',
    phone: '',
    email: '',
    website: 'https://gondwana-collection.com/',
    mapQuery: 'Canyon Roadhouse Namibia',
    notes: 'Kult-Lodge; Viewpoints bei Hobas.'
  },
  {
    type: 'Unterkunft',
    name: 'Zur Waterkant Guesthouse',
    city: 'Lüderitz',
    address: '',
    phone: '',
    email: '',
    website: '',
    mapQuery: 'Zur Waterkant Guest House Lüderitz',
    notes: 'Für Kolmanskop & Diaz Point.'
  },
  {
    type: 'Unterkunft',
    name: 'Namtib Desert Lodge',
    city: 'Tirasberge',
    address: '',
    phone: '',
    email: '',
    website: 'https://namtib.net/',
    mapQuery: 'Namtib Desert Lodge',
    notes: 'Fantastische Nachtsterne.'
  },
  {
    type: 'Unterkunft',
    name: 'Little Sossus (Campsite/Lodge)',
    city: 'Sesriem',
    address: '',
    phone: '',
    email: '',
    website: '',
    mapQuery: 'Little Sossus Namibia',
    notes: 'Perfekt für Sossusvlei/Deadvlei.'
  },
  {
    type: 'Unterkunft',
    name: 'Mirabib Campsite',
    city: 'Namib-Naukluft',
    address: 'Mitten im Park (Pistenanreise)',
    phone: '',
    email: '',
    website: '',
    mapQuery: 'Mirabib Campsite Namibia',
    notes: 'Sehr einsam; Nachtfotografie top.'
  },
  {
    type: 'Unterkunft',
    name: 'Driftwood Guesthouse',
    city: 'Swakopmund',
    address: '',
    phone: '',
    email: '',
    website: '',
    mapQuery: 'Driftwood Guesthouse Swakopmund',
    notes: 'Guter Basecamp-Spot für Aktivitäten.'
  },
  {
    type: 'Unterkunft',
    name: 'Elephant Rock Community Campsite',
    city: 'Uis / Ugab',
    address: '',
    phone: '',
    email: '',
    website: '',
    mapQuery: 'Elephant Rock Campsite Uis',
    notes: 'Wüstenelefanten ggf. mit Guide suchen.'
  },
  {
    type: 'Unterkunft',
    name: 'Ai-Aiba Rockpainting Lodge',
    city: 'Erongo',
    address: '',
    phone: '',
    email: '',
    website: 'https://www.ai-aiba-namibia.com/',
    mapQuery: 'Ai Aiba Rockpainting Lodge',
    notes: 'Felsmalereien; Granitkuppen.'
  },
]

function encodeMap(q) {
  return q ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}` : ''
}

function ItemCard({ c }) {
  const [open, setOpen] = useState(false)
  const telHref = c.phone ? `tel:${c.phone.replace(/\\s+/g,'')}` : null
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
        </div>
      )}
    </div>
  )
}

export default function Contacts() {
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('Alle')

  const filtered = useMemo(() => {
    const q = query.toLowerCase()
    return CONTACTS.filter(c => {
      const matchesText = [c.type, c.name, c.city, c.address, c.notes].filter(Boolean).join(' ').toLowerCase().includes(q)
      const matchesType = filter === 'Alle' || c.type === filter
      return matchesText && matchesType
    })
  }, [query, filter])

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2">Kontakte & Locations</h1>
      <p className="text-gray-600 mb-4">Adressen, Telefonnummern und hilfreiche Orte entlang eurer Route.</p>

      <div className="flex flex-col md:flex-row gap-2 md:items-center mb-4">
        <input
          value={query}
          onChange={e=>setQuery(e.target.value)}
          placeholder="Suche nach Name, Ort, Notiz…"
          className="w-full md:w-80 rounded-xl border px-4 py-2 bg-white/80 focus:outline-none"
        />
        <select value={filter} onChange={e=>setFilter(e.target.value)} className="rounded-xl border px-3 py-2 bg-white/80">
          <option>Alle</option>
          <option>Unterkunft</option>
          <option>Aktivität</option>
          <option>Service</option>
          <option>Notfall</option>
        </select>
      </div>

      <div className="grid gap-3">
        {filtered.map((c, i) => <ItemCard key={`${c.name}-${i}`} c={c} />)}
        {filtered.length === 0 && <p className="text-sm text-gray-500">Keine Treffer – Suchbegriff ändern oder Filter zurücksetzen.</p>}
      </div>
    </div>
  )
}
