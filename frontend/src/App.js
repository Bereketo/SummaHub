import React from 'react';
import "./App.css";
import { UserProvider } from './context/UserContext';// Corrected import
import Note from "./pages/NotePage/Note";
import Home from "./pages/HomePage/home";
import SignUp from "./pages/Signup/SignUp";
import Login from "./pages/Login/Login";
import NoteEdit from "./pages/NotePage/components/NoteEdit/noteedit";
import Summary from "./pages/Summary/summary";
import About from "./pages/HomePage/components/AboutUs/aboutus";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import UserProfile from "./pages/UserProfile/UserProfile";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Signup" element={<SignUp />} />
            <Route path="/Note" element={<Note />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Summary" element={<Summary />} />
            <Route path="/About" element={<About />} />
            <Route path="/NoteEdit" element={<NoteEdit />} />
            <Route path="/ForgotPassword" element={<ForgotPassword />} />
            <Route path="/resetPassword/:resetToken" element={<ResetPassword />} />
            <Route path="/myprofile" element={<UserProfile />} />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </div>
  );
}

export default App;
