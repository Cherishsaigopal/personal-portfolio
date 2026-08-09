import ContactForm from "../components/ContactForm";
import styles from "./Contact.module.css";

function Contact() {
  return (
    <section className={styles.contactSection}>
      <h1>Contact</h1>
      <p>
        Whether you're looking to collaborate, discuss a project, or explore
        new opportunities, I'd be glad to connect. Let's create something
        meaningful together.
      </p>
      <ContactForm />
    </section>
  );
}

export default Contact;