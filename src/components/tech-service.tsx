import Link from "next/link";
import { Button } from "./ui/button";
import { websiteData } from "@/lib/data";

const { techServiceSection } = websiteData;

export default function TechService() {
    if (!techServiceSection.showThisSection) {
        return null;
    }

    return (
      <section 
        id="tech-service" 
        className="py-20 md:py-32 bg-cover bg-center bg-fixed"
        style={{backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${techServiceSection.backgroundImage})`}}
      >
        <div className="container mx-auto px-4 md:px-6 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold font-headline drop-shadow-md">{techServiceSection.title}</h2>
          <p className="mt-4 max-w-3xl mx-auto md:text-lg drop-shadow-md">
            {techServiceSection.subtitle}
          </p>
          <Button size="lg" className="mt-8" asChild>
            <Link href="/contact">{techServiceSection.button}</Link>
          </Button>
        </div>
      </section>
    );
}
