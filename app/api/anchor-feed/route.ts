import { NextResponse } from 'next/server'
import Parser from 'rss-parser'

const FEED_URL = 'https://anchor.fm/s/10e7ccb94/podcast/rss'
export const dynamic = "force-dynamic"
export const revalidate = 0

export async function GET() {
  try {
    const parser = new Parser()
    const feed = await parser.parseURL(FEED_URL)

    const episodes = feed.items.map(item => ({
      title: item.title || 'Untitled',
      pubDate: item.pubDate || '',
      audioUrl: item.enclosure?.url || ''
    }))

    return NextResponse.json(
      { title: feed.title, link: feed.link, episodes },
      { headers: { "Cache-Control": "no-store" } }
    )
  } catch (err) {
    console.error('Error fetching RSS feed:', err)
    return NextResponse.json(
      { error: 'Failed to fetch feed' },
      { status: 500, headers: { "Cache-Control": "no-store" } }
    )
  }
}
