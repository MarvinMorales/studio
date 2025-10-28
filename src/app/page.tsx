import Header from '@/components/header';
import Hero from '@/components/hero';
import Categories from '@/components/categories';
import News from '@/components/news';
import Footer from '@/components/footer';
import Clients from '@/components/clients';
import { websiteData } from '@/lib/data';
import VideoSection from '@/components/video-section';
import SuccessCases from '@/components/success-cases';


export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1">
        {websiteData.heroSection.showThisSection && <Hero />}
        {websiteData.videoSection.showThisSection && <VideoSection />}
        {websiteData.fastCategoriesSection.showThisSection && <Categories />}
        <News />
        {websiteData.successCasesSection.showThisSection && <SuccessCases />}
        <Clients />
      </main>
      <Footer />
    </div>
  );
}

    