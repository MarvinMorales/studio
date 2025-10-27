import Image from "next/image";
import { websiteData } from "@/lib/data";

const { allStateCoverage } = websiteData;

export default function AllStateCoverage() {
  if (!allStateCoverage.showThisSection) {
    return null;
  }

  return (
    <section className="py-16 md:py-24 bg-secondary">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold font-headline text-foreground">
              {allStateCoverage.title}
            </h2>
          </div>
          <div className="flex justify-center">
            <Image
              src={allStateCoverage.image}
              alt="Ecuador Map"
              width={300}
              height={300}
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
