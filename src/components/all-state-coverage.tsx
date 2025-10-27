import Image from "next/image";
import { websiteData } from "@/lib/data";

const { allStateCoverage } = websiteData;

export default function AllStateCoverage() {
  if (!allStateCoverage.showThisSection) {
    return null;
  }

  return (
    <section id="coverage" className="py-16 md:py-24 bg-secondary">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
          <div className="text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold font-headline">{allStateCoverage.title}</h2>
          </div>
          <div className="flex justify-center">
            <div className="relative w-64 h-64">
                <Image
                    src={allStateCoverage.image}
                    alt={allStateCoverage.title}
                    fill
                    className="object-contain"
                />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
