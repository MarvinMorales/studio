import Image from "next/image";
import Link from "next/link";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const categories = PlaceHolderImages.filter(img => img.id.startsWith('category-'));

export default function Categories() {
  return (
    <section id="categories" className="py-16 md:py-24 bg-card">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-headline text-foreground">Nuestras Categorías</h2>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground md:text-lg">
            Explora nuestra amplia gama de productos de seguridad de alta tecnología.
          </p>
        </div>
        <ScrollArea className="w-full whitespace-nowrap">
            <div className="flex w-max space-x-6 pb-4">
            {categories.map((category) => (
                <Link
                key={category.id}
                href={`/category/${category.id.replace('category-', '')}`}
                className="group relative rounded-lg overflow-hidden h-64 w-80 shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl inline-block"
                >
                <Image
                    src={category.imageUrl}
                    alt={category.description}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                    sizes="(max-width: 640px) 80vw, (max-width: 1024px) 40vw, 33vw"
                    data-ai-hint={category.imageHint}
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-primary/60 transition-colors duration-300" />
                <div className="absolute inset-0 flex items-center justify-center p-4">
                    <h3 className="text-2xl font-bold text-center font-headline text-white drop-shadow-md">
                    {category.description}
                    </h3>
                </div>
                </Link>
            ))}
            </div>
            <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </section>
  );
}
