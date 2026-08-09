import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import profileImg from "../assets/profile1.jpeg";
import styles from "./Home.module.css";

function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <section className={styles.loadingWrap}>
        <p>Loading...</p>
      </section>
    );
  }

  return (
    <section className={styles.intro}>
      <div className={styles.introText}>
        <h1>Hi, I'm Barlanka Cherish Sai Gopal</h1>
        <h3>Student of Computer Science Engineering | NIT Warangal</h3>
        <p>
          3rd-year CS student passionate about problem-solving and building
          efficient systems. <br />
          Currently seeking internship opportunities to grow as a software
          engineer.
        </p>
        <Link to="/projects" className={styles.btnLink}>
          View Projects
        </Link>
        <Link to="/contact" className={styles.btnLink}>
          Get in touch
        </Link>
      </div>
      <img src={profileImg} alt="Profile picture" className={styles.profileImg} />
    </section>
  );
}

export default Home;