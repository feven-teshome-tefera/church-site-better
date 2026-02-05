'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ministries } from '@/lib/ministriesstore'

export default function MinistriesGrid({ data }: { data: ministries[] }) {
  const [search, setSearch] = useState('')

  const filtered = data.filter(m => m.title.toLowerCase().includes(search.toLowerCase()))

  return (
    <div>
      <input
        type="text"
        placeholder="Search ministries..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-6 p-2 border rounded"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {filtered.map((ministry) => (
          <div key={ministry.title} className="border border-border rounded-lg p-8">
            <h3 className="text-2xl font-bold mb-4">{ministry.title}</h3>
            <p className="text-foreground/80 mb-6">{ministry.description}</p>
            <p className="text-foreground/70 mb-4 text-sm">{ministry.details}</p>
            {ministry.link && ministry.link.trim() !== '' && (
              <Link
                className="cursor-pointer text-primary font-semibold hover:text-primary/80 transition"
                href={ministry.link}
              >
                Get Involved →
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
