"use client"

import { Button } from "./ui/button";
import { websiteData } from "@/lib/data";

const { techServiceSection } = websiteData;

export default function TechService() {
  if (!techServiceSection.showThisSection) {
    return null;
  }
  return (
    <section
      className="py-20 md:py-32 bg-cover bg-center relative"
      style={{ backgroundImage: `url(${techServiceSection.backgroundImage})` }}
    >
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="container mx-auto px-4 md:px-6 text-center text-white relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold font-headline drop-shadow-md">
          {techServiceSection.title}
        </h2>
        <p className="mt-4 max-w-2xl mx-auto md:text-lg drop-shadow-md">
          {techServiceSection.subtitle}
        </p>
        <Button size="lg" className="mt-8">
          {techServiceSection.button}
        </Button>
      </div>
    </section>
  )
}
