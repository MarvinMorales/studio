import Image from "next/image";
import { websiteData } from "@/lib/data";

const { landingBanner } = websiteData;

export default function LandingBanner() {
  if (!landingBanner.showBanner) {
    return null;
  }

  return (
    <section className="w-full">
      <div className="container mx-auto px-4 md:px-6">
        <div className="relative w-full aspect-[16/5] rounded-lg overflow-hidden">
          <Image
            src={landingBanner.bannerImage}
            alt="Banner"
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>
      </div>
    </section>
  );
}
