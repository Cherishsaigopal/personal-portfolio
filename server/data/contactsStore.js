let submissions = [];
let nextId = 1;

export function addSubmission({ name, email, message }) {
  const submission = {
    id: nextId++,
    name,
    email,
    message,
    receivedAt: new Date().toISOString(),
  };
  submissions.push(submission);
  return submission;
}

export function getAllSubmissions() {
  return submissions;
}