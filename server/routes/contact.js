import { Router } from "express";
import { addSubmission, getAllSubmissions } from "../data/contactsStore.js";

const router = Router();

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// POST /api/contact —> B4
router.post("/", (req, res) => {
  const { name, email, message } = req.body || {};

  if (!name || !String(name).trim()) {
    return res.status(400).json({ error: "Name is required" });
  }

  if (!email || !String(email).trim()) {
    return res.status(400).json({ error: "Email is required" });
  }
  if (!EMAIL_PATTERN.test(String(email).trim())) {
    return res.status(400).json({ error: "Enter a valid email" });
  }

  if (!message || !String(message).trim()) {
    return res.status(400).json({ error: "Message is required" });
  }

  const submission = addSubmission({
    name: String(name).trim(),
    email: String(email).trim(),
    message: String(message).trim(),
  });

  res.status(201).json({
    message: "Thanks! Your message has been received.",
    submission,
  });
});

// GET /api/contact —> B5
router.get("/", (req, res) => {
  res.status(200).json(getAllSubmissions());
});

export default router;