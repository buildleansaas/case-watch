import type { MetadataRoute } from 'next';
import { getJudgeProfiles } from '@/lib/profiles';

const baseUrl = 'https://case-watch.vercel.app';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: baseUrl, lastModified: new Date() },
    { url: `${baseUrl}/judges`, lastModified: new Date() },
    { url: `${baseUrl}/methodology`, lastModified: new Date() },
    ...getJudgeProfiles().map((profile) => ({
      url: `${baseUrl}/judges/${profile.slug}`,
      lastModified: new Date(),
    })),
  ];
}
