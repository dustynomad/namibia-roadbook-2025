import React from "react";
import { Routes, Route, NavLink, Navigate } from "react-router-dom";

import Overview from "./Overview.jsx";
import Activities from "./activities.jsx";
import Contacts from "./contacts.jsx";
import Protagonists from "./Protagonists.jsx";

/** === Overview: manuelle Daten & Karte (bitte bei Bedarf anpassen) === */
const MAP_EMBED_URL = "https://maps.google.com/maps?q=Namibia&z=5&output=embed";

const OVERVIEW_TRIP = [
  { day: 1,  from: "Windhoek",          to: "Kalahari (Mariental/Bagatelle)", distanceKm: 280 },
  { day: 2,  from: "Kalahari",          to: "Keetmanshoop",                   distanceKm: 335 },
  { day: 3,  from: "Keetmanshoop",      to: "Fish River Canyon (Hobas)",      distanceKm: 160 },
  { day: 4,  from: "Fish River Canyon", to: "Aus / Lüderitz",                 distanceKm: 280 },
  { day: 5,  from: "Aus / Lüderitz",    to: "Sesriem / Sossusvlei",           distanceKm: 480 },
  { day: 6,  from: "Sesriem",           to: "Swakopmund / Walvis Bay",        distanceKm: 350 },
  { day: 7,  from: "Swakopmund",        to: "Twyfelfontein (Damaraland)",     distanceKm: 320 },
  { day: 8,  from: "Damaraland",        to: "Etosha Süd (Okaukuejo)",         distanceKm: 270 },
  { day: 9,  from: "Etosha Süd",        to: "Etosha Ost (Namutoni)",          distanceKm: 150 },
  { day: 10, from: "Etosha Ost",        to: "Waterberg",                      distanceKm: 330 },
  { day: 11, from: "Waterberg",         to: "Windhoek",                       distanceKm: 300 },
];

/** === Platzhalter für deine Roadbook-Startseite ===
 * Ersetze diesen Block später mit deinem bestehenden Tages-Content.
 */
const RoadbookHome = () => (
  <div className="space-y-4">
    <h2 className="text-xl font-semibold">Roadbook – Übersicht</h2>
    <p className="text-gray-700">
      Willkommen im Namibia Roadbook 2025. Wähle oben eine Rubrik aus
      (z. B. <span className="font-medium">Overview</span> für Karte & Distanzen).
    </p>
    {/* Hier kannst du deine Tagesliste / bestehenden Inhalt einfügen */}
  </div>
);

/** Optionaler Print-View (falls du einen hast, Import/Komponente ersetzen) */
const PrintView = () => (
  <div>
    <h2 className="text-xl font-semibold">PDF / Druckansicht</h2>
    <p className="text-gray-700">Druckfreundliche Ansicht deines Roadbooks.</p>
  </div>
);

function Navbar() {
  const linkCls = ({ isActive }) =>
    "hover:underline" + (isActive ? " font-semibold text-amber-800" : "");

  return (
    <>
      {/* Header mit Zur-Übersicht-Link (Landing-Page am Domain-Root) */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b">
        <div className="max-w-5xl mx-auto px-4 py-2 flex items-center justify-between">
          <h1 className="text-base font-semibold">Namibia Roadbook 2025</h1>
          <a href="/" className="text-sm underline hover:no-underline">← Zur Übersicht</a>
        </div>
      </div>

      {/* Tabs / Navigation */}
      <nav className="max-w-5xl mx-auto px-4 flex gap-4 mb-6 border-b pb-2">
        <NavLink to="/overview" className={linkCls}>Overview</NavLink>
        <NavLink to="/" className={linkCls}>Roadbook</NavLink>
        <NavLink to="/activities" className={linkCls}>Aktivitäten</NavLink>
        <NavLink to="/contacts" className={linkCls}>Infos</NavLink>
        <NavLink to="/protagonists" className={linkCls}>Protagonisten</NavLink>
        <NavLink to="/print" className="hover:underline no-print">PDF</NavLink>
      </nav>
    </>
  );
}

const Footer = () => (
  <footer className="mt-12 border-t pt-4 text-sm text-gray-600">
    <div className="max-w-5xl mx-auto px-4 flex flex-wrap items-center gap-3">
      <span>© {new Date().getFullYear()} Dusty Nomads</span>
      <span className="text-gray-300">·</span>
      <a href="/impressum/" className="underline hover:no-underline">Impressum</a>
      <span className="text-gray-300">·</span>
      <a href="/datenschutz/" className="underline hover:no-underline">Datenschutz</a>
      <span className="ml-auto">
        <a href="/" className="underline hover:no-underline">Zur Übersicht</a>
      </span>
    </div>
  </footer>
);

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-amber-50 to-orange-100 text-gray-900">
      <Navbar />

      <main className="flex-1 max-w-5xl mx-auto px-4">
        <Routes>
          {/* Startseite bleibt Roadbook */}
          <Route path="/" element={<RoadbookHome />} />

          {/* NEU: Overview-Route */}
          <Route
            path="/overview"
            element={<Overview mapUrl={MAP_EMBED_URL} trip={OVERVIEW_TRIP} />}
          />

          <Route path="/activities" element={<Activities />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/protagonists" element={<Protagonists />} />
          <Route path="/print" element={<PrintView />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}
