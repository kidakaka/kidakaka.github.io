import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { getPostUrl } from '../utils/format';

export async function GET(context: { site: URL | undefined }) {
  const posts = await getCollection('posts');
  posts.sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime());

  return rss({
    title: 'The Big Fat Geek',
    description: 'Personal blog of Prasad Ajinkya — software architect, engineering leader, and author documenting telemetry from AI workloads, distributed systems, and fintech.',
    site: context.site ? context.site.toString() : 'https://kidakaka.com',
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: new Date(post.data.date),
      description: post.data.excerpt || '',
      link: getPostUrl(post),
      categories: post.data.categories,
    })),
    customData: `<language>en-us</language>`,
  });
}
