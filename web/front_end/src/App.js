import './App.css';
import Header  from './pages/HomePage/components/header/header';
import Hero from './pages/HomePage/components/hero/hero';
import Slider  from './pages/HomePage/components/slider/slider';
import Note from './pages/NotePage/Note';
import Home from './pages/HomePage/home';
import SignUp from './pages/Signup/SignUp';
import Login from './pages/Login/Login';
function App() {
  return (
    <div className='App'>
     {/* <Home /> */}
     {/* <SignUp />
     <Login /> */}
     <Note />
     {/* <ReactQuill /> */}
     {/* <Editor /> */}
    </div>

  );
  
  
}

export default App;
