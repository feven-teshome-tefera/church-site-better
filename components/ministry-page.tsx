import { Footer } from "@/components/footer"
import { Navigation } from "@/components/navigation"

type MinistryFaq = {
  question: string
  answers: string[]
}

type MinistryPageProps = {
  badge: string
  title: string
  subtitle: string
  introTitle: string
  introText: string
  imageUrl: string
  faqs: MinistryFaq[]
}

export function MinistryPageTemplate({
  badge,
  title,
  subtitle,
  introTitle,
  introText,
  imageUrl,
  faqs,
}: MinistryPageProps) {
  return (
    <>
      <Navigation />
      <main className="page-shell pb-16">
        <section className="section-shell">
          <div className="relative overflow-hidden rounded-[2.25rem] p-10 text-white md:p-14">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url('${imageUrl}')` }}
            />
            <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(76,29,149,0.86),rgba(76,29,149,0.64),rgba(76,29,149,0.78))]" />
            <div className="relative z-10 max-w-3xl space-y-4">
              <p className="inline-flex rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em]">
                {badge}
              </p>
              <h1 className="text-5xl font-bold leading-tight md:text-6xl">{title}</h1>
              <p className="text-lg text-white/90 md:text-xl">{subtitle}</p>
            </div>
          </div>
        </section>

        <section className="section-shell mt-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <article className="glass-card p-8 md:p-10">
            <h2 className="text-3xl font-semibold text-[#331660]">{introTitle}</h2>
            <p className="mt-4 text-base leading-8 text-foreground/80">{introText}</p>
          </article>

          <article className="glass-card p-8">
            <h2 className="text-2xl font-semibold text-[#331660]">Frequently Asked Questions</h2>
            <div className="mt-6 space-y-3">
              {faqs.map((faq) => (
                <details key={faq.question} className="group rounded-2xl border border-[#331660]/12 bg-white/65 p-4">
                  <summary className="cursor-pointer list-none font-semibold text-[#331660]">{faq.question}</summary>
                  <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-foreground/80">
                    {faq.answers.map((answer) => (
                      <li key={answer}>{answer}</li>
                    ))}
                  </ul>
                </details>
              ))}
            </div>
          </article>
        </section>
      </main>
      <Footer />
    </>
  )
}
