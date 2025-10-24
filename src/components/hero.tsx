import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Button } from "./ui/button";
import Autoplay from "embla-carousel-autoplay";

const heroImages = PlaceHolderImages.filter(img => img.id.startsWith('hero-'));

export default function Hero() {
  return (
    <section className="relative w-full h-[85vh] md:h-screen" aria-label="Carrusel de bienvenida">
      <Carousel
        className="w-full h-full"
        opts={{ loop: true }}
        plugins={[Autoplay({ delay: 5000, stopOnInteraction: true })]}
      >
        <CarouselContent className="h-full">
          {heroImages.map((image, index) => (
            <CarouselItem key={image.id} className="h-full">
              <div className="relative h-full w-full">
                <Image
                  src={image.imageUrl}
                  alt={image.description}
                  fill
                  className="object-cover"
                  data-ai-hint={image.imageHint}
                  priority={index === 0}
                  sizes="100vw"
                />
                <div className="absolute inset-0 bg-black/50" />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="container mx-auto text-center text-white px-4">
            <h1 className="text-4xl md:text-6xl font-bold font-headline drop-shadow-lg leading-tight">
              Soluciones Integrales de Seguridad Tecnológica
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl drop-shadow-md">
              Protegemos lo que más importa con tecnología de vanguardia. Cámaras IP, control de acceso y más.
            </p>
            <Button size="lg" className="mt-8">
              Descubre Nuestros Productos
            </Button>
          </div>
        </div>
        <CarouselPrevious className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white bg-white/20 hover:bg-white/30 border-white/50" />
        <CarouselNext className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white bg-white/20 hover:bg-white/30 border-white/50" />
      </Carousel>
    </section>
  );
}
