import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import styles from "./Layout.module.css";

function Layout({ theme, toggleTheme }) {
  return (
    <div className={styles.pageWrap}>
      <button
        onClick={toggleTheme}
        className={styles.toggleSwitch}
        role="switch"
        aria-checked={theme === "light"}
        aria-label="Toggle theme"
      >
        <span
          className={`${styles.toggleThumb} ${
            theme === "light" ? styles.toggleThumbLight : ""
          }`}
        />
      </button>

      <Navbar />
      <main className={styles.main}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;