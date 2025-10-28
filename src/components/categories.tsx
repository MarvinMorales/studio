import Image from "next/image";
import Link from "next/link";
import { categoriesData, websiteData } from "@/lib/data";

const categories = categoriesData;
const { fastCategoriesSection } = websiteData;

export default function Categories() {
  return (
    <section id="categories" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-headline text-foreground">{fastCategoriesSection.title}</h2>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground md:text-lg">
            Explora nuestra amplia gama de soluciones tecnológicas para retail.
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-8 gap-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/category/${category.id}`}
              className="group relative flex-shrink-0 w-full h-80 rounded-lg overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <Image
                  src={category.coverImage}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, (max-width: 1280px) 20vw, 12.5vw"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-primary/60 transition-colors duration-300" />
              <div className="absolute inset-0 flex items-end justify-center p-4">
                  <h3 className="text-lg font-bold text-center font-headline text-white drop-shadow-md">
                  {category.name}
                  </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
