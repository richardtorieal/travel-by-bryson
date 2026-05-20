import Navbar from "@/components/organisms/Navbar/Navbar";
import ContactForm from "@/components/organisms/ContactForm/ContactForm";
import Footer from "@/components/organisms/Footer/Footer";
import { LAYOUT } from "@/constants/layout";

export default function Contact() {
  return (
    <main style={{ backgroundColor: LAYOUT.brandBackground, minHeight: '100vh' }}>
      <Navbar />
      <div style={{ paddingTop: LAYOUT.navbarHeight }}>
        <ContactForm />
      </div>
      <Footer />
    </main>
  );
}
