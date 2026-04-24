import Navbar from "@/components/organisms/Navbar/Navbar";
import Container from "@/components/atoms/Container/Container";
import Section from "@/components/atoms/Section/Section";
import Footer from "@/components/organisms/Footer/Footer";

export default function Terms() {
  return (
    <main>
      <Navbar />
      <Section variant="white" padding="xl">
        <Container>
          <h1>Terms of Service</h1>
          <p style={{ marginTop: '2rem', color: '#5D6D7E' }}>
            By using our services, you agree to the following terms and conditions.
          </p>
          <p style={{ marginTop: '1rem', color: '#5D6D7E' }}>
            [Full Terms of Service content would go here]
          </p>
        </Container>
      </Section>
      <Footer />
    </main>
  );
}
