import "./App.css";
import Note from "./pages/NotePage/Note";
import Home from "./pages/HomePage/home";
import SignUp from "./pages/Signup/SignUp";
import Login from "./pages/Login/Login";
import NoteEdit from "./pages/NotePage/components/NoteEdit/noteedit";
// import Question from "./pages/Question/question";
import Summary from "./pages/Summary/summary";
import About from "./pages/HomePage/components/AboutUs/aboutus";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassoword";
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Signup" element={<SignUp />} />
          <Route path="/Note" element={<Note />} />
          <Route path="/Login" element={<Login />} />
          {/* <Route path = '/Question' element = {<Question/>} /> */}
          <Route path='/Summary' element={<Summary />} />
          <Route path='/About' element={<About />} />
          <Route path='/NoteEdit' element={<NoteEdit />} />
          <Route path='/ForgotPassword' element={<ForgotPassword />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
