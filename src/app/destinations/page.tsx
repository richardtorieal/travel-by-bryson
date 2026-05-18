import Navbar from "@/components/organisms/Navbar/Navbar";
import DestinationsContent from "@/components/organisms/DestinationsContent/DestinationsContent";
import ScheduleSection from "@/components/organisms/ScheduleSection/ScheduleSection";
import Footer from "@/components/organisms/Footer/Footer";
import { LAYOUT } from "@/constants/layout";

export default function Destinations() {
  return (
    <main style={{ paddingTop: LAYOUT.navbarHeight }}>
      <Navbar />
      <DestinationsContent />
      <ScheduleSection />
      <Footer />
    </main>
  );
}
