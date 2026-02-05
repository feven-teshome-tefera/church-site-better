import { Footer } from "@/components/footer"
import { Navigation } from "@/components/navigation"
import PastorsList from "@/components/PastorsList"

export default function AboutPage() {
  const beliefs = [
    {
      title: "The Authority of Scripture",
      description: "The Bible is God's trustworthy Word and the foundation for faith, discipleship, and daily living.",
    },
    {
      title: "Salvation Through Christ",
      description: "Jesus Christ is the Son of God and the only way to salvation, offering forgiveness and new life.",
    },
    {
      title: "The Power of Community",
      description: "Believers are called to grow in fellowship, encouraging one another in love and faithfulness.",
    },
    {
      title: "Active Service",
      description: "We serve others with compassion because faith in Christ leads to practical love in action.",
    },
  ]

  return (
    <>
      <Navigation />
      <main className="page-shell pb-16">
        <section className="section-shell">
          <div className="rounded-[2.25rem] bg-[#331660] px-8 py-16 text-primary-foreground md:px-14">
            <h1 className="text-5xl font-bold md:text-6xl">About Emmanuel Baptist Church</h1>
            <p className="mt-4 max-w-3xl text-lg text-primary-foreground/90">
              We are a church family centered on Jesus, committed to worship, discipleship, and serving our city.
            </p>
          </div>
        </section>

        <section className="section-shell mt-8">
          <div className="glass-card grid gap-8 p-8 md:grid-cols-2 md:p-12">
            <div>
              <h2 className="text-4xl font-semibold text-[#331660]">Our Vision</h2>
              <p className="mt-4 leading-8 text-foreground/80">
                To be a faithful church where people experience God's love, grow in biblical truth, and become mature
                disciples who impact families and communities.
              </p>
            </div>
            <div>
              <h2 className="text-4xl font-semibold text-[#331660]">Our Mission</h2>
              <p className="mt-4 leading-8 text-foreground/80">
                To worship God wholeheartedly, disciple believers intentionally, and share Christ's hope through
                practical service and gospel witness.
              </p>
            </div>
          </div>
        </section>

        <section className="section-shell mt-8">
          <div className="glass-card p-8 md:p-12">
            <h2 className="text-center text-4xl font-semibold text-[#331660]">Our Leadership</h2>
            <div className="mt-8">
              <PastorsList />
            </div>
          </div>
        </section>

        <section className="section-shell mt-8">
          <div className="glass-card p-8 md:p-12">
            <h2 className="text-4xl font-semibold text-[#331660]">What We Believe</h2>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {beliefs.map((belief) => (
                <article key={belief.title} className="rounded-2xl border border-[#331660]/12 bg-white/65 p-6">
                  <h3 className="text-2xl font-semibold">{belief.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-foreground/75">{belief.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
