"use client";

import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { websiteData } from "@/lib/data";
import { Button } from "./ui/button";
import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";

const { heroSection } = websiteData;
const heroImages = heroSection.slides;
const canLoop = heroImages.length > 1;

export default function Hero() {
  return (
    <section className="relative w-full h-[70vh] md:h-[85vh]" aria-label="Carrusel de bienvenida">
      <Carousel
        className="w-full h-full"
        opts={{ loop: canLoop }}
        plugins={canLoop ? [Autoplay({ delay: 5000, stopOnInteraction: true })] : []}
      >
        <CarouselContent className="h-full">
          {heroImages.map((slide, index) => (
            <CarouselItem key={slide.id} className="h-full">
              <div className="relative h-full w-full">
                <Image
                  src={slide.image}
                  alt={slide.title || `Hero image ${index + 1}`}
                  fill
                  className="object-cover"
                  priority={index === 0}
                  sizes="100vw"
                />
                <div className="absolute inset-0 bg-black/50" />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
          {heroImages[0]?.showInfo && (
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-6xl font-bold font-headline drop-shadow-lg leading-tight">
                {heroImages[0].title || 'Soluciones Integrales de Seguridad Tecnológica'}
              </h1>
              <p className="mt-4 text-lg md:text-xl drop-shadow-md">
                {heroImages[0].subtitle || 'Protegemos lo que más importa con tecnología de vanguardia.'}
              </p>
              <Button size="lg" className="mt-8" asChild>
                  <Link href={heroImages[0].link || "#"}>
                      {heroImages[0].cta || 'Descubre Nuestros Productos'}
                  </Link>
              </Button>
            </div>
          )}
        </div>
        {canLoop && (
          <>
            <CarouselPrevious className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white bg-white/20 hover:bg-white/30 border-white/50" />
            <CarouselNext className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white bg-white/20 hover:bg-white/30 border-white/50" />
          </>
        )}
      </Carousel>
    </section>
  );
}
