import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.socialLinks}>
        <p>Thanks for visiting my portfolio. Let's stay connected!</p>
        
          <a href="https://github.com/cherishsaigopal"
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub"
        >
          <i className="fab fa-github"></i>
        </a>
        
          <a href="https://www.linkedin.com/in/cherish-sai-gopal-barlanka-4a9613369/"
          target="_blank"
          rel="noreferrer"
          aria-label="LinkedIn"
        >
          <i className="fab fa-linkedin"></i>
        </a>
      </div>
    </footer>
  );
}

export default Footer;