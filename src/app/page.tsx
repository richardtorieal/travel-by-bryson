import Navbar from "@/components/organisms/Navbar/Navbar";
import VideoHero from "@/components/organisms/VideoHero/VideoHero";
import PerksGrid from "@/components/organisms/PerksGrid/PerksGrid";
import TestimonialCarousel from "@/components/organisms/TestimonialCarousel/TestimonialCarousel";
import ScheduleSection from "@/components/organisms/ScheduleSection/ScheduleSection";
import Footer from "@/components/organisms/Footer/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <VideoHero />
      <PerksGrid />
      <TestimonialCarousel />
      <ScheduleSection />
      <Footer />
    </main>
  );
}
