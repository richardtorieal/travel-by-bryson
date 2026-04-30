import Navbar from "@/components/organisms/Navbar/Navbar";
import ServicesContent from "@/components/organisms/ServicesContent/ServicesContent";
import ScheduleSection from "@/components/organisms/ScheduleSection/ScheduleSection";
import Footer from "@/components/organisms/Footer/Footer";

export default function Services() {
  return (
    <main style={{ paddingTop: '80px' }}>
      <Navbar />
      <ServicesContent />
      <ScheduleSection />
      <Footer />
    </main>
  );
}
