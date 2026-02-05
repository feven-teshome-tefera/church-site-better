'use client'

import Image from "next/image"
import { useEffect, useState } from "react"
import { getSupabaseClient } from "@/lib/supabase-client"

interface Pastor {
  id: number
  created_at: string
  name: string
  position: string
  description: string
  image: string
}

export default function PastorsList() {
  const [pastors, setPastors] = useState<Pastor[]>([])

  useEffect(() => {
    const fetchPastors = async () => {
      const supabase = getSupabaseClient()
      const { data, error } = await supabase.from('pasters').select('*')
      if (error) {
        console.error('Error fetching pastors:', error)
        return
      }
      setPastors(data)
    }
    fetchPastors()
  }, [])

  if (!pastors.length) return <p className="text-center text-foreground/70">Loading pastors...</p>

  return (
    <div className="flex flex-wrap justify-center gap-6">
      {pastors.map((pastor) => (
        <article key={pastor.id} className="w-full max-w-sm rounded-3xl border border-[#331660]/12 bg-white/70 p-7 text-center shadow-sm">
          <div className="relative mx-auto mb-5 h-24 w-24 overflow-hidden rounded-full bg-secondary ring-4 ring-[#331660]/10">
            <Image src={pastor.image} alt={pastor.name} fill className="object-cover" />
          </div>
          <h3 className="text-2xl font-semibold">{pastor.name}</h3>
          <p className="mt-1 text-sm font-semibold uppercase tracking-wide text-[#331660]">{pastor.position}</p>
          <p className="mt-4 text-sm leading-7 text-foreground/75">{pastor.description}</p>
        </article>
      ))}
    </div>
  )
}
