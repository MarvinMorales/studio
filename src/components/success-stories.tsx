"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { PlaceHolderImages, type ImagePlaceholder } from '@/lib/placeholder-images';

const successStories = PlaceHolderImages.filter(img => img.id.startsWith('success-'));

export default function SuccessStories() {
  const [selectedStory, setSelectedStory] = useState<ImagePlaceholder | null>(null);

  return (
    <>
      <section id="success-stories" className="py-16 md:py-24 bg-card">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-headline">Casos de Éxito</h2>
            <p className="mt-4 max-w-2xl mx-auto text-muted-foreground md:text-lg">
              Vea cómo hemos ayudado a empresas como la suya a mejorar su seguridad y eficiencia.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {successStories.map((story) => (
              <div
                key={story.id}
                className="group relative rounded-lg overflow-hidden h-64 shadow-lg cursor-pointer transform transition-transform duration-300 hover:scale-105 hover:shadow-xl"
                onClick={() => setSelectedStory(story)}
                onKeyDown={(e) => e.key === 'Enter' && setSelectedStory(story)}
                role="button"
                tabIndex={0}
                aria-label={`Ver caso de éxito: ${story.description}`}
              >
                <Image
                  src={story.imageUrl}
                  alt={story.description}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  data-ai-hint={story.imageHint}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent group-hover:from-black/80 transition-colors duration-300 flex items-end p-4">
                  <h3 className="text-lg font-bold font-headline text-white">
                    {story.description}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Dialog open={!!selectedStory} onOpenChange={(isOpen) => !isOpen && setSelectedStory(null)}>
        <DialogContent className="max-w-4xl w-[95vw] p-0">
          {selectedStory && (
            <div className="grid md:grid-cols-2">
              <div className="relative h-64 md:h-auto min-h-[300px]">
                <Image
                  src={selectedStory.imageUrl}
                  alt={selectedStory.description}
                  fill
                  className="object-cover md:rounded-l-lg rounded-t-lg md:rounded-t-none"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  data-ai-hint={selectedStory.imageHint}
                />
              </div>
              <div className="p-6 md:p-8">
                <DialogHeader>
                  <DialogTitle className="font-headline text-2xl mb-2">{selectedStory.description}</DialogTitle>
                  <DialogDescription asChild>
                    <div className="text-base text-muted-foreground space-y-4">
                      <p>
                        Aquí va una descripción detallada del caso de éxito. Explicamos el desafío del cliente, la solución que implementamos con nuestros productos de OneSecurity Vision, y los resultados obtenidos.
                      </p>
                      <p>
                        Por ejemplo, una reducción del 30% en incidentes de seguridad y una mejora en la eficiencia operativa gracias a nuestro sistema de cámaras IP y control de acceso RFID.
                      </p>
                    </div>
                  </DialogDescription>
                </DialogHeader>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
