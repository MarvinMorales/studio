"use client";

import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Autoplay from "embla-carousel-autoplay";

const clientLogos = PlaceHolderImages.filter(img => img.id.startsWith('client-'));

export default function Clients() {
  const duplicatedLogos = [...clientLogos, ...clientLogos];

  return (
    <section id="clients" className="py-16 md:py-24 bg-primary/10">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold font-headline text-foreground">
          Nuestros Clientes
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-muted-foreground md:text-lg">
          Agradecemos por la confianza en nuestros sistemas
        </p>
      </div>
      <div className="w-full mt-12">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 2000,
              stopOnInteraction: false,
              stopOnMouseEnter: true,
            }),
          ]}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {duplicatedLogos.map((logo, index) => (
              <CarouselItem
                key={`${logo.id}-${index}`}
                className="pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/6 xl:basis-1/8 flex items-center justify-center"
              >
                <div className="p-1">
                  <div className="bg-white rounded-full p-4 shadow-md w-32 h-32 flex items-center justify-center">
                    <Image
                      src={logo.imageUrl}
                      alt={logo.description}
                      width={140}
                      height={60}
                      className="object-contain"
                      data-ai-hint={logo.imageHint}
                    />
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}
