"use client";

import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const clientLogos = PlaceHolderImages.filter(img => img.id.startsWith('client-'));

// Duplicamos los logos para asegurar un bucle infinito y suave
const duplicatedLogos = [...clientLogos, ...clientLogos];

export default function Clients() {
  return (
    <section id="clients" className="py-16 md:py-24 bg-secondary">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold font-headline text-foreground">
          Nuestros Clientes
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-muted-foreground md:text-lg">
          Agradecemos por la confianza en nuestros sistemas
        </p>
      </div>
      <div
        className="relative mt-12 w-full overflow-hidden"
        style={{ maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)" }}
      >
        <div className="flex animate-scroll">
          {duplicatedLogos.map((logo, index) => (
            <div
              key={`${logo.id}-${index}`}
              className="flex-shrink-0 mx-6"
            >
              <div className="bg-card rounded-full p-2 shadow-md w-24 h-24 flex items-center justify-center overflow-hidden">
                <Image
                  src={logo.imageUrl}
                  alt={logo.description}
                  width={80}
                  height={40}
                  className="object-contain"
                  data-ai-hint={logo.imageHint}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
