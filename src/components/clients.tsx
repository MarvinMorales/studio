"use client";

import { useState } from "react";
import Image from "next/image";
import { clientsData } from "@/lib/data";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function Clients() {
  const clientImages = clientsData;
  const [paused, setPaused] = useState(false);

  // Duplicate clients for infinite effect
  const tickerClients = [...clientImages, ...clientImages];

  return (
    <section className="bg-primary py-10">
       <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-primary-foreground text-2xl font-bold text-center mb-6">
            NUESTROS CLIENTES
        </h2>

        <div
            className="overflow-hidden relative"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
        >
            {/* Edge fade filters */}
            <div className="ticker-fade-left" />
            <div className="ticker-fade-right" />

            <div
            className={`flex w-max gap-6 animate-scroll ${paused ? "paused" : ""}`}
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
