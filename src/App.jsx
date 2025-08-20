import React, { useMemo, useState } from 'react'
const DAYS = [
  { day: 1, title: "Windhoek → Krumhuk Guestfarm", start: "Flughafen Windhoek", end: "Krumhuk Guestfarm", distance: "~45 km", drive: "~40–50 Min", plan: ["Mietwagenübernahme","Fahrt zur Guestfarm","Nachmittag: Farmtour"], highlights: ["Ruhiger Start"], alt: ["Stopp in Windhoek"] },
  { day: 2, title: "Krumhuk → Bagatelle Kalahari", start: "Krumhuk", end: "Bagatelle Kalahari", distance: "~250 km", drive: "~3 h", plan: ["Morgens Abfahrt","Mittag: Ankunft","Nachmittags: Game Drive"], highlights: ["Kalahari-Dünen"], alt: [] }
];
function DayCard({ d }) {
  const [open,setOpen] = useState(false);
  return (<div className="rounded-2xl shadow p-5 bg-white/70 border">
    <div className="flex justify-between">
      <div><h3 className="text-xl font-semibold">Tag {d.day} – {d.title}</h3></div>
      <button onClick={()=>setOpen(!open)} className="text-sm border px-2">{open?"Schließen":"Details"}</button>
    </div>
    {open && <div className="mt-2">
      <p><b>Start:</b> {d.start} · <b>Ziel:</b> {d.end}</p>
      <p><b>Distanz:</b> {d.distance} · <b>Fahrtzeit:</b> {d.drive}</p>
      <h4 className="font-medium mt-2">Plan</h4>
      <ul className="list-disc ml-5">{d.plan.map((p,i)=><li key={i}>{p}</li>)}</ul>
    </div>}
  </div>);
}
export default function App() {
  const [query,setQuery] = useState("");
  const filtered = useMemo(()=>!query?DAYS:DAYS.filter(d=>(d.title+d.start+d.end).toLowerCase().includes(query.toLowerCase())),[query]);
  return (<div className="max-w-3xl mx-auto p-6">
    <h1 className="text-3xl font-bold mb-4">Namibia Roadbook 2025</h1>
    <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Suche..." className="border px-2 py-1 mb-4 w-full"/>
    <div className="space-y-4">{filtered.map(d=><DayCard key={d.day} d={d}/>)}</div>
  </div>);
}