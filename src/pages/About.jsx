import aboutCards from "../data/aboutCards";
import Skills from "../components/Skills";
import styles from "./About.module.css";

function About() {
  return (
    <section className={styles.aboutSection}>
      <h1>About</h1>
      <div className={styles.aboutCont}>
        {aboutCards.map((card) => (
          <Skills key={card.id} title={card.title} description={card.description} />
        ))}
      </div>
    </section>
  );
}

export default About;