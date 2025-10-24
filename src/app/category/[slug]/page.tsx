"use client";

import { useState } from 'react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Header from '@/components/header';
import Footer from '@/components/footer';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Star } from 'lucide-react';
import ProductModal from '@/components/product-modal';

export type Product = {
  id: number;
  name: string;
  description: string;
  images: string[];
  rating: number;
};

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const categoryId = `category-${slug}`;
  const category = PlaceHolderImages.find(img => img.id === categoryId);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  if (!category) {
    notFound();
  }

  // Simulación de productos para la categoría
  const products: Product[] = [
    { id: 1, name: 'Producto 1', description: 'Descripción detallada y extensa del producto 1 para demostrar el truncamiento de texto a dos líneas y la funcionalidad de los puntos suspensivos.', images: ['https://picsum.photos/seed/p1/800/600', 'https://picsum.photos/seed/p1-2/800/600'], rating: 4.5 },
    { id: 2, name: 'Producto 2', description: 'Esta es una descripción más corta para el producto 2 que no debería necesitar ser truncada.', images: ['https://picsum.photos/seed/p2/800/600'], rating: 4.8 },
    { id: 3, name: 'Producto 3', description: 'Otra descripción larga para el producto 3, que se cortará para mantener el diseño consistente y limpio en la vista de cuadrícula.', images: ['https://picsum.photos/seed/p3/800/600', 'https://picsum.photos/seed/p3-2/800/600', 'https://picsum.photos/seed/p3-3/800/600'], rating: 4.2 },
    { id: 4, name: 'Producto 4', description: 'Descripción concisa del producto 4.', images: ['https://picsum.photos/seed/p4/800/600'], rating: 5.0 },
    { id: 5, name: 'Producto 5', description: 'Descripción de producto número 5, diseñada para ser lo suficientemente larga como para ser truncada y mostrar los tres puntos.', images: ['https://picsum.photos/seed/p5/800/600'], rating: 3.9 },
    { id: 6, name: 'Producto 6', description: 'Descripción breve para el producto final de esta categoría, el número 6.', images: ['https://picsum.photos/seed/p6/800/600', 'https://picsum.photos/seed/p6-2/800/600'], rating: 4.6 },
  ];

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 pt-20">
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold font-headline text-foreground">
                {category.description}
              </h1>
              <p className="mt-4 max-w-2xl mx-auto text-muted-foreground md:text-lg">
                Explore nuestra selección de productos en la categoría {category.description}.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
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
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" 
                    />
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-bold font-headline">{product.name}</h3>
                    <p className="mt-2 text-muted-foreground flex-1 line-clamp-2">{product.description}</p>
                    <div className="flex items-center mt-4">
                        <Star className="w-5 h-5 text-yellow-400 fill-yellow-400 mr-1" />
                        <span className="font-bold text-lg">{product.rating.toFixed(1)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      {selectedProduct && <ProductModal product={selectedProduct} onClose={handleCloseModal} />}
    </div>
  );
}
