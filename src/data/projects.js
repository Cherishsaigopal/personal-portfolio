const projects = [
  {
    id: "multithread-task-scheduler",
    title: "Multithread Task Scheduler",
    description:
      "This project implements a ThreadPool - a classical concurrency pattern that manages a pool of worker threads to execute tasks asynchronously. Instead of creating a new thread for each task, the pool maintains a configurable number of persistent worker threads that pull tasks from a shared queue and execute them.",
    techStack: ["C++ 17", "Multithreading", "Priority Based Scheduling", "Threads"],
    image: null,
    link: "https://github.com/Cherishsaigopal/multithread-task-scheduler#overview",
  },
  {
    id: "inventory-management-system",
    title: "Inventory Management System",
    description:
      "Designed and implemented a normalized relational database consisting of 8+ interconnected tables for managing suppliers, inventory, orders, shipments, storage, and raw materials using primary and foreign key constraints. Performed ER modeling, functional dependency analysis, and BCNF normalization to eliminate redundancy and maintain data integrity across the database schema.",
    techStack: ["Oracle SQL", "DBMS", "Normalisation"],
    image: null,
    link: null,
  },
  {
    id: "ml-dead-code-and-vuln-predictor",
    title: "ML Dead Code and Vulnerability Predictor",
    description:
      "An intelligent machine learning-based secure compilation pipeline that automatically detects dead code and security vulnerabilities in C/C++ source files during compilation.",
    techStack: ["Python", "Machine Learning", "Dead Detection", "Vulnerability Detection"],
    image: null,
    link: "https://github.com/Cherishsaigopal/ml-dead-code-and-vuln-predictor",
  },
];

export default projects;