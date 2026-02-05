'use client'

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowRight, CalendarDays, Clock3, MapPin, Users } from "lucide-react"
import { Footer } from "@/components/footer"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Event, loadEvents } from "@/lib/eventstore"
import { loadMinistries, ministries } from "@/lib/ministriesstore"

function formatDate(value: string) {
  const parsed = new Date(value)
  if (Number.isNaN(parsed.getTime())) return value
  return parsed.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

export default function HomePage() {
  const [events, setEvents] = useState<Event[]>([])
  const [ministries, setMinistries] = useState<ministries[]>([])

  useEffect(() => {
    loadEvents().then(setEvents)
    loadMinistries().then(setMinistries)
  }, [])

  const featuredEvents = events.slice(0, 3)
  const featuredMinistries = ministries.slice(0, 3)

  return (
    <>
      <Navigation />
      <main className="page-shell bg-background pb-10">
        <section className="section-shell relative overflow-hidden rounded-[2.25rem] px-4 pb-16 pt-14 sm:px-8 lg:px-10">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -left-20 top-14 h-72 w-72 rounded-full bg-amber-300/35 blur-3xl" />
            <div className="absolute -right-20 top-28 h-72 w-72 rounded-full bg-orange-400/25 blur-3xl" />
            <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(255,250,243,0.96)_0%,rgba(251,241,228,0.94)_55%,rgba(255,255,255,0.92)_100%)]" />
          </div>

          <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.25fr_0.75fr]">
            <div className="space-y-8">
              <p className="inline-flex items-center rounded-full border border-foreground/10 bg-white/70 px-4 py-2 text-sm font-medium text-foreground/80 shadow-sm">
                A worshiping family rooted in Christ
              </p>
              <h1 className="max-w-3xl text-balance text-4xl font-bold leading-tight md:text-6xl">
                Faith, fellowship, and purpose for every generation.
              </h1>
              <p className="max-w-2xl text-lg text-foreground/70 md:text-xl">
                Ethiopian Emmanuel Baptist Church is a welcoming community where prayer, worship, and service shape how
                we live and love.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button asChild size="lg" className="bg-[#331660] text-white hover:bg-[#331660]">
                  <Link href="/contact">Plan Your Visit</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="bg-white/60">
                  <Link href="/about">Discover Our Story</Link>
                </Button>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  { label: "Sunday Worship", value: "10:00 AM" },
                  { label: "Bible Study", value: "Tuesday" },
                  { label: "Prayer Meeting", value: "Tuesdays " },
                ].map((item) => (
                  <div key={item.label} className="rounded-2xl border border-[#331660]/10 bg-white/80 p-4 shadow-sm">
                    <p className="text-sm text-foreground/60">{item.label}</p>
                    <p className="text-lg font-semibold">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4 rounded-3xl border border-white/60 bg-white/80 p-4 shadow-xl backdrop-blur">
              <div className="overflow-hidden rounded-2xl">
                <img src="/church-interior.jpg" alt="Church interior" className="h-72 w-full object-cover" />
              </div>
              <div className="rounded-2xl bg-[#331660] p-5 text-white">
                <p className="text-sm uppercase tracking-wide text-white/70">This Week at Emmanuel</p>
                <h2 className="mt-2 text-xl font-semibold">Come worship with us</h2>
                <div className="mt-4 space-y-3 text-sm text-white/80">
                  <p className="flex items-center gap-2">
                    <Clock3 className="h-4 w-4" />
                    Sunday at 10:00 AM 
                  </p>
                  <p className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Addis Ababa
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="section-shell px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl items-center gap-12 rounded-3xl border border-[#331660]/12 bg-card p-8 shadow-sm md:grid-cols-2 md:p-12">
            <div className="space-y-5">
              <p className="text-sm font-semibold uppercase tracking-widest text-foreground/55">About Our Church</p>
              <h2 className="text-3xl font-bold text-balance md:text-4xl">A place to grow in grace and truth</h2>
              <p className="text-foreground/70">
                We are committed to biblical teaching, genuine fellowship, and serving our neighbors through practical
                acts of love.
              </p>
              <Link href="/about" className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
                Read more about our mission <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { label: "Community", icon: Users, value: "Welcoming all families" },
                { label: "Worship", icon: Clock3, value: "Spirit-led weekly services" },
              ].map((item) => (
                <div key={item.label} className="rounded-2xl bg-secondary/45 p-6">
                  <item.icon className="mb-3 h-5 w-5 text-primary" />
                  <p className="font-semibold">{item.label}</p>
                  <p className="mt-1 text-sm text-foreground/70">{item.value}</p>
                </div>
              ))}
              <div className="sm:col-span-2 overflow-hidden rounded-2xl">
                <img src="/beautiful-modern-church-interior-with-natural-ligh.jpg" alt="Church sanctuary" className="h-44 w-full object-cover" />
              </div>
            </div>
          </div>
        </section>

        <section className="section-shell px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-sm font-semibold uppercase tracking-widest text-foreground/55">Ministries</p>
                <h2 className="text-3xl font-bold">Grow and serve together</h2>
              </div>
              <Link href="/ministries" className="text-sm font-semibold text-primary">
                View all ministries
              </Link>
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              {featuredMinistries.length > 0 ? (
                featuredMinistries.map((ministry) => (
                  <article
                    key={ministry.id}
                    className="group rounded-2xl border border-[#331660]/12 bg-card p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <h3 className="text-xl font-semibold">{ministry.title}</h3>
                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-foreground/70">
                      {ministry.description || "Learn how this ministry supports faith, discipleship, and community."}
                    </p>
                    <Link href="/ministries" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                      Learn more <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                    </Link>
                  </article>
                ))
              ) : (
                <p className="rounded-2xl border border-dashed border-border p-6 text-foreground/65 md:col-span-3">
                  Ministries will appear here once added in the admin panel.
                </p>
              )}
            </div>
          </div>
        </section>

        <section className="section-shell rounded-[2rem] bg-secondary/40 px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8 flex items-center justify-between">
              <h2 className="text-3xl font-bold">Upcoming Events</h2>
              <Link href="/events" className="text-sm font-semibold text-primary">
                See all events
              </Link>
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              {featuredEvents.length > 0 ? (
                featuredEvents.map((event) => (
                  <article key={event.id} className="rounded-2xl border border-[#331660]/12 bg-background p-6">
                    <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1 text-xs font-medium">
                      <CalendarDays className="h-3.5 w-3.5" />
                      {formatDate(event.date)}
                    </p>
                    <h3 className="text-lg font-semibold">{event.title}</h3>
                    <p className="mt-2 text-sm text-foreground/70 line-clamp-3">{event.description || event.details}</p>
                  </article>
                ))
              ) : (
                <p className="rounded-2xl border border-dashed border-border p-6 text-foreground/65 md:col-span-3">
                  Upcoming events will appear here once published.
                </p>
              )}
            </div>
          </div>
        </section>

        <section className="section-shell px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl rounded-3xl bg-[linear-gradient(125deg,#121826_0%,#1f2937_55%,#374151_100%)] p-8 text-center text-white md:p-12">
            <h2 className="text-balance text-3xl font-bold md:text-4xl">Listen to recent sermons and stay encouraged</h2>
            <p className="mx-auto mt-4 max-w-2xl text-white/80">
              Explore biblical teaching from our weekly services and share messages with friends and family.
            </p>
            <Button asChild size="lg" className="mt-7 bg-white text-slate-900 hover:bg-white/90">
              <Link href="/sermons">Explore Sermons</Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
