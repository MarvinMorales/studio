
"use client";
import { useState, useEffect } from 'react';
import { getWebsiteData } from "@/lib/data";


type VideoSectionData = {
    showThisSection: boolean;
    videoId: string;
    title: string;
    description: string;
};

export default function VideoSection() {
    const [videoSection, setVideoSection] = useState<VideoSectionData | null>(null);

    useEffect(() => {
        async function loadData() {
            const webData = await getWebsiteData();
            setVideoSection(webData.videoSection as any);
        }
        loadData();
    }, []);

  if (!videoSection || !videoSection.showThisSection) {
    return null;
  }

  return (
      <section
        id="video-section"
        className="py-16 md:py-24 bg-secondary"
      >
        <div className="container mx-auto px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="text-center md:text-left">
                     <h2 className="text-3xl md:text-4xl font-bold font-headline text-foreground">
                        {videoSection.title}
                    </h2>
                    <p className="mt-4 max-w-2xl text-muted-foreground md:text-lg" style={{ whiteSpace: 'pre-line' }}>
                        {videoSection.description}
                    </p>
                </div>
                <div className="aspect-video rounded-lg overflow-hidden shadow-2xl">
                    <iframe
                        className="w-full h-full"
                        src={`https://www.youtube.com/embed/${videoSection.videoId}`}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
            </div>
        </div>
      </section>
  );
}
