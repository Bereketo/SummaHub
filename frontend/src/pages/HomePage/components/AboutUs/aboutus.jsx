import React from "react";
import styles from "../AboutUs/aboutus.module.css";

const About = () => {
  // const bottomRef = useRef(null);
  const d = new Date();
  
  return (
    <div className={styles.about} >
      <div className={styles.aboutus_wrapper}>
        <div className={styles.aboutinfo}>
          <h1 className={styles.aboutus_title}> About Us</h1>
          <h1 className={styles.logo_title}>
            {" "}
            SUMMA<strong>HUB</strong>
          </h1>
          <p>
            {" "}
            Welcome to <strong>SummaHub </strong>your go-to tool for concise
            text summaries and intelligent question generation. Ideal for
            students, educators, researchers, and professionals, SummaHub
            enhances your learning experience.
          </p>
         
          </div>
       
        <div className={styles.features}>
          <h1 className={styles.aboutus_title}> What we offer </h1>
          <ul>
            <li>🔹Text summarization </li>
            <li>🔹Question generation</li>
            <li>🔹Note taking </li>
            <li>🔹Enhanced learning</li>
            <li>🔹Time saving </li>
          </ul>
        </div>
        <div className={styles.vision_team}>
          <div className={styles.vision} >
            <h1 className={styles.aboutus_title}> Vision </h1>
            <ul>
              <li>🔹simplify complex text</li>
              <li>🔹empower students </li>
              <li>🔹enhance learning </li>
              <li>🔹generate question</li>
            </ul>
          </div>
          <div className={styles.team}>
            <h1 className={styles.aboutus_title}> Team </h1>
            <ul>
              <li>🔹Abemelek </li>
              <li>🔹Bereket Alebachew </li>
              <li>🔹Eyosyas Getahun</li>
              <li>🔹Eyerusalem Abate</li>
            </ul>
          </div>
          <div></div>
        </div>

        <div className={styles.contactUs}>
        <h1 className={styles.aboutus_title}> Contact Us</h1>
        <form className={styles.feedback_form} >
      <textarea
        placeholder="Write your feedback here..."
        required
      />
      <button type="submit">Send Feedback</button>
    </form>
        </div>
      </div>
      <footer>
        <p> @copyright {d.getFullYear()} Addis Ababa university</p>
      </footer>
    </div>
  );
};

export default About;
