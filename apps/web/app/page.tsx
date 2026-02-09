import Navigation from '@/components/Navigation';
import HeroSection from '@/components/home/HeroSection';
import FeaturedModels from '@/components/home/FeaturedModels';
import PerformanceSection from '@/components/home/PerformanceSection';
import CTASection from '@/components/home/CTASection';
import Footer from '@/components/Footer';

async function getVehicles() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/vehicles`, { cache: "no-store" });
    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    console.error("Failed to fetch vehicles:", error);
    return [];
  }
}

export default async function Home() {
  const vehicles = await getVehicles();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <FeaturedModels vehicles={vehicles} />
      <PerformanceSection />
      <CTASection />
      <Footer />
    </div>
  );
}
