import { Footer } from "@/components/footer"
import { Navigation } from "@/components/navigation"
import ContactForm from "@/components/ContactForm"
import { Clock, Mail, MapPin, Phone } from "lucide-react"

export default function ContactPage() {
  const contactInfo = [
    {
      icon: MapPin,
      title: "Visit Us",
      details: ["2Q9F+52V, Addis Ababa", "Near Kazanchis Urael Mekane Eyesus Church"],
    },
    {
      icon: Phone,
      title: "Call Us",
      details: ["(251) 911419066", "Monday to Friday, 9:00 AM - 5:00 PM"],
    },
    {
      icon: Mail,
      title: "Email Us",
      details: ["ethiopiaemmanuelbaptist@gmail.com", "We respond as quickly as possible"],
    },
  ]

  const serviceTimes = [
    { day: "Sunday", times: ["10:00 AM - Worship Service"], location: "Main Sanctuary" },
    { day: "Tuesday", times: ["10:00 AM - Prayer Meeting"], location: "Prayer Room" },
    { day: "Saturday", times: ["3:00 PM - Youth Group"], location: "Youth Center" },
  ]

  return (
    <>
      <Navigation />
      <main className="page-shell pb-16">
        <section className="section-shell">
          <div className="rounded-[2.25rem] bg-[#331660] px-8 py-16 text-primary-foreground md:px-14">
            <h1 className="text-5xl font-bold md:text-6xl">Get In Touch</h1>
            <p className="mt-4 text-lg text-primary-foreground/90">We'd love to connect, pray with you, and help you take your next step.</p>
          </div>
        </section>

        <section className="section-shell mt-8">
          <div className="grid gap-5 md:grid-cols-3">
            {contactInfo.map((item) => {
              const Icon = item.icon
              return (
                <article key={item.title} className="glass-card p-6 text-center">
                  <Icon className="mx-auto h-9 w-9 text-[#331660]" />
                  <h2 className="mt-4 text-2xl font-semibold">{item.title}</h2>
                  <div className="mt-3 space-y-1 text-sm text-foreground/70">
                    {item.details.map((detail) => (
                      <p key={detail}>{detail}</p>
                    ))}
                  </div>
                </article>
              )
            })}
          </div>
        </section>

        <section className="section-shell mt-8 grid gap-8 lg:grid-cols-2">
          <article className="glass-card p-8 md:p-10">
            <h2 className="text-4xl font-semibold text-[#331660]">Send Us a Message</h2>
            <div className="mt-6">
              <ContactForm />
            </div>
          </article>

          <article className="glass-card p-8 md:p-10">
            <h2 className="text-4xl font-semibold text-[#331660]">Service Times</h2>
            <div className="mt-6 space-y-4">
              {serviceTimes.map((service) => (
                <div key={service.day} className="rounded-2xl border border-[#331660]/12 bg-white/65 p-5">
                  <div className="flex items-start gap-3">
                    <Clock className="mt-1 h-5 w-5 text-[#331660]" />
                    <div>
                      <h3 className="text-xl font-semibold">{service.day}</h3>
                      <p className="text-sm text-foreground/70">{service.location}</p>
                    </div>
                  </div>
                  <ul className="mt-3 list-disc space-y-1 pl-8 text-sm text-foreground/75">
                    {service.times.map((time) => (
                      <li key={time}>{time}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </article>
        </section>

        <section className="section-shell mt-8">
          <div className="glass-card p-8 text-center md:p-12">
            <h2 className="text-4xl font-semibold text-[#331660]">Find Us on the Map</h2>
            <p className="mt-3 text-foreground/75">2Q9F+52V, Addis Ababa</p>
            <a
              href="https://maps.app.goo.gl/5TCsPB1ya9QzexeSA"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex rounded-full bg-[#331660] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#331660]"
            >
              Open in Google Maps
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
