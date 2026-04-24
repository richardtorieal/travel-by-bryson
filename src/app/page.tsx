import Navbar from "@/components/organisms/Navbar/Navbar";
import VideoHero from "@/components/organisms/VideoHero/VideoHero";
import PerksGrid from "@/components/organisms/PerksGrid/PerksGrid";
import TestimonialGrid from "@/components/organisms/TestimonialGrid/TestimonialGrid";
import TravelIdeasGrid from "@/components/organisms/TravelIdeasGrid/TravelIdeasGrid";
import ScheduleSection from "@/components/organisms/ScheduleSection/ScheduleSection";
import Footer from "@/components/organisms/Footer/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <VideoHero />
      <PerksGrid />
      <TravelIdeasGrid />
      <TestimonialGrid />
      <ScheduleSection />
      <Footer />
    </main>
  );
}
