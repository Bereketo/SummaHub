// import React from 'react'
// import styles from './section.module.css'

// function Section() {
//   return (
//     <div className={styles.section_wrapper}>
//         <div className={styles.left_part}>

//         </div>
//         <div className={styles.right_part}>

//         </div>

//     </div>
//   )
// }

// export default Section
import React from 'react';
import styles from './section.module.css'; // Import your CSS module for styling

const Section = () => {
  return (
    <section className={styles.additional_section}>
      <div className={styles.content_wrapper}>
        <div className={styles.text_content}>
          <h2>Unlock Efficiency with Text Summarization</h2>
          <p>
            Discover how text summarization can streamline information processing. From academic papers to news articles,
            learn how to distill key insights quickly and effectively.
          </p>
          <h2>Enhance Learning with Question Generation</h2>
          <p>
            Explore the power of generating insightful questions from text. Improve comprehension and critical thinking
            skills by creating meaningful queries that deepen understanding.
          </p>
          <button className={`btn ${styles.explore_btn}`}>Try it Now</button>
        </div>
        <div className={styles.image_content}>
          <img src="/images/people.png" alt="Summary and Question Generation" />
        </div>
      </div>
    </section>
  );
};

export default Section;
