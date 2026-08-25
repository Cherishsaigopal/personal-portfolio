import { useState } from "react";
import styles from "./ContactForm.module.css";

function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  }

  function validateField(name, value) {
    if (name === "email") {
      if (!value.trim()) return "Email is required";
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(value)) return "Enter a valid email";
      return "";
    }
    if(name==="name"&&/\d/.test(value))return `${name[0].toUpperCase() + name.slice(1)} Cannot contain numbers`;
    if (!value.trim()) return `${name[0].toUpperCase() + name.slice(1)} is required`;
    return "";
  }

  function isFormValid() {
    return (
      formData.name.trim() !== "" &&
      formData.email.trim() !== "" &&
      formData.message.trim() !== "" &&
      !errors.name &&
      !errors.email &&
      !errors.message
    );
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!isFormValid()) return;

    setSubmitted(true);
    setFormData({ name: "", email: "", message: "" });

    setTimeout(() => setSubmitted(false), 3000);
  }

  return (
    <form className={styles.contactForm} onSubmit={handleSubmit}>
      <div className={styles.formFields}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Enter your name"
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && <span className={styles.errorText}>{errors.name}</span>}
      </div>

      <div className={styles.formFields}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter your email-id"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <span className={styles.errorText}>{errors.email}</span>}
      </div>

      <div className={styles.formFields}>
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          rows="5"
          placeholder="Write your message"
          value={formData.message}
          onChange={handleChange}
        />
        {errors.message && <span className={styles.errorText}>{errors.message}</span>}
      </div>

      <button type="submit" disabled={!isFormValid()}>
        Send
      </button>

      {submitted && <p className={styles.successText}>Message sent successfully!</p>}
    </form>
  );
}

export default ContactForm;