import React from 'react';
import './App.css';
import { UserProvider } from './context/UserContext';
import Note from './pages/NotePage/Note';
import Home from './pages/HomePage/home';
import SignUp from './pages/Signup/SignUp';
import Login from './pages/Login/Login';
import NoteArea from './pages/NotePage/components/NoteArea/notearea';
import NoteEdit from './pages/NotePage/components/NoteEdit/noteedit';
import Summary from './pages/Summary/summary';
import About from './pages/HomePage/components/AboutUs/aboutus';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import ResetPassword from './pages/ResetPassword/ResetPassword';
import UserProfile from './pages/UserProfile/UserProfile';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Signup" element={<SignUp />} />
          <Route path="/Note" element={<Note />} />
          <Route path="/NoteAdd" element={<NoteArea />} />
          <Route path="/NoteEdit" element={<NoteEdit />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Summary" element={<Summary />} />
          <Route path="/About" element={<About />} />
          <Route path="/ForgotPassword" element={<ForgotPassword />} />
          <Route path="/resetPassword/:resetToken" element={<ResetPassword />} />
          <Route path="/myprofile" element={<UserProfile />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
