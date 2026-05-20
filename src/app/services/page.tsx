import Navbar from "@/components/organisms/Navbar/Navbar";
import ContactForm from "@/components/organisms/ContactForm/ContactForm";
import Footer from "@/components/organisms/Footer/Footer";
import { LAYOUT } from "@/constants/layout";

export default function Services() {
  return (
    <main style={{ paddingTop: LAYOUT.navbarHeight }}>
      <Navbar />
      <ContactForm />
      <Footer />
    </main>
  );
}
