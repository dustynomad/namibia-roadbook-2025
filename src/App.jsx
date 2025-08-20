import React, { useMemo, useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Protagonists from './Protagonists.jsx'
import Contacts from './contacts.jsx'     // <-- groß importieren
import Activities from './activities.jsx' // <-- groß importieren

const DAYS = [
  {
    day: 1,
    title: "Ankunft in Windhoek → Krumhuk Guestfarm",
    start: "Flughafen Windhoek (Hosea Kutako)",
    end: "Krumhuk Guestfarm",
    distance: "~45 km",
    drive: "~40–50 Min",
    map: {
	embed: "https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d117830.87205297453!2d17.077474860882663!3d-22.645780407110703!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e6!4m5!1s0x1c0b073c41ae1da1%3A0x4236762f58848efa!2sSafari%20Car%20Rental%2C%20Kappsfarm%2C%20Namibia!3m2!1d-22.5477217!2d17.253061!4m5!1s0x1c0b12234729fc19%3A0xccc4272e92645962!2sKrumhuk%2C%20P.O.Box%202630%2C%20Windhoek%2C%20Namibia!3m2!1d-22.743655!2d17.072954!5e0!3m2!1sde!2sch!4v1755700593607!5m2!1sde!2sch"
},
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
   map: {
	embed:  [
    "https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d936300.0313028485!2d16.899995978892644!3d-23.553282756449562!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e6!4m5!1s0x1c0b12234729fc19%3A0xccc4272e92645962!2sKrumhuk%2C%20P.O.Box%202630%2C%20Windhoek%2C%20Namibia!3m2!1d-22.743655!2d17.072954!4m5!1s0x1c0de3003bb57e57%3A0xe5660b2261b62c8f!2sBagatelle%20Kalahari%20Game%20Ranch%20Campsites%2C%20Namibia!3m2!1d-24.2911492!2d18.0277721!5e0!3m2!1sde!2sch!4v1755702586039!5m2!1sde!2sch"
  ]
},
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
map: {
  embeds: [
    "https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d922980.4497998086!2d17.349120526631253!3d-25.358162710199462!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e0!4m5!1s0x1c0de213193d679f%3A0x6f54664e072437e!2sBagatelle%20Kalahari%20Game%20Ranch%2C%20Mariental%2C%20Namibia!3m2!1d-24.300519899999998!2d18.0330066!4m5!1s0x1c1699a81dd74323%3A0xa7cf4e866221b827!2sGaras%20Park%20Camp%20-%20Quivertree%20Park%20Camp%2C%20Keetmanshoop%2C%20Namibia!3m2!1d-26.418754399999997!2d18.1904304!5e0!3m2!1sde!2sch!4v1755703378468!5m2!1sde!2sch",
   
"https://www.google.com/maps/embed?pb=!1m34!1m12!1m3!1d114273.65309576788!2d18.127897193750943!3d-26.486281499569987!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m19!3e0!4m5!1s0x1c1699a81dd74323%3A0xa7cf4e866221b827!2sGaras%20Park%20Camp%20-%20Quivertree%20Park%20Camp%2C%20Keetmanshoop%2C%20Namibia!3m2!1d-26.418754399999997!2d18.1904304!4m5!1s0x1c1690c29f6f03d5%3A0x905dff10ec36a813!2sGiant&#39;s%20Playground%2C%20Namibia!3m2!1d-26.465821!2d18.2718009!4m5!1s0x1c1685985f839e6d%3A0xd5779f3af323374b!2sQuiver%20Tree%20Forest%2C%20M29%2C%20Keetmanshoop%2C%20Namibia!3m2!1d-26.478888299999998!2d18.2384381!5e0!3m2!1sde!2sch!4v1755705118353!5m2!1sde!2sch"

  ],
  dir: {
    origin: "Bagatelle Kalahari Game Ranch, Namibia",
    destination: "Garas Park Camp - Quivertree Park Camp, Keetmanshoop",
    waypoints: [
      "Quiver Tree Forest, Namibia",
      "Giant's Playground, Namibia"
    ]
  }
},
    plan: [
      "Fahrt über Mariental ins Garas Camp",
      "Besuch Köcherbaumwald & Giant’s Playground",
      "Rückfahrt zum Garas Camp und Übernachtung",	
    ],
    highlights: ["Köcherbaumwald", "Giant’s Playground"],
    alt: ["Spaziergang in Keetmanshoop Stadt", "Besuch vom Köcherbaumwald & Giant's Playground am Tag 4"]
  },
  {
    day: 4,
    title: "Garas Camp → Fish River Canyon (Cañon Roadhouse) --> Activities",
    start: "Garas Camp",
    end: "Cañon Roadhouse",
    distance: "~180 km",
    drive: "~2 h",
 map: {
	embed:  [
"https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d910340.9989927384!2d17.345361636977415!3d-26.96628093149138!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e0!4m5!1s0x1c1699a81dd74323%3A0xa7cf4e866221b827!2sGaras%20Park%20Camp%20-%20Quivertree%20Park%20Camp%2C%20Keetmanshoop%2C%20Namibia!3m2!1d-26.418754399999997!2d18.1904304!4m5!1s0x1c3e1d74933b20a9%3A0xc10f2ec8410425ab!2sCanyon%20Roadhouse%2C%20Gondwana%20Collection%20Namibia%2C%20Namibia!3m2!1d-27.5242786!2d17.814786899999998!5e0!3m2!1sde!2sch!4v1755705473686!5m2!1sde!2sch"
]
},
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
    title: "Fish River Canyon (Cañon Roadhouse) --> Activities",
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
    title: "Fish River Canyon → Lüderitz --> Activities",
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
      {open && 
	<div className="mt-2">
	        <p><b>Start:</b> {d.start} · <b>Ziel:</b> {d.end}</p>
        	<p><b>Distanz:</b> {d.distance} · <b>Fahrtzeit:</b> {d.drive}</p>
	        <h4 className="font-medium mt-2">Tagesplan</h4>
        	<ul className="list-disc ml-5">{d.plan.map((p,i)=><li key={i}>{p}</li>)}</ul>
	        {d.highlights.length>0 && (<><h4 className="font-medium mt-2">Highlights</h4><ul className="list-disc ml-5">{d.highlights.map((h,i)=><li key={i}>{h}</li>)}</ul></>)}
	        {d.alt.length>0 && (<><h4 className="font-medium mt-2">Alternativen</h4><ul className="list-disc ml-5">{d.alt.map((a,i)=><li key={i}>{a}</li>)}</ul></>)}
		{(() => {
		  const embeds = d.map?.embeds
		    ? d.map.embeds
		    : (d.map?.embed ? [d.map.embed] : []);

		  return embeds.length ? (
		    <div className="mt-2 grid gap-3">
		      {embeds.map((url, i) => (
		        <MapFrame
		          key={i}
		          src={url}
		          origin={d.start}
		          destination={d.end}
		          title={`Route Tag ${d.day} – Karte ${i + 1}`}
		        />
		      ))}
		    </div>
		  ) : null;
		})()}     
	</div>}
    </div>
  );
}

function Navbar() {
  return (
    <nav className="flex gap-4 mb-6 border-b pb-2">
      <Link to="/" className="hover:underline">Roadbook</Link>  
      <Link to="/activities" className="hover:underline">Aktivitäten</Link>  
      <Link to="/contacts" className="hover:underline">Infos</Link>   
      <Link to="/protagonists" className="hover:underline">Protagonisten</Link>
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

function MapFrame({ src, origin, destination, title }) {
  const [ok, setOk] = useState(true);

  const fallbackEmbed = `https://maps.google.com/maps?q=${encodeURIComponent(
    (origin ? origin + " to " : "") + (destination || "")
  )}&z=9&output=embed`;

  const dirLink = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(
    origin || ""
  )}&destination=${encodeURIComponent(destination || "")}`;

  if (!ok) {
    return (
      <div className="mt-3 rounded-xl border p-3 bg-white/60">
        <iframe
          loading="lazy"
          title={`${title || "Route"} (Fallback)`}
          src={fallbackEmbed}
          className="w-full h-[360px] rounded-md border mb-3"
        />
        <a
          href={dirLink}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 text-sm px-3 py-1 rounded-full border hover:bg-gray-50"
        >
          Route in Google Maps öffnen
        </a>
      </div>
    );
  }

  return (
    <iframe
      loading="lazy"
      title={title || "Route"}
      referrerPolicy="no-referrer-when-downgrade"
      src={src}
      className="w-full h-[360px] rounded-xl border mt-3"
      onError={() => setOk(false)}
      allowFullScreen
    />
  );
}

export default function App() {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <Navbar />
	<Routes>
	  <Route path="/" element={<Roadbook />} />
	  <Route path="/activities" element={<Activities />} />  {/* <-- groß */}
	  <Route path="/contacts" element={<Contacts />} />
	  <Route path="/protagonists" element={<Protagonists />} />
	</Routes>
    </div>
  )
}