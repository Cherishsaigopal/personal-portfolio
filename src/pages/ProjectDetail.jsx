import { useParams, Link } from "react-router-dom";
import projects from "../data/projects";
import TechTags from "../components/TechTags";
import styles from "./ProjectDetail.module.css";

function ProjectDetail() {
  const { projectId } = useParams();
  const project = projects.find((p) => p.id === projectId);

  if (!project) {
    return (
      <section className={styles.detailSection}>
        <h1>Project Not Found</h1>
        <p>We couldn't find a project matching "{projectId}".</p>
        <Link to="/projects" className={styles.backLink}>
          Back to Projects
        </Link>
      </section>
    );
  }

  return (
    <section className={styles.detailSection}>
      <Link to="/projects" className={styles.backLink}>
        ← Back to Projects
      </Link>

      <h1>{project.title}</h1>
      <p className={styles.description}>{project.description}</p>

      <TechTags techStack={project.techStack} />

      {project.link && (<a
        
          href={project.link}
          className={styles.viewField}
          target="_blank"
          rel="noreferrer"
        >
          View on GitHub
        </a>
      )}
    </section>
  );
}

export default ProjectDetail;