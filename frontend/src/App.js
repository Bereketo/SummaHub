import React, { useState } from 'react';
import './App.css';
import { UserProvider } from './context/UserContext';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/HomePage/home';
import SignUp from './pages/Signup/SignUp';
import Login from './pages/Login/Login';
import Note from './pages/NotePage/Note';
import NoteArea from './pages/NotePage/components/NoteArea/notearea';
import NoteEdit from './pages/NotePage/components/NoteEdit/noteedit';
import Summary from './pages/Summary/summary';
import About from './pages/HomePage/components/AboutUs/aboutus';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import ResetPassword from './pages/ResetPassword/ResetPassword';
import UserProfile from './pages/UserProfile/UserProfile';
import Question from './pages/Question/question';
import Chat from './pages/Chat/chat';
import Reminder from './pages/NotePage/components/Reminder/reminder';
import Admin from './pages/Admin/admin';
import TrashNote from './pages/NotePage/components/TrashNote/TrashNote';


function App() {
  const [theme, setTheme] = useState('light');

  return (
    <div theme ={theme} setTheme ={setTheme}>
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home theme={theme} setTheme={setTheme} />} />
          <Route path="/Signup" element={<SignUp theme={theme} setTheme={setTheme} />} />
          <Route path="/Note" element={<Note theme={theme} setTheme={setTheme} />} />
          <Route path="/NoteAdd" element={<NoteArea />} />
          <Route path="/NoteEdit/:note_id" element={<NoteEdit />} />
          <Route path="/Login" element={<Login theme={theme} setTheme={setTheme} />} />
          <Route path="/Summary" element={<Summary theme={theme} setTheme={setTheme} />} />
          <Route path="/About" element={<About />} />
          <Route path="/ForgotPassword" element={<ForgotPassword />} />
          <Route path="/resetPassword/:resetToken" element={<ResetPassword />} />
          <Route path="/myprofile" element={<UserProfile />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/Question" element={<Question theme={theme} setTheme={setTheme} />} />
          <Route path="/Chat" element={<Chat theme={theme} setTheme={setTheme} />} />
          <Route path="/Reminder" element={<Reminder theme={theme} setTheme={setTheme} />} />
          <Route path='/trash' element={<TrashNote  theme={theme} setTheme={setTheme}/>}/>
        </Routes>

      </BrowserRouter>
    
    </UserProvider>
    
    </div>
  );
}

export default App;
