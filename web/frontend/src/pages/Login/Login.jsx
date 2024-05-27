import React, { useRef, useState, useContext, useEffect } from "react";
import AuthContext from "../../context/AuthProvider";
import "./Login.css";
import FormInputLogin from "./components/formInputLogin";
import LoginInputs from "./LoginInputs";
import axios from "../../api/axios";
const Login_url = "/auth";
function Login() {
  const [values, setValues] = useState({email: "",password: "", });
  const errRef = useRef();
  const [errMsg, setErrMsg] = useState("");
  const { setAuth } = useContext(AuthContext);
  // useEffect (()=>{useRef.current.focus();} , [])
  useEffect(() => { setErrMsg("");}, [values.email, values.password]);
  
  // const [success, setSuccess] = useState(false);
  const handleSubmit = async (e) => {
    console.log(values.email , values.password)
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
      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;
      setValues({ email: "", password: "", });
      setAuth({email: values.email,password: values.password,roles,accessToken,});
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
            <img className="logo" src="./images/logo.png" />
            {LoginInputs.map((input) => (
              <FormInputLogin
                key={input.id}
                {...input}
                value={values[input.name]}
                onChange={handleChange}
              />
            ))}
            <a href=""> forgot your password? </a>
            <button  type="submit"> Login</button>

            <p>
              {" "}
              Don't have an account? <a href=""> SignUp Here</a>
            </p>
          </form>
        </div>

  );
}

export default Login;
