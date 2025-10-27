"use client";

import Image from "next/image";
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Button } from "./ui/button";
import { Star, MessageCircle } from "lucide-react";
import type { Product } from "@/lib/data";
import { websiteData } from "@/lib/data";

interface ProductModalProps {
  product: Product;
  onClose: () => void;
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
  const whatsappNumber = websiteData.businessInformation.whatsappNumber;
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Hola, estoy interesado en el producto: ${product.name}`)}`;

  return (
    <Dialog open={!!product} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="max-w-4xl w-[95vw] p-0">
        <div className="grid md:grid-cols-2">
          <div className="relative h-96 md:h-auto">
            <Carousel className="w-full h-full">
              <CarouselContent className="h-full">
                {product.images.map((imgSrc, index) => (
                  <CarouselItem key={index} className="h-full">
                    <div className="relative h-full w-full">
                       <Image
                        src={imgSrc}
                        alt={`${product.name} - imagen ${index + 1}`}
                        fill
                        className="object-cover md:rounded-l-lg rounded-t-lg md:rounded-t-none"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              {product.images.length > 1 && (
                <>
                    <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 text-white bg-white/20 hover:bg-white/30 border-white/50" />
                    <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 text-white bg-white/20 hover:bg-white/30 border-white/50" />
                </>
              )}
            </Carousel>
          </div>
          <div className="p-6 md:p-8 flex flex-col">
            <h2 className="font-headline text-2xl md:text-3xl font-bold mb-2">{product.name}</h2>
            <div className="flex items-center mb-4">
                <Star className="w-5 h-5 text-yellow-400 fill-yellow-400 mr-1" />
                <span className="font-bold text-lg">{product.rating.toFixed(1)}</span>
            </div>
            <p className="text-base text-muted-foreground flex-1 mb-6" style={{ whiteSpace: 'pre-line' }}>
              {product.description}
            </p>
            <Button asChild size="lg">
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="mr-2 h-5 w-5" />
                    Solicitar Información
                </a>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
