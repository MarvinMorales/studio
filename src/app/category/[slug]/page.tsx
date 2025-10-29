
import { getAllCategories, getCategoryBySlug, getProductsForCategoryAndSubcategories, categoriesData, Category, SubCategory, Product, websiteData } from '@/lib/data';
import { notFound } from 'next/navigation';
import CategoryPageClient from '@/components/category-page-client';
import { Suspense } from 'react';
import type { Metadata } from 'next';

export async function generateStaticParams() {
    const allCategories = getAllCategories(categoriesData);
    return allCategories.map((category) => ({
        slug: category.id,
    }));
}

interface CategoryPageProps {
    params: {
        slug: string;
    }
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const category = getCategoryBySlug(params.slug);

  if (!category) {
    return {
      title: 'Categoría no encontrada',
      description: 'La categoría que buscas no existe.',
    };
  }
  
  const siteUrl = websiteData.businessInformation.websiteDomain;

  return {
    title: category.name,
    description: category.description,
    openGraph: {
      title: `${category.name} | One Security`,
      description: category.description,
      url: `${siteUrl}/category/${params.slug}`,
      images: [
        {
          url: category.coverImage,
          width: 1200,
          height: 630,
          alt: category.name,
        },
      ],
    },
  };
}


export default function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = params;
  
  const category = slug ? getCategoryBySlug(slug) : null;

  if (!category) {
    notFound();
  }

  const products = getProductsForCategoryAndSubcategories(category);
  const subCategories = 'subCategory' in category && category.subCategory ? category.subCategory : [];

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CategoryPageClient category={category} products={products} subCategories={subCategories} />
    </Suspense>
  );
}
