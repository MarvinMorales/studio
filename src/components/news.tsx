
'use client'

import { useState, useEffect } from 'react';
import Image from "next/image";
import { Instagram } from "lucide-react";
import { getInstagramPostsData, InstagramPost } from "@/lib/data";
import { Button } from "./ui/button";


export default function News() {
  const [instagramPosts, setInstagramPosts] = useState<InstagramPost[]>([]);

  useEffect(() => {
    async function loadData() {
        const data = await getInstagramPostsData();
        setInstagramPosts(data);
    }
    loadData();
  }, []);

  if (instagramPosts.length === 0) {
    return (
      <section id="news" className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-headline">Cargando Novedades...</h2>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="news" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-headline">Novedades en Instagram</h2>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground md:text-lg">
            Síguenos en Instagram para estar al día de nuestros últimos productos y proyectos.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
          {instagramPosts.map((post) => (
            <a key={post.id} href={post.redirection} target="_blank" rel="noopener noreferrer" className="group relative block w-full aspect-square overflow-hidden rounded-md shadow-md">
              <Image
                src={post.image}
                alt={post.caption}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                <p className="text-white text-center text-sm line-clamp-4">{post.caption}</p>
                <Instagram className="h-8 w-8 text-white absolute bottom-4 right-4" />
              </div>
            </a>
          ))}
        </div>
        <div className="text-center mt-12">
            <Button asChild size="lg">
                <a href="https://www.instagram.com/retailpointecuador/" target="_blank" rel="noopener noreferrer">
                    <Instagram className="mr-2 h-5 w-5" />
                    Ver más en Instagram
                </a>
            </Button>
        </div>
      </div>
    </section>
  );
}
