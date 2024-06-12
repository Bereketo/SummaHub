import React, { useState, useEffect } from "react";
import styles from "./reminder.module.css";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function Reminder() {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const day = dayNames[now.getDay()];
  const date = now.getDate();
  const month = monthNames[now.getMonth()];
  const year = now.getFullYear();

  const [remTitle, setRemTitle] = useState("");
  const [remDescription, setRemDescription] = useState("");
  const [remDate, setRemDate] = useState("");
  const [remTime, setRemTime] = useState("");
  const [reminders, setReminders] = useState([]);

  useEffect(() => {
    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }
    fetchReminders();
  }, []);

  const fetchReminders = () => {
    const storedReminders = localStorage.getItem("reminders");
    if (storedReminders) {
      setReminders(JSON.parse(storedReminders));
    }
  };

  const saveReminders = (reminders) => {
    localStorage.setItem("reminders", JSON.stringify(reminders));
  };

  const handleTitleChange = (event) => {
    setRemTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setRemDescription(event.target.value);
  };

  const handleDateChange = (event) => {
    setRemDate(event.target.value);
  };

  const handleTimeChange = (event) => {
    setRemTime(event.target.value);
  };

  const handleSave = () => {
    if (!remTitle || !remDescription || !remDate || !remTime) {
      toast.error("Please fill in all fields.");
      return;
    }
  
    const reminderDateTime = new Date(`${remDate}T${remTime}`);
    if (reminderDateTime <= new Date()) {
      toast.error("Selected time is in the past. Please choose a future time.");
      return;
    }
  
    const newReminder = {
      title: remTitle,
      description: remDescription,
      date: remDate,
      time: remTime,
    };
    const updatedReminders = [...reminders, newReminder];
    setReminders(updatedReminders);
    saveReminders(updatedReminders);
    scheduleNotification(newReminder);
    setRemTitle("");
    setRemDescription("");
    setRemDate("");
    setRemTime("");
    toast.success("Reminder saved successfully!");
  };
  
  const scheduleNotification = (reminder) => {
    const reminderDateTime = new Date(`${reminder.date}T${reminder.time}`);
    const timeDifference = reminderDateTime.getTime() - new Date().getTime();
  
    if (timeDifference > 0) {
      setTimeout(() => {
        sendNotification(reminder.title, reminder.description);
        removeReminder(reminder); // Remove the reminder after notification is shown
      }, timeDifference);
    } else {
      toast.error("Selected time is in the past. Please choose a future time.");
    }
  };
  
  const removeReminder = (reminder) => {
    const updatedReminders = reminders.filter(r => r !== reminder);
    setReminders(updatedReminders);
    saveReminders(updatedReminders);
  };
  

  const sendNotification = (title, body) => {
    console.log("Sending notification...");
    if (Notification.permission === "granted") {
      new Notification(title, { body });
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          new Notification(title, { body });
        }
      });
    }
  };
  
  return (
    <div className={styles.reminder_wrapper}>
      <div className={styles.top_part}>
        <div className={styles.today_box}>
          <h1>Today's Date</h1>
          <h2 className={styles.hour}>
            {hours}:{minutes}
          </h2>
          <h2 className={styles.date}>
            {day}, {date}th {month}, {year}
          </h2>
        </div>
        <div className={styles.reminder_input}>
          <div className={styles.text_input}>
            <input
              type="text"
              placeholder="Title"
              className={styles.title_input}
              value={remTitle}
              onChange={handleTitleChange}
            />
            <textarea
              type="text"
              placeholder="Description"
              className={styles.description_input}
              value={remDescription}
              onChange={handleDescriptionChange}
            />
            <button className={styles.remsave} onClick={handleSave}>
              Save
            </button>
          </div>
          <div className={styles.date_timeinput}>
            <div className={styles.date_input}>
              <p>Date</p>
              <input
                type="date"
                id="date"
                value={remDate}
                onChange={handleDateChange}
              />
            </div>
            <div className={styles.time_input}>
              <p>Time</p>
              <input
                type="time"
                id="time"
                value={remTime}
                onChange={handleTimeChange}
              />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.bottom_part}>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Date</th>
              <th>Time</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {reminders.length === 0 ? (
              <tr>
                <td colSpan="5">No reminders</td>
              </tr>
            ) : (
              reminders.map((reminder, index) => (
                <tr key={index}>
                  <td>{reminder.title}</td>
                  <td>{reminder.description}</td>
                  <td>{reminder.date}</td>
                  <td>{reminder.time}</td>
                  <td>
                    <button onClick={() => removeReminder(reminder)}>Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Reminder;
