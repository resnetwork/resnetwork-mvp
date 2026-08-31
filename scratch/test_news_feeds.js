const Parser = require('rss-parser');
const parser = new Parser({
  timeout: 5000,
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'application/rss+xml, application/xml, text/xml, */*'
  },
  customFields: {
    item: [
      ['media:content', 'mediaContent'],
      ['media:thumbnail', 'mediaThumbnail'],
      ['enclosure', 'enclosure'],
      ['description', 'description'],
      ['source', 'source']
    ],
  }
});

const CA_FEEDS = [
  'https://news.google.com/rss/search?q=' + encodeURIComponent('Казахстан возобновляемая энергетика OR ВИЭ OR солнечная электростанция OR ветровая электростанция') + '&hl=ru&gl=KZ&ceid=KZ:ru',
  'https://news.google.com/rss/search?q=' + encodeURIComponent('Центральная Азия климат OR экология OR водные ресурсы OR зеленая энергетика') + '&hl=ru&gl=KZ&ceid=KZ:ru',
  'https://news.google.com/rss/search?q=' + encodeURIComponent('Central Asia renewable energy OR climate transition OR solar power OR wind farm') + '&hl=en-US&gl=US&ceid=US:en',
  'https://news.google.com/rss/search?q=' + encodeURIComponent('Uzbekistan OR Kazakhstan green transition OR green economy OR decarbonization') + '&hl=en-US&gl=US&ceid=US:en'
];

const WORLD_FEEDS = [
  'https://feeds.bbci.co.uk/news/science_and_environment/rss.xml',
  'https://cleantechnica.com/feed/',
  'https://www.renewableenergyworld.com/feed/',
  'https://news.google.com/rss/search?q=' + encodeURIComponent('renewable energy transition OR green hydrogen OR solar battery investment') + '&hl=en-US&gl=US&ceid=US:en'
];

async function testFeeds() {
  console.log("--- Testing CA Feeds ---");
  for (const url of CA_FEEDS) {
    try {
      const feed = await parser.parseURL(url);
      console.log(`[CA] ${feed.title || url}: fetched ${feed.items?.length || 0} items`);
      if (feed.items && feed.items[0]) {
        console.log(`   Sample: ${feed.items[0].title} (${feed.items[0].pubDate})`);
      }
    } catch (e) {
      console.error(`[CA FAIL] ${url}: ${e.message}`);
    }
  }

  console.log("\n--- Testing World Feeds ---");
  for (const url of WORLD_FEEDS) {
    try {
      const feed = await parser.parseURL(url);
      console.log(`[World] ${feed.title || url}: fetched ${feed.items?.length || 0} items`);
      if (feed.items && feed.items[0]) {
        console.log(`   Sample: ${feed.items[0].title} (${feed.items[0].pubDate})`);
      }
    } catch (e) {
      console.error(`[World FAIL] ${url}: ${e.message}`);
    }
  }
}

testFeeds();
