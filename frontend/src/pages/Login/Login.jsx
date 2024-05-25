import React, { useRef, useState, useEffect } from "react";
import "./Login.css";
import FormInputLogin from "./components/formInputLogin";
import LoginInputs from "./LoginInputs";
import axios from "../../api/axios";
const Login_url = "http://localhost:4040/api/v1/users/login";
function Login() {
  const [values, setValues] = useState({email: "",password: "", });
  const errRef = useRef();
  const [errMsg, setErrMsg] = useState("");
  // useEffect (()=>{useRef.current.focus();} , [])
  useEffect(() => { setErrMsg("");}, [values.email, values.password]);

  // const [email, setEmail] = useState('')
  // const [password, setPassword] = useState('')
  // useEffect(()=>{
  //   const loginFetch = async () =>{
  //       const responce = await axios.post('http://localhost:4040/api/v1/users/login',{email,password})
  //       console.log(responce.data)
  //   }
  //   loginFetch()
  // },[email,password]);
   
  // const [success, setSuccess] = useState(false);
  const handleSubmit = async (e) => {
    console.log(values.email,values.password)
    try {
      e.preventDefault();
      const response = await axios.post(
        Login_url,
        JSON.stringify({ email: values.email, password: values.password }),
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log(JSON.stringify(response?.data));
      console.log(response)
    }
     catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Unable to login");
      }
      errRef.current.focus();
    }

    
  };
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
        <div className="loginWrapper">
          <form onSubmit={handleSubmit}>
            <p
              ref={errRef}
              className={errMsg ? "errmsg" : "offscreen"}
              aria-live="assertive"
            >
              {errMsg}{" "}
            </p>
            <img className="logo" src="./images/logo.png" alt="logo"/>
            {LoginInputs.map((input) => (
              <FormInputLogin
                key={input.id}
                {...input}
                value={values[input.name]}
                onChange={handleChange}
              />
            ))}
            {/* <input type="email" name="" id="" value={(e)=>setPassword(e.target.value)}/>
            <input type="password" value={(e)=>setEmail(e.target.value)}/> */}
            <a href="/forget"> forgot your password? </a>
            <button> Login</button>

            <p>
              {" "}
              Don't have an account? <a href="/signup"> SignUp Here</a>
            </p>
          </form>
        </div>

  );
}

export default Login;
