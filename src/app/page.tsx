import Header from '@/components/header';
import Hero from '@/components/hero';
import Categories from '@/components/categories';
import News from '@/components/news';
import VideoSection from '@/components/video-section';
import SuccessStories from '@/components/success-stories';
import Footer from '@/components/footer';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1">
        <Hero />
        <Categories />
        <News />
        <VideoSection />
        <SuccessStories />
      </main>
      <Footer />
    </div>
  );
}
