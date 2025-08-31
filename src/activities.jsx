import React, { useMemo, useState } from 'react'

/** Erste Version der Activities-Sammlung. */
const ACTIVITIES = [
{
  type: 'Aktivität',
  name: 'Tag 4 & 5: Fish River Canyon – Programm',
  city: 'Canyon Roadhouse',
  address: 'Fish River Canyon Roadhouse',
  notes: '2-Tages Programm',
  sections: [
    {
      title: 'Tag 1 - Canyon erleben & Sonnenuntergang',
      items: 
	[
        	{
		order: 1,
		label: '12:00-14:00 - Ankunft / Mittagessen im Roadhouse, Oldtimer anschauen & Fotos'
		},
		{
		order: 2,
		label: '15:00-18:00 Fotosessions & Walks',
		notes: ['Main Viewpoint & kurze Rim-Walks',
			'Ab 16 Uhr bestes Fotolicht.',
			'Sonnenuntergang am Main Viewpoint oder Sunset Viewpoint.']
		},
		{
		order: 3,
		label: 'Abends',
		notes: ['Abendessen im "Auto-Restaurant" oder Selbstkochen.',
			'Sex unter der Milchstrasse.']
		}
	]
    },
    {
      title: 'Tag 2 – Umgebung & Abwechslung',
      items: 
	[
        {
          order: 1,
          label: '08:00: Frühstück im Camper'
        },
        {
          order: 2,
          label: '08:30–11:30: Rim Road',
	  notes: ['auf und ab fahren. Stoppen an kleineren, kaum bekannten Aussichtspunkten.',
		  'Ideal, weil fast alleine.']
        },
        {
          order: 3,
          label: '12:30–15:30 Ais-Ais Hot Springs',
	  notes: ['Fahrt runter nach Ai-Ais Hot Springs.',
		  'Relaxen im Thermalbad, Mittagessen.']
        },
        {
          order: 4,
          label: '16:00–17:30 Rückfahrt',
	  notes: ['Rückfahrt Richtung Roadhouse, mit Stopps für Fotospots.']
        },
	{
          order: 5,
          label: '17:30–18:30 Canyon Roadhouse',
	  notes: ['Zweiter Sundowner am Canyonrand (diesmal anderer Spot als am 1. Tag).']
        },
        {
          order: 6,
          label: 'Abends',
	  notes: ['Nochmals Abendessen & vielleicht Milchstraße-Fotografie direkt am Roadhouse (kaum Lichtverschmutzung).']
	}
      ]
    }
  ]
},

 {
  type: 'Info',
  name: 'Fish River Canyon – Fotospots',
  city: 'Hobas / Viewpoints',
  address: 'Fish River Canyon Viewpoints (Hobas)',
  notes: 'Beste Lichtstimmung meist nachmittags bis Sonnenuntergang.',
  sections: [
    {
      title: 'Fotgrafie Tipps',
      items: 
	[
        	{
		order: 1,
		label: 'Morgens (ca. 7-10 Uhr)',
		notes: [
	            'Weniger ideal, weil der Canyon Richtung Osten öffnet'
	          ]
		},
		{
		order: 2,
		label: 'Nachmittags (ab 15 Uhr)',
		notes: ['Bestes Licht, weil die Sonne von Westen kommt und den Canyon frontal anstrahlt',
			'Optimal ab ca. 16–18 Uhr → kurz vor Sonnenuntergang.']
		},
		{
		order: 3,
		label: 'Sonnenuntergang (Golden Hour, ca. 18–18:30 je nach Jahreszeit)',
		notes: ['Magisches Licht – die Felswände glühen regelrecht.',
			'Lange Schatten im Canyon, tolle Kontraste.']
		},
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
  name: 'Tag 4 & 5: Ausflug nach Ais Ais zu den Hot Springs',
  city: 'Ais Ais',
  address: 'Ais Ais Hot Springs',
  notes: ['Alternativer Ausflug',' Dauer, ca. 1/2 Tag'],
  sections: [
    {
      title: 'Ais Ais Hot Springs',
      items: 
	[
        	{
		order: 1,
		label: 'Auf D601 nach Südwesten Richtung D324 starten (13.6km)'
		},
		{
		order: 2,
		label: 'Links abbiegen auf C37/D324 (42.2km)',
		},
		{
		order: 3,
		label: 'Rechts abbiegen auf C10/M97 (22.7km)',
		}
	]
    }    
  ]
},

{
  type: 'Aktivität',
  name: 'Tag 6: Tagesroute Roadhouse → Lüderitz',
  city: 'on the road',
  sections: 
  [
    {
      title: 'Tagesplan',
      items: 
	[
        	{
		order: 1,
		label: 'Frühstart (ca. 07:00–07:30)',
		notes: 'Ziel: nicht zu spät in Lüderitz ankommen, damit ihr dort noch etwas seht'
		},
        	{
		order: 2,
		label: '1. Stopp – Garas Park (Quiver Tree Forest) (ca. 1,5 Std ab Roadhouse)',
		notes: ['Direkt an der B4 bei Keetmanshoop',
			'Fotogen: Köcherbäume, Aloen, skurrile Felsen.',
			'Kurzer Abstecher (30–45 Min reichen).']
		},
		{
		order: 3,
		label: '2. Stopp – Namibische Wildpferde bei Garub (zwischen Aus und Lüderitz)',
		notes: ['Absolut lohnenswert!',
			'Beobachtungsplattform an der B4 bei Garub (ca. 20 km vor Aus).',
			'Mit Glück sehen wir die Wildpferde am Wasserloch – einzigartig, weil es eine der wenigen Wildpferd-Populationen in Afrika ist.',
			'Ideal für Fotos mit Teleobjektiv (früher Vormittag oder später Nachmittag sind die Chancen am besten, aber auch mittags sieht man oft welche).']
		},
		{
		order: 4,
		label: 'Mittagspause - Aus',
		notes: ['Kleines Dorf, netter Stopp fürs Tanken, Lunch oder Snacks.',
			'Klein-Aus Vista Lodge ist ein guter Platz mit Restaurant und Aussicht.']
		},
		{
		order: 5,
		label: 'Weiterfahrt - Wüste & Dünen Richtung Lüderitz',
		notes: ['Ab Aus geht es 120 km durch die Namib → grandiose Fahrt!',
			'Die Straße ist geteert, zieht sich durch weite Sandflächen mit Dünenfeldern.',
			'Ab hier: Kamera bereithalten, die Landschaft ist sehr fotogen.']
		},
		{
		order: 6,
		label: 'Ankunft Lüderitz (ca. 15:00-16:00)',
		notes: ['Unterkunft einchecken.']
		},
		{
		order: 7,
		label: 'Optional)',
		notes: ['evtl. den Stadtrundgang von Morgen vorziehen oder einfach nichts tun']
		}
	]
    }
  ]
},

{
  type: 'Aktivität',
  name: 'Tag 7: Lüderitz Tag 1 - Stadt, Geschichte, Geisterstadt',
  city: 'Lüderitz',
  sections: 
  [
    {
      title: 'Vormittag',
      items: 
	[
        	{
		order: 1,
		label: 'Kolmanskop Ghost Town (ca. 15 Min von Lüderitz)',
		notes: ['Führung am Morgen (meist 09:30 Uhr).',
			'Danach Zeit für Fotografie: verlassene Häuser, vom Sand verschluckt.',
			'Tipp: Weitwinkel für Innenräume, Tele für Details.']
		}
	]
    },
    {
	title: 'Mittag',
	items:
	[
		{
		order: 1,
		label: 'Mittagessen',
		notes: ['Zurück nach Lüderitz. Lunch z. B. bei „Diaz Coffee Shop“ oder an der Waterfront.']
		}
	]
    },
    {
	title: 'Nachmittag',
	items:
	[		
		{
		order: 1,
		label: 'Stadtrundgang',
		notes: ['Goerke-Haus (Kolonialvilla mit Blick über die Stadt).',
			'Felsenkirche (1906 erbaut, Wahrzeichen hoch über Lüderitz).',
			'Spaziergang durch die bunten Straßenzüge.']
		},
		{
		order: 2,
		label: 'Optional',
		notes: ['Dias Point rausfahren (ca. 20 km)',
			'Nachbildung des Stein-Kreuzes des portugiesischen Seefahrers Bartolomeu Dias.',
			'Dramatische Küste!']
		},
		{
		order: 3,
		label: 'Abend',
		notes: ['Sundowner am Shark Island oder direkt an der Waterfront.',
			'Essen: „Essence of Namibia“ oder „Barrels“ (beliebt bei Reisenden).']
		}	
	]
    }
  ]
},

{
  type: 'Aktivität',
  name: 'Tag 8: Lüderitz Tag 2 - Natur, Küste & Pinguine ',
  city: 'Lüderitz',
  sections: 
  [
    {
      title: 'Vormittag',
      items: 
	[
		{
		order: 1,
		label: 'Bootstour Halifax Island (Start meist 08:00–09:00, 2–3 Std)',
		notes: ['Ziel: Kolonie von Brillenpinguinen, Delfine, Pelikane, manchmal Wale.',
			'Mit Katamaran oder kleineren Booten buchbar.',
			'https://penguincatamarantours.wordpress.com/?utm_source=chatgpt.com',
			'Preis ca. N$600 - vorab buchen']		
		},        	{
		order: 2,
		label: 'Mittag',
		notes: ['Zurück in Lüderitz. Lunch & kurze Pause.']
		},
		{
		order: 3,
		label: 'Nachmittag',
		notes: ['Diaz Point / Große Bucht (falls am Vortag noch nicht) → hier rauhe Atlantikküste, Leuchtturm, oft Robben.',
			'Agate Beach → Sandstrand mit Muscheln & Halbedelsteinen (Spaziergang möglich).',
			'Offroad: Grosse Bucht und Sturmvogelbucht sind abgelegen, teils nur 4x4, sehr einsam.']
		},
		{
		order: 4,
		label: 'Abend',
		notes: ['Letzter Sundowner → Tipp: Am Hafen oder bei der Felsenkirche, wo das Licht schön über die Bucht fällt.']
		}	
	]
    }
  ]
},

{
  type: 'Aktivität',
  name: 'Tag 9: Namtib Biosphere Reserve / Huntes Rest Camp ',
  city: 'Namtib',
  sections: 
  [
      {
      title: 'Tagesplan am 2.Tag',
      items: 
      [
		{
		order: 1,
		label: '06:30–08:30 – Sunrise & Morning Walk',
		notes: ['Früh aufstehen lohnt sich → die Tirasberge im Morgenlicht sind magisch.',
			'Kurze Wanderung auf einem markierten Trail (es gibt einfache Spazierwege direkt vom Camp aus).',
			'Tiere sind morgens am aktivsten → gute Chancen auf Oryx, Springböcke, Strauße, Kudus.',
			'Danach gemütliches Frühstück am Zeltplatz.']		
		},        	
		{
		order: 2,
		label: '09:30–12:30 – Farm & Scenic Drive / Wanderung',
		notes: ['Möglichkeit 1: Mit dem Auto einen Scenic Drive über die Farm machen (es gibt interne Farmwege, gut ausgeschildert, keine Offroad-Extremtour).',
			'Möglichkeit 2: Längere Wanderung in die Tirasberge (ca. 2–3 Std).',
			'Highlights: bizarre Granitformationen, weite Täler, fantastische Panoramablicke.']
		},
		{
		order: 3,
		label: '12:30–15:30 – Siesta / Ruhepause',
		notes: ['Mittags ist es sehr heiß → ideal für Schattenplatz, Lesen, Tagebuch, kleines Nickerchen.',
			'Im Camp gibt’s schöne Ruheplätze unter Bäumen.']
		},
		{
		order: 4,
		label: '6:30–18:30 – Afternoon Activity',
		notes: ['Nochmals ein Scenic Drive oder ein kürzerer Spaziergang ins Abendlicht.',
			'Fotografisch spannend: Oryx-Silhouetten vor rotem Himmel, Berge im Sonnenuntergang.',
			'Golden Hour in den Tirasbergen ist ein Top-Fotospot.']
		},
		{
		order: 5,
		label: 'Abend',
		notes: ['Abendessen am Lagerfeuer (Selbstversorgung im Huntes Rest).',
			'Danach: Sternenhimmel genießen – Namtib liegt in einem der dunkelsten Himmelsgebiete der Welt → Milchstraße mit bloßem Auge, Astrofotografie möglich.']
		}	
	]
    },

    {
      title: 'Infos',
      items: 
	[
		{
		order: 1,
		label: 'Landschaft & Natur',
		notes: ['Privat geführtes Naturschutzgebiet (ca. 16.500 ha) – liegt zwischen Namib-Wüste und Tirasbergen.',
			'Sehr abwechslungsreich: rote Sanddünen, weite Ebenen, bizarre Granitberge, kleine Täler.',
			'Absolut ruhig und abgeschieden – perfekt nach der Küste in Lüderitz.']		
		},        	
		{
		order: 2,
		label: 'Tierwelt',
		notes: ['Kein „Big Five“-Gebiet, dafür Wildtiere wie Oryx, Springbock, Strauße, Kudus, Bergzebras, Schakale, zahlreiche Vögel.',
			'Gute Chance, Tiere direkt von der Unterkunft oder bei einer Wanderung zu sehen.']
		},
		{
		order: 3,
		label: 'Unterkunft & Camp',
		notes: ['Huntes Rest Camp = einfache, charmante Selbstversorger-Campingplätze mit schöner Lage.',
			'Viel Platz, Schatten durch Bäume, Feuerstellen, saubere Sanitäranlagen.']
		},
		{
		order: 4,
		label: 'Aktivitäten',
		notes: ['Self-Drive Scenic Drives durch die Farm (Pisten sind gut befahrbar, auch ohne Hardcore-4x4).',
			'Wandern: markierte Trails von leicht bis anspruchsvoll (z. B. in die Tirasberge, spektakuläre Aussicht!).',
			'Sternenhimmel: eine der dunkelsten Regionen Namibias → ideal für Astrofotografie.',
			'Farmleben kennenlernen: Die Besitzerfamilie Hälbich bewirtschaftet das Land ökologisch nachhaltig – man erfährt viel über Landnutzung und Schutz.']
		},
		{
		order: 5,
		label: 'Fotomotive',
		notes: ['Sonnenauf- und -untergänge über den roten Tirasbergen.',
			'Weite Ebenen mit vereinzelten Kameldornbäumen.',
			'Tiere in offener Landschaft (besonders Oryx-Silhouetten im Gegenlicht).',
			'Nachtaufnahmen der Milchstraße.']
		}	
	]
    }
  ]
},


{
  type: 'Aktivität',
  name: 'Tag 10: Namib-Naukluft-Nationalpark (Mirabib Campsite)',
  city: 'Mirabib Campsite',
  sections: 
  [
      {
      title: 'Info',
      items: 
      [
		{
		order: 1,
		label: 'Wüste & Weite',
		notes: ['Homeb Plains: Die umgebenden Ebenen sind karg und weitläufig, perfekt für Sonnenuntergänge, Sternenhimmel und Weitwinkel-Fotografie.',
			'Gravel Plains: Charakteristische Kies- und Geröllflächen, die in der Sonne wie eine riesige Schotterwüste funkeln.']
		},        	
		{
		order: 2,
		label: 'Landschaft & Geologie',
		notes: ['Mirabib-Inselberg: Der riesige, runde Granitfelsen ist das Zentrum des Camps. Du kannst ihn besteigen – oben hast du eine fantastische Rundumsicht über die Homeb Plains und die endlose Namib.',
			'Felsformationen & Erosion: Die glattgeschliffenen Felswände, Überhänge und kleine Höhlen rund um Mirabib sind ideale Fotomotive – besonders bei Sonnenauf- und -untergang.']
		}	
	]
    },

    {
      title: 'Aktivität',
      items: 
	[
		{
		order: 1,
		label: 'Ausflug',
		notes: ['Ausflug zum Kuiseb River (Homeb): Ca. 30–40 km entfernt. Dort gibt es Baumgruppen, grüne Inseln und viele Vögel. Ein starker Kontrast zur trockenen Ebene bei Mirabib.']
		},        	
		{
		order: 2,
		label: 'Sundowner',
		notes: ['Sundowner auf dem Felsen: Unbedingt den Sonnenuntergang von oben erleben – die Farben wechseln von orange zu tiefrot, während die Ebenen im Schatten versinken.',
			'Abendessen am Lagerfeuer: Am besten vorher selbst Holz mitbringen, da es vor Ort kaum Brennmaterial gibt.']
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
    notes: 'Fix einplanen – Dünen treffen auf Atlantik.',

  sections: 
  [
      {
      title: 'Info',
      items: 
      [
		{
		order: 1,
		label: 'Sandwich Harbour 4×4',
		notes: ['https://www.sandwich-harbour.com/collections/our-tours',
			'Sandwich Harbour 4×4 Scenic Excursion - Halbtages‑Tour (~4 h) ab ca. N$ 2 640 p.P.',
			'Full Day Sandwich Harbour 4×4 Excursion – Ganztagestour (~6 h) ab ca. N$ 3 300 p.P.']
		},        	
		{
		order: 2,
		label: 'Desert Dunes and Dust Tours',
		notes: ['https://www.bucketlistly.blog/posts/sandwich-harbor-travel-guide']
		},
		{
		order: 3,
		label: 'GetYourGuide – Geführte Touren',
		notes: ['Sandwich Harbour 4×4 Guided Tour; Dauer: ~5 Stunden; Abholung in Walvis Bay; Inklusive Tier‑ und Vogelbeobachtung, Fotostopps, leichter Lunch mit Sekt',
			'https://www.getyourguide.de/walvis-bay-l105982/sandwich-harbour-4x4-guided-tour-t836740/?utm_source=chatgpt.com&visitor-id=M8O4MCUDD4PXD7ORV669PRVVNELCO0GB&locale_autoredirect_optout=true']
		},		
		{
		order: 4,
		label: 'GetYourGuide – Private Touren',
		notes: ['Private Sandwich Harbour 4x4 Tour with Lunch - Walvis Bay',
			'https://www.getyourguide.com/swakopmund-l850/private-sandwich-harbour-4x4-tour-with-lunch-walvis-bay-t886257/']
		},		
		{
		order: 5,
		label: 'viator - a tripadvisor company',
		notes: ['z.B.: Sandwich Harbour 4x4 Tours at Walvisbay, Namibia',
			'https://www.viator.com/tours/Walvis-Bay/Sandwich-Harbour-4x4-Tours-Walvisbay-Namibia-Adventure-Awaits/d4467-442416P1']
		}
	]
    }
  ]
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
    notes: 'Kleintiere der Wüste (Chamäleon, Geckos, …).',
  sections: 
  [
      {
      title: 'Info',
      items: 
      [
		{
		order: 1,
		label: 'Anbieter: Living Desert Tours - Tommy',
		notes: ['https://www.sandwich-harbour.com/collections/our-tours',
			'Geführte Gruppentour, 4–5 h, N$ 900 p.P',
			'das Original',
			'https://livingdeserttours.com.na/']
		},        	
		{
		order: 2,
		label: 'Anbieter: Living Desert Adventures (Eco Dune Tour)',
		notes: ['Öko-geführte Tour, 5 h. N$ 1 050 p.P.',
			'https://thenaturalistcollection.com/dt-eco-dune.php']
		}
     ]
     }
  ]
  },
]

function encodeMap(q) {
  return q ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}` : ''
}

function TypeBadge({ type }) {
  const base = "inline-block text-[11px] px-2 py-[2px] rounded-full border align-middle";
  const tone =
    type === 'Aktivität' ? "border-emerald-400 text-emerald-700 bg-emerald-50" :
    type === 'Info'       ? "border-indigo-400 text-indigo-700 bg-indigo-50" :
                            "border-gray-300 text-gray-700 bg-gray-50";
  return <span className={`${base} ${tone}`}>{type}</span>
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
  const [query, setQuery]   = useState('')
  const [filter, setFilter] = useState('Alle')

  // Typen-Liste dynamisch aus den Daten (zukunftssicher: neue Typen erscheinen automatisch)
  const typeOptions = useMemo(() => {
    const uniq = Array.from(new Set(ACTIVITIES.map(a => a.type))).sort()
    return ['Alle', ...uniq]
  }, [])

  const filtered = useMemo(() => {
    const q = query.toLowerCase()
    return ACTIVITIES.filter(c => {
      const matchesText =
        [c.type, c.name, c.city, c.address, c.notes].filter(Boolean)
          .join(' ').toLowerCase().includes(q)
      const matchesType = filter === 'Alle' || c.type === filter
      return matchesText && matchesType
    })
  }, [query, filter])

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2">Aktivitäten & Infos</h1>
      <p className="text-gray-600 mb-4">Touren, Tipps und Hintergrundinfos entlang eurer Route.</p>

      <div className="flex flex-col md:flex-row gap-2 md:items-center mb-4">
        <input
          value={query}
          onChange={e=>setQuery(e.target.value)}
          placeholder="Suche nach Name, Ort, Notiz…"
          className="w-full md:w-80 rounded-xl border px-4 py-2 bg-white/80 focus:outline-none"
        />
        <select
          value={filter}
          onChange={e=>setFilter(e.target.value)}
          className="rounded-xl border px-3 py-2 bg-white/80"
        >
          {typeOptions.map(t => <option key={t}>{t}</option>)}
        </select>
      </div>

      <div className="grid gap-3">
        {filtered.map((c, i) => <ItemCard key={`${c.type}-${c.name}-${i}`} c={c} />)}
        {filtered.length === 0 && (
          <p className="text-sm text-gray-500">Keine Treffer – Suchbegriff ändern oder Filter zurücksetzen.</p>
        )}
      </div>
    </div>
  )
}