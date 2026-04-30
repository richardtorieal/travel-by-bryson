import Link from 'next/link';
import Navbar from '@/components/organisms/Navbar/Navbar';
import Footer from '@/components/organisms/Footer/Footer';
import Container from '@/components/atoms/Container/Container';
import Section from '@/components/atoms/Section/Section';

export default function NotFound() {
  return (
    <main>
      <Navbar />
      <Section variant="white" padding="xl">
        <Container>
          <div style={{ 
            textAlign: 'center', 
            padding: '4rem 0',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '40vh'
          }}>
            <h1 style={{ 
              fontSize: '4rem', 
              color: '#1A2B3C', 
              marginBottom: '1rem',
              fontFamily: 'serif' 
            }}>404</h1>
            <h2 style={{ 
              fontSize: '1.5rem', 
              color: '#1A2B3C', 
              marginBottom: '2rem' 
            }}>Page Not Found</h2>
            <p style={{ 
              fontSize: '1.125rem', 
              color: '#5D6D7E', 
              maxWidth: '600px', 
              marginBottom: '3rem',
              lineHeight: '1.6'
            }}>
              The journey you are looking for seems to have taken a different path. 
              Let us help you find your way back to your next destination.
            </p>
            <Link 
              href="/" 
              style={{
                backgroundColor: '#1A2B3C',
                color: '#FFFFFF',
                padding: '1rem 2.5rem',
                textDecoration: 'none',
                fontWeight: 'bold',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                borderRadius: '4px'
              }}
            >
              Return Home
            </Link>
          </div>
        </Container>
      </Section>
      <Footer />
    </main>
  );
}
