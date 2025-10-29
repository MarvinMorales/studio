
'use client'

import React, { useState, useEffect } from 'react';
import Header from '@/components/header';
import Hero from '@/components/hero';
import Categories from '@/components/categories';
import News from '@/components/news';
import Footer from '@/components/footer';
import Clients from '@/components/clients';
import { getWebsiteData } from '@/lib/data';
import VideoSection from '@/components/video-section';
import SuccessCases from '@/components/success-cases';

// Define a type for your website data to avoid 'any'
type WebsiteData = {
    heroSection: { showThisSection: boolean };
    fastCategoriesSection: { showThisSection: boolean };
    videoSection: { showThisSection: boolean };
    successCasesSection: { showThisSection: boolean };
};

export default function Home() {
  const [websiteData, setWebsiteData] = useState<WebsiteData | null>(null);

  useEffect(() => {
    async function loadData() {
      const data = await getWebsiteData();
      setWebsiteData(data as any); // Cast to any if type is complex
    }
    loadData();
  }, []);

  if (!websiteData) {
    return (
        <div className="flex items-center justify-center min-h-screen bg-background">
            <div>Loading...</div>
        </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1">
        {websiteData.heroSection.showThisSection && <Hero />}
        {websiteData.fastCategoriesSection.showThisSection && <Categories />}
        {websiteData.videoSection.showThisSection && <VideoSection />}
        <News />
        {websiteData.successCasesSection.showThisSection && <SuccessCases />}
        <Clients />
      </main>
      <Footer />
    </div>
  );
}
