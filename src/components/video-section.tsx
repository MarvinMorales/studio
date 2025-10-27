"use client";

import { useState } from "react";
import { PlayCircle, X } from "lucide-react";
import Image from "next/image";
import { websiteData } from "@/lib/data";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const { videoSection } = websiteData;

export default function VideoSection() {
  const [modalOpen, setModalOpen] = useState(false);

  if (!videoSection.showThisSection) {
    return null;
  }

  return (
    <>
      <section
        id="video-section"
        className="py-20 md:py-32 bg-cover bg-center relative"
        style={{ backgroundImage: `url(${videoSection.backgroundImage})` }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="container mx-auto px-4 md:px-6 text-center text-white relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold font-headline drop-shadow-md">
            {videoSection.title}
          </h2>
          <p className="mt-4 max-w-2xl mx-auto md:text-lg drop-shadow-md">
            {videoSection.description}
          </p>
          <button
            onClick={() => setModalOpen(true)}
            className="mt-8 text-white transition-transform duration-300 hover:scale-110"
            aria-label="Reproducir video"
          >
            <PlayCircle className="w-20 h-20 drop-shadow-lg" />
          </button>
        </div>
      </section>

      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="p-0 bg-black border-0 max-w-4xl w-[95vw] h-auto aspect-video">
          <button
            onClick={() => setModalOpen(false)}
            className="absolute -top-10 right-0 text-white z-50"
            aria-label="Cerrar video"
          >
            <X className="w-8 h-8" />
          </button>
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${videoSection.videoId}?autoplay=1`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </DialogContent>
      </Dialog>
    </>
  );
}
