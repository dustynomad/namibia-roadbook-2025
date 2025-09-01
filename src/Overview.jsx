import React from "react";

/**
 * Props:
 * - mapUrl: string (Google Maps Embed URL)
 * - trip: Array<{ day:number|string, from:string, to:string, distanceKm?:number }>
 */
export default function Overview({ mapUrl, trip = [] }) {
  const totalKm = trip.reduce((s, t) => s + (Number(t.distanceKm) || 0), 0);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Overview</h2>

      {/* große Karte */}
      <div className="w-full rounded-xl overflow-hidden shadow">
        <div className="aspect-video bg-gray-100">
          <iframe
            title="Trip Overview Map"
            src={mapUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>

      {/* Notizen: Stops + Kilometer */}
      <div className="rounded-xl bg-white/70 p-4 shadow">
        <h3 className="text-lg font-semibold mb-3">Etappen &amp; Distanzen</h3>
        <ul className="space-y-2">
          {trip.map((t, i) => (
            <li key={i} className="flex items-center gap-3">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-amber-100 text-amber-800 text-sm font-medium">
                {t.day}
              </span>
              <div className="flex-1">
                <div className="font-medium">
                  {t.from} <span className="text-gray-400">→</span> {t.to}
                </div>
                {t.distanceKm != null && (
                  <div className="text-xs text-gray-600">
                    Distanz: {t.distanceKm} km
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>

        {totalKm > 0 && (
          <div className="mt-4 text-sm text-gray-700">
            <span className="font-medium">Gesamtdistanz:</span>{" "}
            {totalKm.toLocaleString("de-CH")} km
          </div>
        )}
      </div>
    </div>
  );
}
