import "./App.css";
import Note from "./pages/NotePage/Note";
import Home from "./pages/HomePage/home";
import SignUp from "./pages/Signup/SignUp";
import Login from "./pages/Login/Login";
import Question from "./pages/Question/question";
import Summary from "./pages/Summary/summary";
import About from "./pages/HomePage/components/AboutUs/aboutus";
import { BrowserRouter , Routes, Route, Switch } from "react-router-dom";
import Admin from './pages/Admin/admin'
import Chat from "./pages/Chat/chat";

import { useState } from "react";
import Container from "quill/blots/container";


function App() {
  const  [theme , setTheme] = useState('light')
  return (
    <div className="container" theme = {theme}>
    <BrowserRouter>
    <Routes>
       <Route  path = "/" element={<Home theme = {theme} setTheme = {setTheme}/>}/>
      <Route  path = "/Signup" element={<SignUp/>}/>
      <Route  path = "/Note" element={<Note theme = {theme} setTheme = {setTheme}/>}/>
      <Route  path = "/Login" element={<Login theme = {theme} setTheme = {setTheme}/>}/>
      <Route path = '/Question' element = {<Question theme = {theme} setTheme = {setTheme}/>} />
      <Route path = '/Summary' element = {<Summary theme = {theme} setTheme = {setTheme}/>} />
      <Route path = '/Chat' element = {<Chat theme = {theme} setTheme = {setTheme}/>} />
      {/* <Route path = '/About' element = {<About/>} /> */}
      
       </Routes>
    </BrowserRouter>
  {/* <TestTypewriter /> */}
    {/* <Admin /> */}

    
    </div>
  );
}

export default App;
