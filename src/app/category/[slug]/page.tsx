"use client";

import { useState, useEffect } from 'react';
import { getCategoryBySlug, getProductsByCategoryId, Category, Product, SubCategory, allProducts } from '@/lib/data';
import Header from '@/components/header';
import Footer from '@/components/footer';
import Image from 'next/image';
import { notFound, useSearchParams, useRouter, usePathname } from 'next/navigation';
import { Star } from 'lucide-react';
import ProductModal from '@/components/product-modal';
import Link from 'next/link';

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const productParam = searchParams.get('product');
  
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const category = getCategoryBySlug(slug);

  useEffect(() => {
    if (productParam) {
      const productToShow = allProducts.find(p => p.id === productParam);
      if (productToShow) {
        setSelectedProduct(productToShow);
      } else {
        handleCloseModal();
      }
    } else {
      setSelectedProduct(null);
    }
  }, [productParam]);

  if (!category) {
    notFound();
  }

  const products = getProductsByCategoryId(category.id);
  const subCategories = 'subCategory' in category && category.subCategory ? category.subCategory : [];

  const handleProductClick = (product: Product) => {
    const params = new URLSearchParams(searchParams);
    params.set('product', product.id);
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleCloseModal = () => {
    const params = new URLSearchParams(searchParams);
    params.delete('product');
    router.push(`${pathname}?${params.toString()}`);
  };
  
  const renderSubCategories = (subCats: SubCategory[]) => {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {subCats.map((subCat) => (
            <Link key={subCat.id} href={`/category/${subCat.id}`} className="group bg-card rounded-lg shadow-lg overflow-hidden flex flex-col cursor-pointer transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                <div className="relative h-56 w-full">
                <Image 
                    src={subCat.coverImage} 
                    alt={subCat.name} 
                    fill 
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" 
                />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-bold font-headline">{subCat.name}</h3>
                {subCat.description && <p className="mt-2 text-muted-foreground flex-1 line-clamp-2">{subCat.description}</p>}
                </div>
            </Link>
        ))}
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 pt-20">
        <section 
          className="py-12 md:py-20 bg-cover bg-center bg-no-repeat"
          style={{backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${category.categoryPageBanner.coverImage})`}}
        >
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center text-white mb-12">
              <h1 className="text-4xl md:text-5xl font-bold font-headline">
                {category.categoryPageBanner.title}
              </h1>
              <p className="mt-4 max-w-2xl mx-auto md:text-lg">
                {category.categoryPageBanner.subtitle}
              </p>
            </div>
          </div>
        </section>
        
        <section className="py-12 md:py-20">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold font-headline text-foreground">
                        {category.name}
                    </h2>
                    {category.description && <p className="mt-4 max-w-2xl mx-auto text-muted-foreground md:text-lg">{category.description}</p>}
                </div>
                
                {subCategories && subCategories.length > 0 ? renderSubCategories(subCategories) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {products.map((product) => (
                        <div 
                            key={product.id} 
                            className="bg-card rounded-lg shadow-lg overflow-hidden flex flex-col cursor-pointer transition-transform duration-300 hover:scale-105 hover:shadow-xl"
                            onClick={() => handleProductClick(product)}
                        >
                        <div className="relative h-56 w-full">
                            <Image 
                                src={product.images[0]} 
                                alt={product.name} 
                                fill 
                                className="object-cover"
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw" 
                            />
                        </div>
                        <div className="p-6 flex-1 flex flex-col">
                            <h3 className="text-xl font-bold font-headline">{product.name}</h3>
                            <p className="mt-2 text-muted-foreground flex-1 line-clamp-2" style={{ whiteSpace: 'pre-line' }}>{product.description}</p>
                            <div className="flex items-center mt-4">
                                <Star className="w-5 h-5 text-yellow-400 fill-yellow-400 mr-1" />
                                <span className="font-bold text-lg">{product.rating.toFixed(1)}</span>
                            </div>
                        </div>
                        </div>
                    ))}
                    </div>
                )}
             </div>
        </section>
      </main>
      <Footer />
      {selectedProduct && <ProductModal product={selectedProduct} onClose={handleCloseModal} />}
    </div>
  );
}
