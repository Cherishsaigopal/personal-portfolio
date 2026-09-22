import { readFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// takes DATA_FILE_PATH (from .env) relative to /server, if not present uses default path
const dataFilePath = path.resolve(
  process.cwd(),
  process.env.DATA_FILE_PATH || "./data/projects.json"
);

let cachedProjects = null;

async function loadProjects() {
  if (cachedProjects) return cachedProjects;
  const raw = await readFile(dataFilePath, "utf-8");
  cachedProjects = JSON.parse(raw);
  return cachedProjects;
}

export async function getAllProjects() {
  return loadProjects();
}

export async function getProjectById(id) {
  const projects = await loadProjects();
  return projects.find((p) => p.id === id) || null;
}

export { __dirname as projectsDirname };