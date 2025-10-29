
"use client";

import { useEffect, useState, Suspense } from 'react';
import { useParams } from 'next/navigation';
import { getCategoryBySlug, getProductsForCategoryAndSubcategories, Category, SubCategory, Product } from '@/lib/data';
import CategoryPageClient from '@/components/category-page-client';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';


interface CategoryPageProps {
    params: {
        slug: string;
    }
}

function CategoryPageContent({ params }: CategoryPageProps) {
  const { slug } = params;
  const [category, setCategory] = useState<Category | SubCategory | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      if (slug) {
        try {
          setLoading(true);
          const foundCategory = await getCategoryBySlug(slug);
          
          if (!foundCategory) {
            notFound();
            return;
          }
          
          setCategory(foundCategory);
          document.title = `${foundCategory.name} | One Security`;

          const foundProducts = await getProductsForCategoryAndSubcategories(foundCategory);
          setProducts(foundProducts);

          const foundSubCategories = 'subCategory' in foundCategory && foundCategory.subCategory ? foundCategory.subCategory : [];
          setSubCategories(foundSubCategories);

        } catch (error) {
          console.error("Failed to load category data", error);
          notFound();
        } finally {
            setLoading(false);
        }
      }
    }

    loadData();
  }, [slug]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!category) {
    return notFound();
  }

  return (
    <CategoryPageClient category={category} products={products} subCategories={subCategories} />
  );
}


export default function CategoryPage({ params }: CategoryPageProps) {
    return (
        <Suspense fallback={<div>Loading Page...</div>}>
            <CategoryPageContent params={params} />
        </Suspense>
    )
}
