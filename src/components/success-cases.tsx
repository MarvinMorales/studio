
"use client";

import { useState } from 'react';
import Image from "next/image";
import { websiteData, successCasesData, SuccessCase } from "@/lib/data";
import SuccessCaseModal from './success-case-modal';

const { successCasesSection } = websiteData;

export default function SuccessCases() {
  const [selectedCase, setSelectedCase] = useState<SuccessCase | null>(null);

  if (!successCasesSection.showThisSection) {
    return null;
  }

  const handleOpenModal = (caseItem: SuccessCase) => {
    setSelectedCase(caseItem);
  };

  const handleCloseModal = () => {
    setSelectedCase(null);
  };

  return (
    <section id="success-cases" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-headline text-foreground">
            {successCasesSection.title}
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground md:text-lg">
            {successCasesSection.subtitle}
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {successCasesData.map((caseItem) => (
            <div
              key={caseItem.id}
              className="group bg-card rounded-lg shadow-lg overflow-hidden flex flex-col cursor-pointer transition-transform duration-300 hover:scale-105 hover:shadow-xl"
              onClick={() => handleOpenModal(caseItem)}
            >
              <div className="relative h-64 w-full">
                <Image
                  src={caseItem.coverImage}
                  alt={`Caso de éxito de ${caseItem.clientName}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                 <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
              </div>
              <div className="p-6 flex-1 flex items-center justify-center">
                <h3 className="text-xl font-bold font-headline text-center">{caseItem.clientName}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
      {selectedCase && <SuccessCaseModal caseItem={selectedCase} onClose={handleCloseModal} />}
    </section>
  );
}

    