import projects from "../data/projects";
import ProjectCard from "../components/ProjectCard";
import styles from "./Projects.module.css";

function Projects() {
  return (
    <section className={styles.projectsSection}>
      <h1>Projects</h1>
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
    </section>
  );
}

export default Projects;