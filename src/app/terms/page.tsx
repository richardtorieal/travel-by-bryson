import Navbar from "@/components/organisms/Navbar/Navbar";
import Container from "@/components/atoms/Container/Container";
import Section from "@/components/atoms/Section/Section";
import Footer from "@/components/organisms/Footer/Footer";
import { LAYOUT } from "@/constants/layout";

export default function Terms() {
  return (
    <main style={{ paddingTop: LAYOUT.navbarHeight }}>
      <Navbar />
      <Section variant="white" padding="xl">
        <Container>
          <h1>Terms of Service</h1>
          <p style={{ marginTop: LAYOUT.spacing.md, color: LAYOUT.colors.mutedText }}>
            By using our services, you agree to the following terms and conditions.
          </p>
          <p style={{ marginTop: LAYOUT.spacing.sm, color: LAYOUT.colors.mutedText }}>
            [Full Terms of Service content would go here]
          </p>
        </Container>
      </Section>
      <Footer />
    </main>
  );
}
