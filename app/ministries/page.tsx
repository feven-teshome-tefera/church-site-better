import { Footer } from "@/components/footer"
import { Navigation } from "@/components/navigation"
import Link from "next/link"
import { loadMinistries, ministries } from "@/lib/ministriesstore"

export default async function MinistriesPage() {
  const ministriesData: ministries[] = await loadMinistries()

  return (
    <>
      <Navigation />
      <main className="page-shell pb-16">
        <section className="section-shell">
          <div className="rounded-[2.25rem] bg-[#331660] px-8 py-16 text-primary-foreground md:px-14">
            <h1 className="text-5xl font-bold md:text-6xl">Our Ministries</h1>
            <p className="mt-4 text-lg text-primary-foreground/90">Discover where you can grow, serve, and belong.</p>
          </div>
        </section>

        <section className="section-shell mt-8">
          <div className="grid gap-6 md:grid-cols-2">
            {ministriesData.length > 0 ? (
              ministriesData.map((ministry) => (
                <article key={ministry.title} className="glass-card p-8">
                  <h2 className="text-3xl font-semibold">{ministry.title}</h2>
                  <p className="mt-3 text-foreground/80">{ministry.description}</p>
                  <p className="mt-3 text-sm text-foreground/70">{ministry.details}</p>
                  {ministry.link && ministry.link.trim() !== "" && (
                    <Link
                      href={ministry.link}
                      className="mt-6 inline-flex rounded-full bg-[#331660] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#331660]"
                    >
                      Get Involved
                    </Link>
                  )}
                </article>
              ))
            ) : (
              <p className="glass-card p-8 text-center text-foreground/70 md:col-span-2">No ministries published yet.</p>
            )}
          </div>
        </section>

        <section className="section-shell mt-8">
          <div className="glass-card p-8 text-center md:p-12">
            <h2 className="text-4xl font-semibold text-[#331660]">Find Your Purpose</h2>
            <p className="mx-auto mt-4 max-w-2xl text-foreground/80">
              Everyone has spiritual gifts and a role in God's kingdom. We'd love to help you find where you can serve.
            </p>
            <Link
              href="/contact"
              className="mt-7 inline-flex rounded-full bg-[#331660] px-7 py-3 text-sm font-semibold text-white transition hover:bg-[#331660]"
            >
              Connect with Us
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
