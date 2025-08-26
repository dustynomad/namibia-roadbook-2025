import React, { useMemo, useState, useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Protagonists from './Protagonists.jsx'
import Contacts from './contacts.jsx'     // <-- groß importieren
import Activities from './activities.jsx' // <-- groß importieren

const DAYS = [
  {
    day: 1,
    title: "Ankunft in Windhoek → Krumhuk Guestfarm",
    date: "04.09",	
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
    date: "05.09",
    start: "Krumhuk Guestfarm",
    end: "Bagatelle Kalahari",
    distance: "~250 km",
    drive: "~3 h",
   map: {
	embed:  
    "https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d936300.0313028485!2d16.899995978892644!3d-23.553282756449562!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e6!4m5!1s0x1c0b12234729fc19%3A0xccc4272e92645962!2sKrumhuk%2C%20P.O.Box%202630%2C%20Windhoek%2C%20Namibia!3m2!1d-22.743655!2d17.072954!4m5!1s0x1c0de3003bb57e57%3A0xe5660b2261b62c8f!2sBagatelle%20Kalahari%20Game%20Ranch%20Campsites%2C%20Namibia!3m2!1d-24.2911492!2d18.0277721!5e0!3m2!1sde!2sch!4v1755702586039!5m2!1sde!2sch"
  
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
    title: "Bagatelle → Garas Camp",
    date: "06.09",
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
    title: "Garas Camp → Fish River Canyon (Canyon Roadhouse)",
    date: "07.09",
    start: "Garas Camp",
    end: "Canyon Roadhouse",
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
    title: "Fish River Canyon (Canyon Roadhouse)",
    date: "08.09",
    start: "",
    end: "",
    distance: "lokal",
    drive: "kurz",
 map: {
	embeds:  [
"https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d421862.2167745303!2d17.519040457317868!3d-27.78589442505332!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e0!4m5!1s0x1c3e1d74933b20a9%3A0xc10f2ec8410425ab!2sCanyon%20Roadhouse%2C%20Gondwana%20Collection%20Namibia%2C%20Namibia!3m2!1d-27.5242786!2d17.814786899999998!4m5!1s0x1c3e47fac1dfa4ad%3A0x106de3c347f417f0!2sAis-Ais%2C%20Namibia!3m2!1d-27.9222424!2d17.4898699!5e1!3m2!1sde!2sch!4v1755775716052!5m2!1sde!2sch"
]},
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
    date: "09.09",
    start: "Canyon Roadhouse",
    end: "Lüderitz - Zur Waterkant Guesthouse",
    distance: "~400 km",
    drive: "~5 h",
 map: {
	embeds:  [
"https://www.google.com/maps/embed?pb=!1m34!1m12!1m3!1d1819487.2475211862!2d15.233209047645051!3d-27.040085402840877!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m19!3e0!4m5!1s0x1c6be6998f0e1a13%3A0xbe2d3687ec30cd56!2sL%C3%BCderitz%2C%20Namibia!3m2!1d-26.6420382!2d15.1639082!4m5!1s0x1c6b39399d3c675f%3A0x981f1c785384f668!2sAus%2C%20Namibia%2C%20Namibia!3m2!1d-26.6668614!2d16.2669247!4m5!1s0x1c3e1d74933b20a9%3A0xc10f2ec8410425ab!2sCanyon%20Roadhouse%2C%20Gondwana%20Collection%20Namibia%2C%20Namibia!3m2!1d-27.5242786!2d17.814786899999998!5e0!3m2!1sde!2sch!4v1755728156185!5m2!1sde!2sch",
"https://www.google.com/maps/embed?pb=!1m26!1m12!1m3!1d7131.943867641037!2d15.156293743243346!3d-26.64938104692891!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m11!3e6!4m3!3m2!1d-26.659475!2d15.173377299999999!4m5!1s0x1c6be69ac15fd6cf%3A0x8c797b95278c27fb!2sPension%20Zur%20Waterkant%20(B%26B)%2C%20P.O.%20Box%201055%20(Bremer%20Str.)%20Bremer%2C%20Luderitz%2C%20Namibia!3m2!1d-26.643523199999997!2d15.1597485!5e0!3m2!1sde!2sch!4v1755728406996!5m2!1sde!2sch",
"https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d421862.2167745303!2d17.519040457317868!3d-27.78589442505332!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e0!4m5!1s0x1c3e1d74933b20a9%3A0xc10f2ec8410425ab!2sCanyon%20Roadhouse%2C%20Gondwana%20Collection%20Namibia%2C%20Namibia!3m2!1d-27.5242786!2d17.814786899999998!4m5!1s0x1c3e47fac1dfa4ad%3A0x106de3c347f417f0!2sAis-Ais%2C%20Namibia!3m2!1d-27.9222424!2d17.4898699!5e1!3m2!1sde!2sch!4v1755775716052!5m2!1sde!2sch"
]
},
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
    title: "Lüderitz (Tag 1)",
    date: "10.09",
    start: "",
    end: "",
    distance: "",
    drive: "",
    plan: [
      "Besuch der Geisterstadt Kolmanskop am Morgen",
      "Stadtrundgang Lüderitz",
      "Nachmittags Diaz Point und Küste erkunden"
    ],
    highlights: ["Kolmanskop", "Atlantikküste", "Frischer Fisch & Austern"],
    alt: ["Ausflug zum Bogenfels"]
  },
  {
    day: 8,
    title: "Lüderitz (Tag 2)",
    date: "11.09",
    start: "",
    end: "",
    distance: "",
    drive: "",
    plan: [
      "Ausflug mit dem Boot",
      "Nachmittags Diaz Point und Küste erkunden",
      "Einkaufen für Namtib - die nächsten Tage Selbstversorger"	
    ],
    highlights: ["Kolmanskop", "Atlantikküste", "Halifax Island", "Bunte Altstadt"],
    alt: ["Ausflug zum Bogenfels"]
  },

  {
    day: 9,
    title: "Lüderitz → Hunters Rest namtib",
    date: "12.09",
    start: "Lüderitz",
    end: "Namtib Desert Lodge / Camping Hunters Rest",
    distance: "~243 km",
    drive: "~3.5 h",
map: {	embed: 
"https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d854128.6420106287!2d15.5741993292159!3d-26.4137273791366!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e6!4m5!1s0x1c6cbdfc5ef202ad%3A0x9db89c3a9c44b630!2sCamping%20Namtib%20Desert%20Lodge%2C%20Namibia!3m2!1d-26.019517999999998!2d16.2476277!4m5!1s0x1c6be69ac15fd6cf%3A0x8c797b95278c27fb!2sPension%20Zur%20Waterkant%20(B%26B)%2C%20P.O.%20Box%201055%20(Bremer%20Str.)%20Bremer%2C%20Luderitz%2C%20Namibia!3m2!1d-26.643523199999997!2d15.1597485!5e1!3m2!1sde!2sch!4v1755729119872!5m2!1sde!2sch"
},
    plan: [
      "07:00–08:00 – Frühstück & Abfahrt aus Lüderitz - Tanken und Vorräte auffüllen!!",
      "08:00–10:00 – Fahrt Lüderitz → Aus (ca. 120 km, 1,5–2 Std)",
      "10:00–11:00 – Stopp Garub Wildpferde (ca. 20 km vor Aus) - oder sein lassen und weiterfahren",
      "11:00–12:00 – Aus (Klein-Aus Vista)",
      "12:00–14:30 – Fahrt Aus → Namtib (ca. 100 km, 1,5–2 Std)",
      "14:30–15:00 – Ankunft Namtib Biosphere Reserve / Huntes Rest Camp",
      "16:30–18:30 – Nachmittagsaktivität - Kleine Wanderung",	
      "Abend       - Lagerfeuer am Camp, Abendessen",
      "Nacht       - Sex unter dem Sternenhimmel. Nacktfotos von Eve machen"
    ],
    highlights: ["D707 - Panoramastrasse"],
    alt: []
  },
  {
    day: 10,
    title: "Hunters Rest namtib Tag 1",
    date: "13.09",
    start: "",
    end: "",
    distance: "",
    drive: "",
    plan: [
      "06:30–08:30 – Sunrise & Morning Walk",
      "09:30–12:30 – Farm & Scenic Drive / Wanderung",
      "12:30–15:30 – Siesta / Ruhepause",
      "16:30–18:30 – Afternoon Activity"
    ],
    highlights: ["Weite Wüstenlandschaft", "Fotosession"],
    alt: []
  },

  {
    day: 11,
    title: "Hunters Rest → Sesriem",
    date: "14.09",
    start: "Hunters Rest Camp",
    end: "Little Sossus Campsite",
    distance: "~250 km",
    drive: "~4 h",
map: {
	embeds:  [
"https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d1024122.908235336!2d15.657861990567861!3d-25.44470754515139!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e6!4m5!1s0x1c6cbdfc5ef202ad%3A0x9db89c3a9c44b630!2sCamping%20Namtib%20Desert%20Lodge%2C%20Namibia!3m2!1d-26.019517999999998!2d16.2476277!4m5!1s0x1c729b2c224ee73d%3A0xdac4d718df58ddbf!2sLittle%20Sossus%20Campsite%2C%20Namibia!3m2!1d-24.6616343!2d15.975375099999999!5e1!3m2!1sde!2sch!4v1755729374049!5m2!1sde!2sch",
"https://www.google.com/maps/embed?pb=!1m26!1m12!1m3!1d22774.87795330235!2d15.973197119668745!3d-24.6632490974709!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m11!3e0!4m3!3m2!1d-24.6663741!2d15.991471599999999!4m5!1s0x1c729b2c224ee73d%3A0xdac4d718df58ddbf!2sLittle%20Sossus%20Campsite%2C%20Namibia!3m2!1d-24.6616343!2d15.975375099999999!5e1!3m2!1sde!2sch!4v1755729500503!5m2!1sde!2sch"
]},
    plan: [
      "Fahrt durch die Namib-Wüste",
      "erst spätes Ankommen",
      "Camp ist eingerichtet für Lebensmittel, Evtl. kann man auch in der zugehörigen Lodge Essen gehen"	
    ],
    highlights: ["Namib-Wüste"],
    alt: []
  },
  {
    day: 12,
    title: "Little Sossus Campsite (Tag 1)",
    date: "15.09",
    start: "",
    end: "",
    distance: "",
    drive: "~4 h",
    plan: [
      "",
      ""
    ],
    highlights: ["Namib-Wüste", "Sesriem Canyon"],
    alt: []
  },
  {
    day: 13,
    title: "Sesriem → Namib-Naukluft-Nationalpark (Mirabib Campsite)",
    date: "16.09",
    start: "Little Sossus Campsite",
    end: "Mirabib Campsite",
    distance: "~241 km ",
    drive: "~3,5 h",
 map: {
	embed:  [
"https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d1465545.1586719186!2d15.19749224996463!3d-23.97335359909229!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e0!4m5!1s0x1c729b2c224ee73d%3A0xdac4d718df58ddbf!2sLittle%20Sossus%20Campsite%2C%20Namibia!3m2!1d-24.6616343!2d15.975375099999999!4m5!1s0x1c73f4645af483d1%3A0xb3d3be92f94565db!2sMirabib%20Campsite%2C%20Namibia!3m2!1d-23.4540538!2d15.3520069!5e1!3m2!1sde!2sch!4v1755729577131!5m2!1sde!2sch"
]},
    plan: [
	"07:30 Abfahrt Little Sossus",
	"08:00–09:30 Sesriem Canyon oder Elim Dune",
	"11:00 Stopp in Solitaire (Kaffee, Apfelkuchen, Tanken, Fotos)",
	"12:30–13:00 Mittagspause (Picknick oder kleine Lodge unterwegs)",
	"13:30–15:30 Fahrt über Gaub & Kuiseb-Pass mit Fotostopps",
	"16:00–17:00 Ankunft Mirabib Campsite → Sundowner am Felsen",
	"Abends Lagerfeuer + Sternenhimmel"
	],
    highlights: ["Sesriem Canyon", "Elim Dune", "Solitäir (C19/C14) Apfelkuchen", "Tropic of Capricorn Sign", "Gaub Pass & Gaub Canyon", "The Grotto" ,"Kuiseb Pass & Canyon", "Mirabib Felsen"],
    alt: []
  },
  {
    day: 14,
    title: "Namib-Naukluft-Nationalpark (Mirabib Campsite) → Walvis Bay",
    date: "17.09",   
    start: "Mirabib Campsite",
    end: "Walvis Bay",
    distance: "~135 km",
    drive: "~2 h",
map: {
	embed:  [
"https://www.google.com/maps/embed?pb=!1m42!1m12!1m3!1d738001.5567153336!2d14.618462182196886!3d-23.258706092291302!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m27!3e0!4m5!1s0x1c73f4645af483d1%3A0xb3d3be92f94565db!2sMirabib%20Campsite%2C%20Namibia!3m2!1d-23.4540538!2d15.3520069!4m5!1s0x1c73fd6ee01372f9%3A0x96ec515a9b127377!2sC2QW%2B8R3%20Namib%20Desert%20Atmospheric%20Observatory%20(NDAO)%2C%20Gobabeb%2C%20Namibia!3m2!1d-23.561744599999997!2d15.0470575!4m3!3m2!1d-23.3361219!2d14.826174199999999!4m5!1s0x1c76b1c66aa379db%3A0xe596d081b1be7b16!2sMount%20Swartbankberg%2C%20Nuhoab%2C%20Namibia!3m2!1d-23.3016223!2d14.8265272!4m3!3m2!1d-22.955135799999997!2d14.519480699999999!5e1!3m2!1sde!2sch!4v1755875130348!5m2!1sde!2sch"]},
    plan: [
      "Brennholz vorher besorgen! Im Campingplatz wahrscheinlich kein Brennholz vorhanden --> Lagerfeuer am Abend",
      "Zurück zur D2186, nach 3.1 km rechts abbiegen",
      "Zwischenstop Namib Desert Observatorium (40km)",
      "Nach dem Observatorium Links halten auf die D1983",
      "ViewPoint Mount Swarbankberg, nach insgesamt 80km",
      "Rooibank Church, linker Hand, nach ca. 104km",
      "an der C14 angekommen, links nach Walvis Bay, km 128",
      "Fahrt durch die Wüste",
      "Ankunft in Walvis Bay am Mittag"
    ],
    highlights: ["Namib Naukluft Landschaft", "an der Wüste Namib entlang", "Observatorium", "Swarbankberg", "Kirche Rooibank"],
    alt: []
  },
  {
    day: 15,
    title: "Walvis Bay → Swakopmund",
    date: "18.09",
    start: "Walvis Bay",
    end: "Swakopmund, Driftwood Guesthouse",
    distance: "",
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
    day: 16,
    title: "Sandwich Harbour Day",
    date: "19.09",
    start: "",
    end: "",
    distance: "",
    drive: "Tour mit Anbieter",
    plan: [
      "Halbtages- oder Ganztagestour nach Sandwich Harbour (Wüste trifft Ozean!)",
      "Stadterkundung Swakopmund",
      "Cape Cross erkunden",	
      "Abendessen in einem Seafood-Restaurant"
    ],
    highlights: ["Sandwich Harbour", "Atlantikküste", "Cape Cross"],
    alt: ["Quadbiken, Wüstensafari"]
  },
  {
    day: 17,
    title: "Swakopmund → Community Campsite",
    date: "20.09",
    start: "Driftwood Guesthouse",
    end: "Uis, Elephanat Rock Community Campsite",
    distance: "~180 km",
    drive: "~2,5 h",
    plan: [
      "es ist noch nichts gebucht. Wir werden je nachdem schauen, was frei ist",
      "Elephant Rock Community Campsite",
      "Daureb Isib Campsite",
      "Desert House, Uis"
    ],
    highlights: ["Brandbergmassiv", "San-Felszeichnungen"],
    alt: []
  },
  {
    day: 18,
    title: "Community Campsite/Uis → Ai Aiba Rockpinating Lodge",
    date: "21.09",
    start: "Uis",
    end: "50 km vor Windhoek",
    distance: "~300 km",
    drive: "~4 h",
    plan: [
      "Ausspannen und alles herrichten für den Abflug",
      "",
      "Abendessen in Joe’s Beerhouse"
    ],
    highlights: [""],
    alt: []
  },
  {
    day: 19,
    title: "Abflug ab Windhoek",
    start: "Uis",
    end: "Flughafen Windhoek (Hosea Kutako)",
    date: "22.09",
    distance: "~45 km",
    drive: "~40 Min",
    plan: [
      "Mietwagenrückgabe",
      "Fahrt zum Flughafen",
      "Heimflug"
    ],
    highlights: ["Letzter Blick auf Namibia"],
    alt: []
  }
]

function DayCard({ d, forceOpen = false }) {
  const [open, setOpen] = useState(false);
  const shown = forceOpen || open; // <<< entscheidend

  return (
    <div className="rounded-2xl shadow p-5 bg-white/70 border page-keep">
      <div className="flex justify-between">
        <h3 className="text-xl font-semibold">Tag {d.day} – {d.title}</h3>
        <button onClick={()=>setOpen(!open)} className="text-sm border px-2 no-print">
          {shown ? "Schließen" : "Details"}
        </button>
      </div>

      {shown && (
        <div className="mt-2">
          {/* ... dein bestehender Detail-Content ... */}
          {/* Karten etc. bleiben; im Print blenden wir iframes per CSS aus */}
        </div>
      )}
    </div>
  );
}

function PrintView() {
  useEffect(() => {
    const t = setTimeout(() => window.print(), 600);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Namibia Roadbook 2025 – PDF</h1>
      {DAYS.map(d => (
        <div key={d.day} className="mb-6">
          <DayCard d={d} forceOpen />   {/* <<< alle Details offen */}
          <div className="page-break"></div>
        </div>
      ))}
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
      <Link to="/print" className="hover:underline no-print">PDF</Link> {/* neu */}
    </nav>
  );
}

function Roadbook() {
  const [query,setQuery] = useState("")
  const filtered = useMemo(()=>!query?DAYS:DAYS.filter(d=>(d.title+d.date+d.start+d.end).toLowerCase().includes(query.toLowerCase())),[query])
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
  <Route path="/activities" element={<Activities />} />
  <Route path="/contacts" element={<Contacts />} />
  <Route path="/protagonists" element={<Protagonists />} />
  <Route path="/print" element={<PrintView />} />  {/* neu */}
</Routes>
    </div>
  )
}