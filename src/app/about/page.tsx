import Navbar from "@/components/organisms/Navbar/Navbar";
import AboutContent from "@/components/organisms/AboutContent/AboutContent";
import ScheduleSection from "@/components/organisms/ScheduleSection/ScheduleSection";
import Footer from "@/components/organisms/Footer/Footer";

export default function About() {
  return (
    <main>
      <Navbar />
      <AboutContent />
      <ScheduleSection />
      <Footer />
    </main>
  );
}
