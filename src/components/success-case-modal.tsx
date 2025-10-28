"use client";

import Image from "next/image";
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import type { SuccessCase } from "@/lib/data";

interface SuccessCaseModalProps {
  caseItem: SuccessCase;
  onClose: () => void;
}

export default function SuccessCaseModal({ caseItem, onClose }: SuccessCaseModalProps) {
  return (
    <Dialog open={!!caseItem} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="max-w-4xl w-[95vw] p-0">
        <div className="grid md:grid-cols-2">
          <div className="relative h-96 md:h-auto">
            <Carousel className="w-full h-full">
              <CarouselContent className="h-full">
                {caseItem.images.map((imgSrc, index) => (
                  <CarouselItem key={index} className="h-full">
                    <div className="relative h-full w-full">
                       <Image
                        src={imgSrc}
                        alt={`${caseItem.clientName} - imagen ${index + 1}`}
                        fill
                        className="object-cover md:rounded-l-lg rounded-t-lg md:rounded-t-none"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              {caseItem.images.length > 1 && (
                <>
                    <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 text-white bg-white/20 hover:bg-white/30 border-white/50" />
                    <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 text-white bg-white/20 hover:bg-white/30 border-white/50" />
                </>
              )}
            </Carousel>
          </div>
          <div className="p-6 md:p-8 flex flex-col">
            <h2 className="font-headline text-2xl md:text-3xl font-bold mb-4">{caseItem.clientName}</h2>
            <p className="text-base text-muted-foreground flex-1 mb-6" style={{ whiteSpace: 'pre-line' }}>
              {caseItem.description}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

    