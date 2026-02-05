import { Footer } from "@/components/footer"
import { Navigation } from "@/components/navigation"
import { Calendar, Clock, MapPin } from "lucide-react"
import { Event, loadEvents } from "@/lib/eventstore"

export default async function EventsPage() {
  const events: Event[] = await loadEvents()

  return (
    <>
      <Navigation />
      <main className="page-shell pb-16">
        <section className="section-shell">
          <div className="rounded-[2.25rem] bg-[#331660] px-8 py-16 text-primary-foreground md:px-14">
            <h1 className="text-5xl font-bold md:text-6xl">Upcoming Events</h1>
            <p className="mt-4 text-lg text-primary-foreground/90">Join us for worship, fellowship, and service opportunities.</p>
          </div>
        </section>

        <section className="section-shell mt-8">
          <div className="space-y-5">
            {events.length > 0 ? (
              events.map((event) => (
                <article key={event.id} className="glass-card p-7 md:p-8">
                  <div className="mb-4 flex flex-wrap items-center gap-3">
                    <span className="rounded-full bg-[#331660] px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white">
                      {event.category}
                    </span>
                    <h2 className="text-2xl font-semibold md:text-3xl">{event.title}</h2>
                  </div>
                  <p className="mb-5 text-foreground/75">{event.description || event.details}</p>
                  <div className="grid gap-3 text-sm text-foreground/75 md:grid-cols-3">
                    <p className="flex items-center gap-2"><Calendar className="h-4 w-4 text-[#331660]" /> {event.date}</p>
                    <p className="flex items-center gap-2"><Clock className="h-4 w-4 text-[#331660]" /> {event.time}</p>
                    <p className="flex items-center gap-2"><MapPin className="h-4 w-4 text-[#331660]" /> {event.location}</p>
                  </div>
                </article>
              ))
            ) : (
              <p className="glass-card p-8 text-center text-foreground/70">No events published yet.</p>
            )}
          </div>
        </section>

        <section className="section-shell mt-8">
          <div className="glass-card grid gap-6 p-8 md:grid-cols-2 md:p-10">
            <div>
              <h3 className="text-3xl font-semibold text-[#331660]">Service Times</h3>
              <ul className="mt-4 space-y-2 text-foreground/80">
                <li><strong>Sunday:</strong> 10:00 AM & 5:30 PM</li>
                <li><strong>Wednesday:</strong> 6:30 PM</li>
                <li><strong>Friday:</strong> 7:00 PM</li>
              </ul>
            </div>
            <div>
              <h3 className="text-3xl font-semibold text-[#331660]">Address</h3>
              <p className="mt-4 text-foreground/80">
                Addis Ababa, Ethiopia
                <br />
                2Q9F+52V, Addis Ababa
                <br />
                (251) 911419066
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
