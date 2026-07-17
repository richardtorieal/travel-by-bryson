import Navbar from "@/components/organisms/Navbar/Navbar";
import DestinationsContent from "@/components/organisms/DestinationsContent/DestinationsContent";
import ScheduleSection from "@/components/organisms/ScheduleSection/ScheduleSection";
import Footer from "@/components/organisms/Footer/Footer";
import { LAYOUT } from "@/constants/layout";
import { getAllDestinations } from "@/lib/tina";

export default async function Destinations() {
  const destinations = await getAllDestinations();

  return (
    <main style={{ paddingTop: LAYOUT.navbarHeight }}>
      <Navbar />
      <DestinationsContent destinations={destinations} />
      <ScheduleSection />
      <Footer />
    </main>
  );
}
