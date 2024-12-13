import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import FormInput from "./components/formInputLogin";
import LoginInputs from "./LoginInputs";
import axios from "../../api/axios";
import { useUser } from '../../context/UserContext';



function Login() {
  const [values, setValues] = useState({ email: "", password: "" });
  const [errMsg, setErrMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const errRef = useRef();
  const { login } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    errRef.current && errMsg && errRef.current.focus();
  }, [errMsg]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!values.email || !values.password) {
      setErrMsg("Email and password are required");
      return;
    }
    setIsSubmitting(true);
    try {
      const response = await axios.post("http://localhost:4040/api/v1/users/login", {
        email: values.email,
        password: values.password,
      });

      login(response.data);
      navigate('/');  // Adjust as per your route settings
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
    setIsSubmitting(false);
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    setErrMsg("");  // Clear the error message when the user starts typing
  };

  return (
    <div className="loginWrapper">
      <form onSubmit={handleSubmit}>
        <p
          ref={errRef}
          className={errMsg ? "errmsg" : "offscreen"}
          aria-live="assertive"
        >
          {errMsg}
        </p>
        <img className="logo" src="./images/summa.png" alt="logo" width={220}/>
        {LoginInputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={handleChange}
          />
        ))}
        <a href="/ForgotPassword">Forgot your password?</a>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Logging in..." : "Login"}
        </button>
        <p  className="no_account">
          Don't have an account? <a href="/signup">Sign Up Here</a>
        </p>
      </form>
    </div>
  );
}

export default Login;
