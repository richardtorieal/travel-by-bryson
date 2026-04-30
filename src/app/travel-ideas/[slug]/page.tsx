import Navbar from "@/components/organisms/Navbar/Navbar";
import Footer from "@/components/organisms/Footer/Footer";
import Container from "@/components/atoms/Container/Container";
import Section from "@/components/atoms/Section/Section";
import ScheduleSection from "@/components/organisms/ScheduleSection/ScheduleSection";
import { TRAVEL_IDEAS } from "@/data/travelIdeas";
import { notFound } from "next/navigation";
import Image from "next/image";
import styles from "./BlogPost.module.scss";

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = TRAVEL_IDEAS.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <main style={{ paddingTop: '80px' }}>
      <Navbar />
      <Section variant="white" padding="xl">
        <Container className={styles.container}>
          <div className={styles.header}>
            <span className={styles.category}>{post.category}</span>
            <h1 className={styles.title}>{post.title.split(' ').map((word, i) => i === 2 ? <em key={i}>{word} </em> : word + ' ')}</h1>
            <span className={styles.date}>{post.date} | Curated by Bryson Adams</span>
          </div>

          <div className={styles.imageWrapper}>
            {post.image ? (
              <Image 
                src={post.image} 
                alt={post.title} 
                fill 
                className={styles.image}
                priority
              />
            ) : (
              <div className={styles.imagePlaceholder}></div>
            )}
          </div>

          <div className={styles.content}>
            {post.content.map((item, idx) => {
              if (item.type === 'heading') {
                return <h2 key={idx}>{item.value}</h2>;
              }
              if (item.type === 'text') {
                return <p key={idx}>{item.value}</p>;
              }
              if (item.type === 'image' && typeof item.value === 'string') {
                return (
                  <div key={idx} className={styles.inlineImageWrapper}>
                    <Image 
                      src={item.value} 
                      alt={item.alt || post.title} 
                      width={800} 
                      height={500} 
                      className={styles.inlineImage}
                    />
                    {item.alt && <span className={styles.imageCaption}>{item.alt}</span>}
                  </div>
                );
              }
              return null;
            })}
          </div>
        </Container>
      </Section>
      <ScheduleSection />
      <Footer />
    </main>
  );
}
