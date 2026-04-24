import Navbar from "@/components/organisms/Navbar/Navbar";
import Footer from "@/components/organisms/Footer/Footer";
import Container from "@/components/atoms/Container/Container";
import Section from "@/components/atoms/Section/Section";
import ScheduleSection from "@/components/organisms/ScheduleSection/ScheduleSection";
import { TRAVEL_IDEAS } from "@/data/travelIdeas";
import { notFound } from "next/navigation";
import styles from "./BlogPost.module.scss";

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = TRAVEL_IDEAS.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <main>
      <Navbar />
      <Section variant="white" padding="xl">
        <Container className={styles.container}>
          <div className={styles.header}>
            <span className={styles.category}>{post.category}</span>
            <h1 className={styles.title}>{post.title}</h1>
            <span className={styles.date}>{post.date} | Curated by Bryson Adams</span>
          </div>

          <div className={styles.imagePlaceholder}></div>

          <div className={styles.content}>
            {post.content.map((item, idx) => {
              if (item.type === 'heading') {
                return <h2 key={idx}>{item.value}</h2>;
              }
              if (item.type === 'text') {
                return <p key={idx}>{item.value}</p>;
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
