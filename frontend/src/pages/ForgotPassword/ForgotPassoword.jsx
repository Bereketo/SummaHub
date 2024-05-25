import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ForgotPassoword.css";
import FormInput from "./components/formInputForgot";
import ForgotInputs from "./forgotInput";
import axios from "../../api/axios";

const FORGOT_PASSWORD_URL = "http://localhost:4040/api/v1/users/forgotPassword";

function ForgotPassword() {
  const [values, setValues] = useState({ email: "" });
  const [errMsg, setErrMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const errRef = useRef();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
  };

  useEffect(() => {
    const submitForm = async () => {
      if (!isSubmitting) {
        return
      };

      try {
        const response = await axios.post(
            FORGOT_PASSWORD_URL,
          { email: values.email }
        );
        console.log(JSON.stringify(response?.data.status));
        if (response?.data.status === "Success") {
            console.log('success email check your email');
        }
      } catch (err) {
        handleErrorResponse(err);
        errRef.current.focus();
      } finally {
        setIsSubmitting(false);
      }
    };

    submitForm();
  }, [isSubmitting, values, navigate]);

  const handleErrorResponse = (err) => {
    if (!err?.response) {
      setErrMsg("No Server Response");
    } else if (err.response?.status === 400) {
      setErrMsg("Missing Username or Password");
    } else if (err.response?.status === 401) {
      setErrMsg("Unauthorized");
    } else {
      setErrMsg("Unable to login");
    }
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    setErrMsg(""); // Clear the error message when the user starts typing
  };

  return (
    <div className="ForgotWrapper">
      <form onSubmit={handleSubmit}>
        <p
          ref={errRef}
          className={errMsg ? "errmsg" : "offscreen"}
          aria-live="assertive"
        >
          {errMsg}
        </p>
        <img className="logo" src="./images/logo.png" alt="logo" />
        {ForgotInputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={handleChange}
          />
        ))}
        <a href="/forget">Forgot your password?</a>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Lodding..." : "reset"}
        </button>
   
      </form>
    </div>
  );
}

export default ForgotPassword;
