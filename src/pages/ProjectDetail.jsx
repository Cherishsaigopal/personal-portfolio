import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import TechTags from "../components/TechTags";
import styles from "./ProjectDetail.module.css";
// F3
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

function ProjectDetail() {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;

    async function fetchProject() {
      setIsLoading(true);
      setError(null);
      setNotFound(false);
      setProject(null);

      try {
        const response = await fetch(`${API_BASE_URL}/api/projects/${projectId}`);

        if (response.status === 404) {
          if (!ignore) setNotFound(true);
          return;
        }

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const data = await response.json();
        if (!ignore) setProject(data);
      } catch (err) {
        if (!ignore) {
          setError(
            "Couldn't load this project right now. Sorry for the inconvenience!"
          );
        }
      } finally {
        if (!ignore) setIsLoading(false);
      }
    }

    fetchProject();

    return () => {
      ignore = true;
    };
  }, [projectId]);

  if (isLoading) {
    return (
      <section className={styles.detailSection}>
        <p>Loading project...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className={styles.detailSection}>
        <h1>Something went wrong</h1>
        <p>{error}</p>
        <Link to="/projects" className={styles.backLink}>
          Back to Projects
        </Link>
      </section>
    );
  }

  if (notFound || !project) {
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