import Navbar from "@/components/organisms/Navbar/Navbar";
import Container from "@/components/atoms/Container/Container";
import Section from "@/components/atoms/Section/Section";
import Footer from "@/components/organisms/Footer/Footer";
import { LAYOUT } from "@/constants/layout";

export default function Privacy() {
  return (
    <main style={{ paddingTop: LAYOUT.navbarHeight }}>
      <Navbar />
      <Section variant="white" padding="xl">
        <Container>
          <h1>Privacy Policy</h1>
          <p style={{ marginTop: LAYOUT.spacing.md, color: LAYOUT.colors.mutedText }}>
            Your privacy is important to us. This policy outlines how we handle your personal information.
          </p>
          <p style={{ marginTop: LAYOUT.spacing.sm, color: LAYOUT.colors.mutedText }}>
            [Full Privacy Policy content would go here]
          </p>
        </Container>
      </Section>
      <Footer />
    </main>
  );
}
