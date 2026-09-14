import { useState, useEffect } from "react";
import ProjectCard from "../components/ProjectCard";
import styles from "./Projects.module.css";
// F1 & F2
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;

    async function fetchProjects() {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`${API_BASE_URL}/api/projects`);
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const data = await response.json();
        if (!ignore) {
          setProjects(data);
        }
      } catch (err) {
        if (!ignore) {
          setError(
            "Couldn't load projects right now. Problem at server!"
          );
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    }

    fetchProjects();

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <section className={styles.projectsSection}>
      <h1>Projects</h1>

      {isLoading && <p className={styles.statusText}>Loading projects...</p>}

      {!isLoading && error && <p className={styles.errorText}>{error}</p>}

      {!isLoading && !error && (
        <div className={styles.projectCont}>
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              id={project.id}
              number={String(index + 1).padStart(2, "0")}
              title={project.title}
              description={project.description}
              techStack={project.techStack}
              link={project.link}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default Projects;