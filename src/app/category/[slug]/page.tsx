import { PlaceHolderImages } from '@/lib/placeholder-images';
import Header from '@/components/header';
import Footer from '@/components/footer';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';

export async function generateStaticParams() {
  const categories = PlaceHolderImages.filter(img => img.id.startsWith('category-'));
  return categories.map((category) => ({
    slug: category.id.replace('category-', ''),
  }));
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const categoryId = `category-${slug}`;
  const category = PlaceHolderImages.find(img => img.id === categoryId);

  if (!category) {
    notFound();
  }

  // Simulación de productos para la categoría
  const products = [
    { id: 1, name: 'Producto 1', description: 'Descripción breve del producto 1.', image: 'https://picsum.photos/seed/p1/400/300' },
    { id: 2, name: 'Producto 2', description: 'Descripción breve del producto 2.', image: 'https://picsum.photos/seed/p2/400/300' },
    { id: 3, name: 'Producto 3', description: 'Descripción breve del producto 3.', image: 'https://picsum.photos/seed/p3/400/300' },
    { id: 4, name: 'Producto 4', description: 'Descripción breve del producto 4.', image: 'https://picsum.photos/seed/p4/400/300' },
    { id: 5, name: 'Producto 5', description: 'Descripción breve del producto 5.', image: 'https://picsum.photos/seed/p5/400/300' },
    { id: 6, name: 'Producto 6', description: 'Descripción breve del producto 6.', image: 'https://picsum.photos/seed/p6/400/300' },
  ];

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
                <div key={product.id} className="bg-card rounded-lg shadow-lg overflow-hidden flex flex-col">
                  <div className="relative h-56 w-full">
                    <Image 
                        src={product.image} 
                        alt={product.name} 
                        fill 
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" 
                    />
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-bold font-headline">{product.name}</h3>
                    <p className="mt-2 text-muted-foreground flex-1">{product.description}</p>
                    <Button className="mt-4 w-full">Ver Detalles</Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
