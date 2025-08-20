import React from 'react'

export default function Protagonists() {
  const people = [
    { name: "Thomas", role: "Navigator & Fahrer", img: "/thomas.jpg" },
    { name: "Evelüne", role: "Fotografin & Co-Pilotin", img: "/anna.jpg" },
    // weitere Personen …
  ]

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Unsere Protagonisten</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {people.map((p,i)=>(
          <div key={i} className="rounded-xl shadow bg-white/70 p-4 flex flex-col items-center">
            <img src={p.img} alt={p.name} className="w-32 h-32 rounded-full object-cover mb-2" />
            <h3 className="text-xl font-semibold">{p.name}</h3>
            <p className="text-gray-600">{p.role}</p>
          </div>
        ))}
      </div>
    </div>
  )
}