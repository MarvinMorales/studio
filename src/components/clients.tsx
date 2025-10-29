"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { clientsData } from "@/lib/data";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

export default function Clients() {
  const clientImages = clientsData;
  const [paused, setPaused] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const tickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const calculateAnimation = () => {
      if (containerRef.current && tickerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const tickerWidth = tickerRef.current.scrollWidth / 2; // Use half width because the list is duplicated for animation
        
        if (tickerWidth > containerWidth) {
          setShouldAnimate(true);
        } else {
          setShouldAnimate(false);
        }
      }
    };

    calculateAnimation();
    
    window.addEventListener('resize', calculateAnimation);
    return () => window.removeEventListener('resize', calculateAnimation);
  }, [clientImages]);


  // Duplicate clients for infinite effect only if animation is needed
  const tickerClients = shouldAnimate ? [...clientImages, ...clientImages] : clientImages;

  return (
    <section className="bg-primary py-10">
       <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-primary-foreground text-2xl font-bold text-center mb-6">
            NUESTROS CLIENTES
        </h2>

        <div
            ref={containerRef}
            className="overflow-hidden relative"
            onMouseEnter={() => shouldAnimate && setPaused(true)}
            onMouseLeave={() => shouldAnimate && setPaused(false)}
        >
            {shouldAnimate && (
              <>
                <div className="ticker-fade-left" />
                <div className="ticker-fade-right" />
              </>
            )}

            <div
                ref={tickerRef}
                className={cn(
                    "flex w-max gap-6",
                    shouldAnimate ? "animate-scroll" : "justify-center w-full",
                    paused ? "paused" : ""
                )}
            >
            {tickerClients.map((elem, i) => (
                <TooltipProvider key={i}>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <div className="w-20 h-20 bg-white rounded-full overflow-hidden border-2 border-white flex-shrink-0">
                                <Image
                                src={elem.clientImage}
                                alt={elem.name}
                                width={80}
                                height={80}
                                className="w-full h-full object-contain p-2"
                                />
                            </div>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>{elem.name}</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            ))}
            </div>
        </div>

        <p className="text-center text-primary-foreground font-semibold mt-6 text-sm md:text-base">
            AGRADECEMOS POR LA CONFIANZA EN NUESTROS SISTEMAS
        </p>
       </div>
    </section>
  );
}
