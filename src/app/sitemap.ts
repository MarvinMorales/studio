import { MetadataRoute } from 'next'
import { getAllCategories, categoriesData, websiteData } from '@/lib/data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = websiteData.businessInformation.websiteDomain;

  const staticRoutes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];

  const allCategories = getAllCategories(categoriesData);

  const categoryRoutes = allCategories.map((category) => {
    return {
        url: `${baseUrl}/category/${category.id}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.9,
    }
  });


  return [...staticRoutes, ...categoryRoutes];
}
