import React, { useState, useEffect } from "react";
import styles from "./reminder.module.css";
import Header from "../../../HomePage/components/header/header";
import Sidebar from "../sidebar/sidebar";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Reminder({theme , setTheme}) {
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
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3);

  useEffect(() => {
    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }
    fetchReminders();
  }, []);

  const fetchReminders = async () => {
    try {
      const userToken = JSON.parse(localStorage.getItem('user'));
      if (!userToken || !userToken.token) {
        throw new Error('No token found');
      }
      const { token } = userToken;
      const response = await axios.get("http://localhost:4040/api/v1/reminders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      setReminders(response.data.data);
    } catch (error) {
      console.error("Error fetching reminders", error);
      toast.error("Error fetching reminders");
    }
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

  const handleSave = async () => {
    if (!remTitle || !remDescription || !remDate || !remTime) {
      toast.error("Please fill in all fields.");
      return;
    }

    const reminderDateTime = new Date(`${remDate}T${remTime}`);
    if (reminderDateTime <= new Date()) {
      toast.error("Selected time is in the past or current. Please choose a future time.");
      return;
    }
    
    console.log(remTitle,remDescription,remDate,remTime)

    const newReminder = {
      title: remTitle,
      description: remDescription,
      date: remDate,
      time: remTime,
    };

    try {
      const userToken = JSON.parse(localStorage.getItem('user'));
      if (!userToken || !userToken.token) {
        throw new Error('No token found');
      }
      const { token } = userToken;
      const response = await axios.post("http://localhost:4040/api/v1/reminders", newReminder, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setReminders([...reminders, response.data.data]);
      scheduleNotification(response.data.data);
      setRemTitle("");
      setRemDescription("");
      setRemDate("");
      setRemTime("");
      toast.success("Reminder saved successfully!");
    } catch (error) {
      console.error("Error saving reminder", error);
      toast.error("Error saving reminder");
    }
  };

  const scheduleNotification = (reminder) => {
    const reminderDateTime = new Date(`${reminder.date}T${reminder.time}`);
    const timeDifference = reminderDateTime.getTime() - new Date().getTime();

    if (timeDifference > 0) {
      setTimeout(() => {
        sendNotification(reminder.title, reminder.description);
        removeReminder(reminder._id); // Adjusted to use reminder ID
      }, timeDifference);
    } else {
      toast.error("Selected time is in the past. Please choose a future time.");
    }
  };

  const removeReminder = async (id) => {
    try {
      
      const userToken = JSON.parse(localStorage.getItem('user'));
      if (!userToken || !userToken.token) {
        throw new Error('No token found');
      }
      const { token } = userToken;
      await axios.delete(`http://localhost:4040/api/v1/reminders/${id}`,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setReminders(reminders.filter((r) => r._id !== id));
      toast.success("Reminder deleted successfully!");
    } catch (error) {
      console.error("Error deleting reminder", error);
      toast.error("Error deleting reminder");
    }
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

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = reminders.slice(indexOfFirstItem, indexOfLastItem);

  const nextPage = () => {
    if (currentPage < Math.ceil(reminders.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className={styles.reminder_wrapper}>
      <Header useButtons={true} theme={theme} setTheme={setTheme}/>
      <div className={styles.bottom_container}>
        <Sidebar />
        <div className={styles.content}>
          <div className={styles.top_part}>
            <div className={styles.today_box}>
              <h1>Today's Date</h1>
              <h2 className={styles.hour}>
                {hours}:{minutes}
              </h2>
              <h2 className={styles.date}>
                {`${day}, ${date} ${month} ${year}`}
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
                {currentItems.length === 0 ? (
                  <tr>
                    <td colSpan="5">No reminders</td>
                  </tr>
                ) : (
                  currentItems.map((reminder) => (
                    <tr key={reminder._id}>
                      <td>{reminder.title}</td>
                      <td>{reminder.description}</td>
                      <td>{reminder.date}</td>
                      <td>{reminder.time}</td>
                      <td>
                        <button onClick={() => removeReminder(reminder._id)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
            <div className={styles.pagination_controls}>
              <button onClick={prevPage} disabled={currentPage === 1}>
                Previous
              </button>
              <button
                onClick={nextPage}
                disabled={
                  currentPage === Math.ceil(reminders.length / itemsPerPage)
                }
              >
                Next
              </button>
            </div>
            {reminders.length > itemsPerPage && (
              <ul className={styles.pagination}>
                {Array(Math.ceil(reminders.length / itemsPerPage))
                  .fill()
                  .map((_, index) => (
                    <li
                      key={index}
                      onClick={() => paginate(index + 1)}
                      className={currentPage === index + 1 ? styles.active : ""}
                    >
                      {index + 1}
                    </li>
                  ))}
              </ul>
            )}
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Reminder;
