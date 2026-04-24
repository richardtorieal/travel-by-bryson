import Navbar from "@/components/organisms/Navbar/Navbar";
import Container from "@/components/atoms/Container/Container";
import Section from "@/components/atoms/Section/Section";
import Footer from "@/components/organisms/Footer/Footer";

export default function Privacy() {
  return (
    <main>
      <Navbar />
      <Section variant="white" padding="xl">
        <Container>
          <h1>Privacy Policy</h1>
          <p style={{ marginTop: '2rem', color: '#5D6D7E' }}>
            Your privacy is important to us. This policy outlines how we handle your personal information.
          </p>
          <p style={{ marginTop: '1rem', color: '#5D6D7E' }}>
            [Full Privacy Policy content would go here]
          </p>
        </Container>
      </Section>
      <Footer />
    </main>
  );
}
