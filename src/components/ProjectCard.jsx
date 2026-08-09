import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./ProjectCard.module.css";
import TechTags from "./TechTags";

function ProjectCard({ id, number, title, description, techStack, link }) {
  const [isOpening, setIsOpening] = useState(false);

  return (
    <div className={styles.projectCard}>
      <div className={styles.number}>{number}</div>

      <div className={styles.projectDescp}>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>

      <TechTags techStack={techStack} />

      <Link
        to={`/projects/${id}`}
        className={styles.detailsBtn}
        onClick={() => setIsOpening(true)}
      >
        {isOpening ? "Opening..." : "View Details"}
      </Link>

      {link && (<a
        
          href={link}
          className={styles.viewField}
          target="_blank"
          rel="noreferrer"
        >
          View on GitHub
        </a>
      )}
    </div>
  );
}

export default ProjectCard;