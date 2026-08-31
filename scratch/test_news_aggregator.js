const Parser = require('rss-parser');

const parser = new Parser({
  timeout: 6000,
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
  'https://news.google.com/rss/search?q=' + encodeURIComponent('Central Asia renewable energy OR solar power OR wind farm OR climate transition') + '&hl=en-US&gl=US&ceid=US:en',
  'https://news.google.com/rss/search?q=' + encodeURIComponent('Uzbekistan OR Kazakhstan green transition OR green hydrogen OR decarbonization') + '&hl=en-US&gl=US&ceid=US:en'
];

const WORLD_FEEDS = [
  'https://feeds.bbci.co.uk/news/science_and_environment/rss.xml',
  'https://cleantechnica.com/feed/',
  'https://www.theguardian.com/environment/rss',
  'https://news.google.com/rss/search?q=' + encodeURIComponent('renewable energy transition OR green hydrogen OR solar battery investment') + '&hl=en-US&gl=US&ceid=US:en',
  'https://news.google.com/rss/search?q=' + encodeURIComponent('global climate policy OR carbon market ETS OR clean tech innovation') + '&hl=en-US&gl=US&ceid=US:en'
];

function stripHtml(html) {
  if (!html) return "";
  return html.replace(/<[^>]*>?/gm, '').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&quot;/g, '"').trim();
}

const FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=900&q=80&auto=format&fit=crop", // wind
  "https://images.unsplash.com/photo-1509391365360-2e959784a276?w=900&q=80&auto=format&fit=crop", // solar farm
  "https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=900&q=80&auto=format&fit=crop", // nature
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=900&q=80&auto=format&fit=crop", // lake
  "https://images.unsplash.com/photo-1448375240586-882707db888b?w=900&q=80&auto=format&fit=crop", // forest
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=900&q=80&auto=format&fit=crop", // finance
  "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=900&q=80&auto=format&fit=crop", // cleantech
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=900&q=80&auto=format&fit=crop"  // minerals
];

function getFallbackImage(title) {
  let hash = 0;
  for (let i = 0; i < title.length; i++) {
    hash = title.charCodeAt(i) + ((hash << 5) - hash);
  }
  return FALLBACK_IMAGES[Math.abs(hash) % FALLBACK_IMAGES.length];
}

function extractImage(item) {
  if (item.enclosure && item.enclosure.url && item.enclosure.type?.startsWith('image')) {
    return item.enclosure.url;
  }
  if (item.mediaContent && item.mediaContent.$ && item.mediaContent.$.url) {
    return item.mediaContent.$.url;
  }
  if (item.mediaThumbnail && item.mediaThumbnail.$ && item.mediaThumbnail.$.url) {
    return item.mediaThumbnail.$.url;
  }
  // Try to find <img src="..." in content or description
  const content = item.content || item.description || "";
  const match = content.match(/<img[^>]+src=["']([^"']+)["']/i);
  if (match && match[1] && !match[1].includes("google.com/news")) {
    return match[1];
  }
  return null;
}

async function fetchFeed(url, region) {
  try {
    const feed = await parser.parseURL(url);
    const items = [];
    for (const item of feed.items || []) {
      let sourceName = feed.title || "Новости";
      let cleanTitle = item.title || "";

      if (item.source) {
        sourceName = typeof item.source === 'string' ? item.source : item.source._ || sourceName;
      } else if (cleanTitle.includes(" - ")) {
        const parts = cleanTitle.split(" - ");
        sourceName = parts.pop()?.trim() || sourceName;
        cleanTitle = parts.join(" - ");
      }

      const cleanDescription = stripHtml(item.contentSnippet || item.content || item.description || "");
      const timestamp = item.pubDate ? new Date(item.pubDate).getTime() : (item.isoDate ? new Date(item.isoDate).getTime() : Date.now());
      const image = extractImage(item) || getFallbackImage(cleanTitle);

      items.push({
        id: item.guid || item.link || (cleanTitle + timestamp),
        title: cleanTitle.trim(),
        summary: cleanDescription.length > 200 ? cleanDescription.substring(0, 200) + "..." : cleanDescription,
        pubDate: timestamp,
        dateFormatted: new Date(timestamp).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' }),
        source: sourceName.replace(/^Google News - /i, '').replace(/ - Google News$/i, '').trim(),
        sourceUrl: item.link,
        image: image,
        region: region // 'ca' | 'world'
      });
    }
    return items;
  } catch (e) {
    console.warn(`Feed error [${url}]: ${e.message}`);
    return [];
  }
}

async function aggregate100News() {
  const start = Date.now();
  console.log("Fetching feeds concurrently...");

  const [caResults, worldResults] = await Promise.all([
    Promise.allSettled(CA_FEEDS.map(url => fetchFeed(url, 'ca'))),
    Promise.allSettled(WORLD_FEEDS.map(url => fetchFeed(url, 'world')))
  ]);

  const rawCa = caResults.filter(r => r.status === 'fulfilled').flatMap(r => r.value);
  const rawWorld = worldResults.filter(r => r.status === 'fulfilled').flatMap(r => r.value);

  // Deduplicate CA
  const seenCa = new Set();
  const dedupCa = [];
  for (const item of rawCa) {
    const key = item.title.toLowerCase().substring(0, 40);
    if (!seenCa.has(key)) {
      seenCa.add(key);
      dedupCa.push(item);
    }
  }

  // Deduplicate World
  const seenWorld = new Set();
  const dedupWorld = [];
  for (const item of rawWorld) {
    const key = item.title.toLowerCase().substring(0, 40);
    if (!seenWorld.has(key) && !seenCa.has(key)) {
      seenWorld.add(key);
      dedupWorld.push(item);
    }
  }

  // Sort descending by date (newest first)
  dedupCa.sort((a, b) => b.pubDate - a.pubDate);
  dedupWorld.sort((a, b) => b.pubDate - a.pubDate);

  const finalCa = dedupCa.slice(0, 50);
  const finalWorld = dedupWorld.slice(0, 50);

  // Combined 100 items, sorted by date
  const combined = [...finalCa, ...finalWorld].sort((a, b) => b.pubDate - a.pubDate);

  console.log(`\nAggregated in ${Date.now() - start}ms:`);
  console.log(`- Central Asia news: ${finalCa.length}`);
  console.log(`- World news: ${finalWorld.length}`);
  console.log(`- Total news: ${combined.length}`);
  console.log(`\nTop 3 Central Asia:`);
  finalCa.slice(0, 3).forEach((n, i) => console.log(`  ${i+1}. [${n.source}] ${n.title} (${n.dateFormatted})`));
  console.log(`\nTop 3 World:`);
  finalWorld.slice(0, 3).forEach((n, i) => console.log(`  ${i+1}. [${n.source}] ${n.title} (${n.dateFormatted})`));
}

aggregate100News();
