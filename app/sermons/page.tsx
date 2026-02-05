'use client'

import { Footer } from "@/components/footer"
import { Navigation } from "@/components/navigation"
import { useEffect, useRef, useState } from "react"
import { CalendarDays, Headphones } from "lucide-react"

interface Episode {
  title: string
  pubDate: string
  audioUrl: string
}

const platforms = [
  {
    name: "Spotify",
    href: "https://open.spotify.com/show/3Ks8fwSWdUrZjB3c7eU7nf",
    logo: "https://cdn.simpleicons.org/spotify/1DB954",
  },
  {
    name: "Apple Podcasts",
    href: "https://podcasts.apple.com/",
    logo: "https://cdn.simpleicons.org/applepodcasts/A855F7",
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/",
    logo: "https://cdn.simpleicons.org/youtube/FF0000",
  },
]

export default function SermonsPage() {
  const [episodes, setEpisodes] = useState<Episode[]>([])
  const [currentIndex, setCurrentIndex] = useState<number | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const fetchEpisodes = async () => {
    try {
      const res = await fetch('/api/anchor-feed', { cache: "no-store" })
      const data = await res.json()
      setEpisodes(data.episodes || [])
    } catch (err) {
      console.error('Error fetching RSS feed:', err)
    }
  }

  useEffect(() => {
    fetchEpisodes()
  }, [])

  const handlePlay = (index: number) => {
    const prevAudio = audioRef.current
    setCurrentIndex(index)

    setTimeout(() => {
      if (prevAudio && prevAudio !== audioRef.current) {
        prevAudio.pause()
        prevAudio.currentTime = 0
      }
      audioRef.current?.play()
    }, 80)
  }

  return (
    <>
      <Navigation />
      <main className="page-shell pb-16">
        <section className="section-shell">
          <div className="rounded-[2.25rem] bg-[#331660] px-8 py-16 text-primary-foreground md:px-14">
            <h1 className="text-5xl font-bold md:text-6xl">Sermons & Messages</h1>
            <p className="mt-4 text-lg text-primary-foreground/90">Listen to biblical teaching and stay encouraged through God's Word.</p>
          </div>
        </section>

        <section className="section-shell mt-8">
          <div className="glass-card p-8 md:p-10">
            <h2 className="text-4xl font-semibold text-[#331660]">Recent Episodes</h2>
            <p className="mt-2 text-sm text-foreground/70">Tap an episode to start playback.</p>

            <div className="mt-6 max-h-[28rem] space-y-3 overflow-y-auto pr-2">
              {episodes.length > 0 ? (
                episodes.map((episode, index) => (
                  <button
                    type="button"
                    key={`${episode.title}-${index}`}
                    className={`w-full rounded-2xl border p-4 text-left transition ${
                      currentIndex === index
                        ? "border-primary/40 bg-primary text-primary-foreground"
                        : "border-primary/30 bg-primary text-primary-foreground hover:bg-[#4b2b7a]"
                    }`}
                    onClick={() => handlePlay(index)}
                  >
                    <div className="flex items-start gap-3">
                      <Headphones className="mt-0.5 h-5 w-5 text-primary-foreground" />
                      <div className="w-full">
                        <h3 className="font-semibold">{episode.title}</h3>
                        <p className="mt-1 flex items-center gap-1 text-xs text-primary-foreground/85">
                          <CalendarDays className="h-3.5 w-3.5" />
                          {episode.pubDate}
                        </p>
                      </div>
                    </div>
                    {currentIndex === index && (
                      <audio ref={audioRef} controls className="mt-4 w-full" src={episode.audioUrl} />
                    )}
                  </button>
                ))
              ) : (
                <p className="rounded-2xl border border-dashed border-[#331660]/20 bg-white/60 p-6 text-center text-foreground/70">
                  Sermons will appear here once loaded.
                </p>
              )}
            </div>
          </div>
        </section>

        <section className="section-shell mt-8">
          <div className="grid gap-4 md:grid-cols-3">
            {platforms.map((platform) => (
              <a
                key={platform.name}
                href={platform.href}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card flex flex-col items-center p-6 text-center transition hover:-translate-y-0.5"
              >
                <img
                  src={platform.logo}
                  alt={`${platform.name} logo`}
                  className="h-14 w-14 object-contain"
                />
                <h3 className="mt-4 text-2xl font-semibold text-[#331660]">{platform.name}</h3>
                <p className="mt-2 text-sm text-foreground/70">Listen on {platform.name}</p>
              </a>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
