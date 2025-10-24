import Image from "next/image";
import { Instagram } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Button } from "./ui/button";

const instagramPosts = PlaceHolderImages.filter(img => img.id.startsWith('insta-'));

export default function News() {
  return (
    <section id="news" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-headline">Novedades en Instagram</h2>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground md:text-lg">
            Síguenos en Instagram para estar al día de nuestros últimos productos y proyectos.
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-4">
          {instagramPosts.slice(0, 15).map((post) => (
            <a key={post.id} href="#" target="_blank" rel="noopener noreferrer" className="group relative block w-full aspect-square overflow-hidden rounded-md shadow-md">
              <Image
                src={post.imageUrl}
                alt={post.description}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                data-ai-hint={post.imageHint}
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <Instagram className="h-8 w-8 text-white" />
              </div>
            </a>
          ))}
        </div>
        <div className="text-center mt-12">
            <Button asChild size="lg">
                <a href="#" target="_blank" rel="noopener noreferrer">
                    <Instagram className="mr-2 h-5 w-5" />
                    Ver más en Instagram
                </a>
            </Button>
        </div>
      </div>
    </section>
  );
}
