import React, { useRef } from "react";
import emailjs from '@emailjs/browser';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from "../AboutUs/aboutus.module.css";

const About = () => {
  const d = new Date();
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_6aitk7o', 'template_f0cvvvi', form.current, {
        publicKey: '4j-vD4XvwBkyWqUci',
      })
      .then(
        () => {
          toast.success('Feedback sent successfully!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        },
        (error) => {
          toast.error(`Error sending feedback: ${error.text}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        },
      );
  };

  return (
    <div className={styles.about}>
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
          <div className={styles.vision}>
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
        </div>

        <div className={styles.contactUs}>
          <h1 className={styles.aboutus_title}> Contact Us</h1>
          <form className={styles.feedback_form} onSubmit={sendEmail} ref={form}>
            <input
              type="email"
              name="user_email"
              placeholder="Your email"
              required
              className={styles.email_input}
            />
            <textarea
              placeholder="Write your feedback here..."
              name="message"
              required
            />
            <button type="submit">Send Feedback</button>
          </form>
        </div>
      </div>
      <footer>
        <p> @copyright {d.getFullYear()} Addis Ababa university</p>
      </footer>
      <ToastContainer />
    </div>
  );
};

export default About;
