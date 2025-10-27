import Header from '@/components/header';
import Hero from '@/components/hero';
import Categories from '@/components/categories';
import News from '@/components/news';
import Footer from '@/components/footer';
import Clients from '@/components/clients';
import { websiteData } from '@/lib/data';
import LandingBanner from '@/components/landing-banner';
import WhyChooseUs from '@/components/why-choose-us';
import TechService from '@/components/tech-service';
import AllStateCoverage from '@/components/all-state-coverage';


export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1">
        {websiteData.heroSection.showThisSection && <Hero />}
        {websiteData.landingBanner.showBanner && <LandingBanner />}
        {websiteData.whyChooseUs.showThisSection && <WhyChooseUs />}
        {websiteData.techServiceSection.showThisSection && <TechService />}
        {websiteData.fastCategoriesSection.showThisSection && <Categories />}
        <News />
        {websiteData.allStateCoverage.showThisSection && <AllStateCoverage />}
        <Clients />
      </main>
      <Footer />
    </div>
  );
}
