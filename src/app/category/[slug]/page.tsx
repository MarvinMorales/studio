
import { getAllCategories, getCategoryBySlug, getProductsForCategoryAndSubcategories, categoriesData, Category, SubCategory, Product } from '@/lib/data';
import { notFound } from 'next/navigation';
import CategoryPageClient from '@/components/category-page-client';

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

export default function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = params;
  
  const category = slug ? getCategoryBySlug(slug) : null;

  if (!category) {
    notFound();
  }

  const products = getProductsForCategoryAndSubcategories(category);
  const subCategories = 'subCategory' in category && category.subCategory ? category.subCategory : [];

  return <CategoryPageClient category={category} products={products} subCategories={subCategories} />;
}
