import React, { useMemo, useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Protagonists from './Protagonists.jsx'
import contacts from './contacts.jsx'

const DAYS = [
  {
    day: 1,
    title: "Ankunft in Windhoek → Krumhuk Guestfarm",
    start: "Flughafen Windhoek (Hosea Kutako)",
    end: "Krumhuk Guestfarm",
    distance: "~45 km",
    drive: "~40–50 Min",
    plan: [
      "Ankunft Windhoek, Übernahme des Mietwagens",
      "Fahrt zur Krumhuk Guestfarm südlich der Hauptstadt",
      "Nachmittags Erholung oder kleine Farmtour"
    ],
    highlights: ["Erster Eindruck Namibia", "Ruhiger Start auf Farm"],
    alt: ["Abendessen in Windhoek möglich"]
  },
  {
    day: 2,
    title: "Krumhuk → Bagatelle Kalahari Game Ranch",
    start: "Krumhuk Guestfarm",
    end: "Bagatelle Kalahari",
    distance: "~250 km",
    drive: "~3 h",
    plan: [
      "Morgens Abfahrt Richtung Süden",
      "Fahrt durch die Kalahari-Savanne",
      "Nachmittags Game Drive in den roten Dünen",
    ],
    highlights: ["Kalahari-Dünen", "Sundowner Drive mit Wildtieren"],
    alt: []
  },
  {
    day: 3,
    title: "Bagatelle → Keetmanshoop → Garas Camp",
    start: "Bagatelle",
    end: "Garas Camp bei Keetmanshoop",
    distance: "~300 km",
    drive: "~3,5 h",
    plan: [
      "Fahrt über Mariental nach Keetmanshoop",
      "Besuch Köcherbaumwald & Giant’s Playground",
      "Weiterfahrt zum Garas Camp und Übernachtung"
    ],
    highlights: ["Köcherbaumwald", "Giant’s Playground"],
    alt: ["Spaziergang in Keetmanshoop Stadt"]
  },
  {
    day: 4,
    title: "Garas Camp → Fish River Canyon (Cañon Roadhouse)",
    start: "Garas Camp",
    end: "Cañon Roadhouse",
    distance: "~180 km",
    drive: "~2 h",
    plan: [
      "Gemütliche Fahrt Richtung Süden",
      "Nachmittags erster Blick in den Fish River Canyon",
      "Sundowner am Aussichtspunkt"
    ],
    highlights: ["Fish River Canyon", "Spektakuläre Sonnenuntergänge"],
    alt: []
  },
  {
    day: 5,
    title: "Fish River Canyon (Cañon Roadhouse)",
    start: "Cañon Roadhouse",
    end: "Cañon Roadhouse",
    distance: "lokal",
    drive: "kurz",
    plan: [
      "Ganzer Tag am Fish River Canyon",
      "Wanderung oder Scenic Drive",
      "Abends Rückkehr zum Roadhouse"
    ],
    highlights: ["Einer der größten Canyons der Welt"],
    alt: ["Ausflug zu Ai-Ais Hot Springs"]
  },
  {
    day: 6,
    title: "Fish River Canyon → Lüderitz",
    start: "Cañon Roadhouse",
    end: "Lüderitz",
    distance: "~400 km",
    drive: "~5 h",
    plan: [
      "Frühe Abfahrt über Seeheim und Aus",
      "Optional: Wildpferde bei Garub beobachten",
      "Nachmittags Ankunft in Lüderitz"
    ],
    highlights: ["Namib-Wüste Rand", "Wildpferde bei Aus", "Atlantikküste"],
    alt: []
  },
  {
    day: 7,
    title: "Lüderitz (Kolmanskop & Küste)",
    start: "Lüderitz",
    end: "Lüderitz",
    distance: "lokal",
    drive: "kurz",
    plan: [
      "Besuch der Geisterstadt Kolmanskop am Morgen",
      "Stadtrundgang Lüderitz",
      "Nachmittags Diaz Point und Küste erkunden"
    ],
    highlights: ["Kolmanskop", "Atlantikküste", "Frischer Fisch & Austern"],
    alt: []
  },
  {
    day: 8,
    title: "Lüderitz → Helmeringhausen",
    start: "Lüderitz",
    end: "Helmeringhausen",
    distance: "~300 km",
    drive: "~4 h",
    plan: [
      "Rückfahrt über Aus und kleine Schotterstraßen",
      "Nachmittags Ankunft Helmeringhausen (bekannt für Apfelkuchen)",
    ],
    highlights: ["Weite Wüstenlandschaft", "Kleiner Ort mit Charme"],
    alt: []
  },
  {
    day: 9,
    title: "Helmeringhausen → Sesriem",
    start: "Helmeringhausen",
    end: "Sesriem",
    distance: "~250 km",
    drive: "~4 h",
    plan: [
      "Fahrt durch die Namib-Wüste",
      "Nachmittags Besuch Sesriem Canyon"
    ],
    highlights: ["Namib-Wüste", "Sesriem Canyon"],
    alt: []
  },
  {
    day: 10,
    title: "Sossusvlei & Deadvlei (Übernachtung Sesriem)",
    start: "Sesriem",
    end: "Sesriem",
    distance: "~120 km (hin/retour im Park)",
    drive: "~2 h",
    plan: [
      "Frühe Einfahrt ins Sossusvlei",
      "Besteigung Düne 45 oder Big Daddy",
      "Besuch Deadvlei",
      "Nachmittags Relaxen oder Sundowner"
    ],
    highlights: ["Sossusvlei", "Deadvlei", "Dünenlandschaft"],
    alt: []
  },
  {
    day: 11,
    title: "Sesriem → Solitaire → Swakopmund",
    start: "Sesriem",
    end: "Swakopmund",
    distance: "~350 km",
    drive: "~5 h",
    plan: [
      "Fahrt über Solitaire (legendärer Apfelkuchen!)",
      "Über Gaub- und Kuiseb-Pass Richtung Küste",
      "Ankunft in Swakopmund am Nachmittag"
    ],
    highlights: ["Namib Naukluft Landschaft", "Solitaire", "Küstennebel"],
    alt: []
  },
  {
    day: 12,
    title: "Swakopmund & Walvis Bay (Sandwich Harbour Tour)",
    start: "Swakopmund",
    end: "Swakopmund",
    distance: "lokal",
    drive: "Tour mit Anbieter",
    plan: [
      "Halbtages- oder Ganztagestour nach Sandwich Harbour (Wüste trifft Ozean!)",
      "Stadterkundung Swakopmund",
      "Abendessen in einem Seafood-Restaurant"
    ],
    highlights: ["Sandwich Harbour", "Atlantikküste"],
    alt: ["Quadbiken, Wüstensafari"]
  },
  {
    day: 13,
    title: "Swakopmund → Spitzkoppe",
    start: "Swakopmund",
    end: "Spitzkoppe",
    distance: "~150 km",
    drive: "~2 h",
    plan: [
      "Fahrt ins Landesinnere",
      "Nachmittags Wanderung rund um die Spitzkoppe",
      "Sundowner am Felsen"
    ],
    highlights: ["Spitzkoppe – das Matterhorn Namibias"],
    alt: []
  },
  {
    day: 14,
    title: "Spitzkoppe → Brandberg",
    start: "Spitzkoppe",
    end: "Brandberg",
    distance: "~180 km",
    drive: "~2,5 h",
    plan: [
      "Fahrt Richtung Brandberg",
      "Wanderung zu den White Lady Felsmalereien"
    ],
    highlights: ["Brandbergmassiv", "San-Felszeichnungen"],
    alt: []
  },
  {
    day: 15,
    title: "Brandberg → Twyfelfontein",
    start: "Brandberg",
    end: "Twyfelfontein",
    distance: "~200 km",
    drive: "~3 h",
    plan: [
      "Fahrt durch das Damaraland",
      "Besuch der Felsgravuren von Twyfelfontein (UNESCO Welterbe)",
      "Besichtigung Organ Pipes & Burnt Mountain"
    ],
    highlights: ["Twyfelfontein", "Organ Pipes", "Wüstenelefanten (mit Glück)"],
    alt: []
  },
  {
    day: 16,
    title: "Twyfelfontein → Etosha Süd (Okaukuejo)",
    start: "Twyfelfontein",
    end: "Okaukuejo, Etosha Nationalpark",
    distance: "~350 km",
    drive: "~5 h",
    plan: [
      "Längere Fahrt Richtung Etosha",
      "Nachmittags erstes Gate-Drive im Park",
      "Abends Tiere am Wasserloch von Okaukuejo beobachten"
    ],
    highlights: ["Etosha Nationalpark", "Wasserloch Okaukuejo"],
    alt: []
  },
  {
    day: 17,
    title: "Etosha Nationalpark (Safari)",
    start: "Okaukuejo",
    end: "Okaukuejo",
    distance: "lokal im Park",
    drive: "selbst geplant",
    plan: [
      "Ganztägige Pirschfahrten im Etosha",
      "Tiere an Wasserlöchern beobachten"
    ],
    highlights: ["Elefanten, Löwen, Nashörner (mit Glück)"],
    alt: []
  },
  {
    day: 18,
    title: "Etosha → Waterberg Plateau",
    start: "Okaukuejo",
    end: "Waterberg Plateau Lodge",
    distance: "~300 km",
    drive: "~4 h",
    plan: [
      "Fahrt Richtung Otjiwarongo",
      "Nachmittags Wanderung auf dem Waterberg Plateau"
    ],
    highlights: ["Waterberg Plateau", "Wanderungen"],
    alt: []
  },
  {
    day: 19,
    title: "Waterberg → Windhoek",
    start: "Waterberg Plateau",
    end: "Windhoek",
    distance: "~300 km",
    drive: "~4 h",
    plan: [
      "Rückfahrt nach Windhoek",
      "Nachmittags letzte Einkäufe oder Stadtbesichtigung",
      "Abendessen in Joe’s Beerhouse"
    ],
    highlights: ["Windhoek Stadt"],
    alt: []
  },
  {
    day: 20,
    title: "Abflug ab Windhoek",
    start: "Windhoek",
    end: "Flughafen Windhoek (Hosea Kutako)",
    distance: "~45 km",
    drive: "~40 Min",
    plan: [
      "Fahrt zum Flughafen",
      "Mietwagenrückgabe",
      "Heimflug"
    ],
    highlights: ["Letzter Blick auf Namibia"],
    alt: []
  }
]

function DayCard({ d }) {
  const [open,setOpen] = useState(false);
  return (
    <div className="rounded-2xl shadow p-5 bg-white/70 border">
      <div className="flex justify-between">
        <div><h3 className="text-xl font-semibold">Tag {d.day} – {d.title}</h3></div>
        <button onClick={()=>setOpen(!open)} className="text-sm border px-2">{open?"Schließen":"Details"}</button>
      </div>
      {open && <div className="mt-2">
        <p><b>Start:</b> {d.start} · <b>Ziel:</b> {d.end}</p>
        <p><b>Distanz:</b> {d.distance} · <b>Fahrtzeit:</b> {d.drive}</p>
        <h4 className="font-medium mt-2">Tagesplan</h4>
        <ul className="list-disc ml-5">{d.plan.map((p,i)=><li key={i}>{p}</li>)}</ul>
        {d.highlights.length>0 && (<><h4 className="font-medium mt-2">Highlights</h4><ul className="list-disc ml-5">{d.highlights.map((h,i)=><li key={i}>{h}</li>)}</ul></>)}
        {d.alt.length>0 && (<><h4 className="font-medium mt-2">Alternativen</h4><ul className="list-disc ml-5">{d.alt.map((a,i)=><li key={i}>{a}</li>)}</ul></>)}
      </div>}
    </div>
  );
}

function Navbar() {
  return (
    <nav className="flex gap-4 mb-6 border-b pb-2">
      <Link to="/" className="hover:underline">Roadbook</Link>
      <Link to="/protagonists" className="hover:underline">Protagonisten</Link>
      <Link to="/contacts" className="hover:underline">Infos</Link>   {/* neu */}
    </nav>
  )
}

function Roadbook() {
  const [query,setQuery] = useState("")
  const filtered = useMemo(()=>!query?DAYS:DAYS.filter(d=>(d.title+d.start+d.end).toLowerCase().includes(query.toLowerCase())),[query])
  return (
    <>
      <h1 className="text-3xl font-bold mb-4">Namibia Roadbook 2025</h1>
      <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Suche..." className="border px-2 py-1 mb-4 w-full"/>
      <div className="space-y-4">{filtered.map(d=><DayCard key={d.day} d={d}/>)}</div>
    </>
  )
}

export default function App() {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <Navbar />
      <Routes>
        <Route path="/" element={<Roadbook />} />
        <Route path="/protagonists" element={<Protagonists />} />
	<Route path="/contacts" element={<Contacts />} />   {/* neu */}
      </Routes>
    </div>
  )
}