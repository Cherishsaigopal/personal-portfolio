import { Router } from "express";
import { getAllProjects, getProjectById } from "../data/projectsStore.js";

const router = Router();

// GET /api/projects —> B2
router.get("/", async (req, res, next) => {
  try {
    const projects = await getAllProjects();
    res.status(200).json(projects);
  } catch (err) {
    next(err);
  }
});

// GET /api/projects/:id —> B3
router.get("/:id", async (req, res, next) => {
  try {
    const project = await getProjectById(req.params.id);
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }
    res.status(200).json(project);
  } catch (err) {
    next(err);
  }
});

export default router;