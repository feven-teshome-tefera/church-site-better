import Parser from 'rss-parser';

const parser = new Parser();

// Replace this with your Anchor RSS feed URL
const FEED_URL = 'https://anchor.fm/s/10e7ccb94/podcast/rss';

async function fetchEpisodes() {
  try {
    const feed = await parser.parseURL(FEED_URL);
    console.log(`Podcast: ${feed.title}`);
    console.log(`Link: ${feed.link}`);
    console.log('Episodes:');

    feed.items.forEach((item, index) => {
      console.log(`\nEpisode ${index + 1}:`);
      console.log(`Title: ${item.title}`);
      console.log(`Published: ${item.pubDate}`);
      console.log(`Audio URL: ${item.enclosure?.url}`);
    });
  } catch (err) {
    console.error('Error fetching RSS feed:', err);
  }
}

fetchEpisodes();
