import Navbar from "@/components/organisms/Navbar/Navbar";
import Footer from "@/components/organisms/Footer/Footer";
import Section from "@/components/atoms/Section/Section";
import Container from "@/components/atoms/Container/Container";
import { LAYOUT } from "@/constants/layout";

export default function TravelIdeas() {
  return (
    <main style={{ backgroundColor: LAYOUT.brandBackground, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', paddingTop: LAYOUT.navbarHeight }}>
        <Section variant="white" padding="section-std">
          <Container>
            <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
              <h1 style={{ fontSize: '3rem', marginBottom: '1rem', fontFamily: 'var(--font-primary)', color: 'var(--text-primary)' }}>Travel <em>Ideas</em></h1>
              <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)' }}>
                Curated travel inspiration and blog posts are coming soon. Check back later for expert tips, destination highlights, and itinerary ideas.
              </p>
            </div>
          </Container>
        </Section>
      </div>
      <Footer />
    </main>
  );
}