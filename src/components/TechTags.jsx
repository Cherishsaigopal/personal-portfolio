import styles from "./ProjectCard.module.css";

function TechTags({ techStack }) {
  return (
    <div className={styles.tagsCont}>
      {techStack.map((tech) => (
        <div className={styles.tag} key={tech}>
          {tech}
        </div>
      ))}
    </div>
  );
}

export default TechTags;