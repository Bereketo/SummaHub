import React from "react";
import styles from "./chat.module.css";

function Chat() {
  return (
    <div className={styles.chat_wrapper}>
      <div className={styles.info_space}>
        <div className={styles.person_img}>
          <img src="./images/online-chat.png" />
        </div>

        <div className={styles.personmessage_space}>
          <div className={styles.personmessage_box} style={{ width: "70px" }}>
            <p> Hello </p>
          </div>
          <div className={styles.personmessage_box} style={{ width: "250px" }}>
            <p> How does photosynthesis work?</p>
          </div>
        </div>
        <div className={styles.robotmessage_space}>
          <div className={styles.robotmessage_box} style={{ width: "250px" }}>
            <p> Hi , How can I help you today. </p>
          </div>
          <div
            className={styles.robotmessage_box}
            style={{ width: "250px", height: "130px" }}
          >
            <p>
              Photosynthesis is the process by which plants convert sunlight,
              carbon dioxide, and water into glucose and oxygen.{" "}
            </p>
          </div>
        </div>

        <div className={styles.robot_img}>
          <img src="./images/ai.png" />
        </div>
      </div>
      <div className={styles.chat_space}>
        <div className={styles.response_space}>
        <div className={styles.response_placeholder}>
        <div className={styles.chat_pic}>
         <img  src="./images/ai-assistant.png"/>
        </div>
        <h1> Curious about something? Let's explore!</h1>

        </div>
        
        </div>
        <div className={styles.chat_input}>
        <textarea placeholder="Ask me anything .... "></textarea>
        <div className={styles.send_arrow}>
          <img src="./images/send.png" />
        </div>
        </div>

      </div>
    </div>
  );
}

export default Chat;
