import type { MetadataRoute } from 'next';
import { getExecutiveOrders } from '@/lib/executive-orders';
import { getJudgeProfiles } from '@/lib/profiles';

const baseUrl = 'https://case-watch.vercel.app';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: baseUrl, lastModified: new Date() },
    { url: `${baseUrl}/judges`, lastModified: new Date() },
    { url: `${baseUrl}/executive-orders`, lastModified: new Date() },
    { url: `${baseUrl}/methodology`, lastModified: new Date() },
    ...getJudgeProfiles().map((profile) => ({
      url: `${baseUrl}/judges/${profile.slug}`,
      lastModified: new Date(profile.lastUpdated),
    })),
    ...getExecutiveOrders().map((order) => ({
      url: `${baseUrl}/executive-orders/${order.slug}`,
      lastModified: new Date(order.lastUpdated),
    })),
  ];
}
