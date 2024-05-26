import React, { useRef, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./ResetPassword.css";
import FormInput from "./components/formInputReset";
import inputs from "./resetInput";
import axios from "../../api/axios";

function ResetPassword() {
  const { resetToken} = useParams();
  const RESET_PASSWORD_URL = `http://localhost:4040/api/v1/users/resetPassword/${resetToken}`;
  
  const [values, setValues] = useState({
    password: "",
    passwordConfirm: "",
  });
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
      if (!isSubmitting) {return};

      try {
        const response = await axios.post(RESET_PASSWORD_URL, {
          password: values.password,
          passwordConfirm: values.passwordConfirm,
        });

        if (response?.data.status === "Success") {
          console.log('Success: Check your email');
          navigate('/login'); // Redirect to login page after successful password reset
        }
      } catch (err) {
        handleErrorResponse(err);
        errRef.current.focus();
      } finally {
        setIsSubmitting(false);
      }
    };

    submitForm();
  }, [isSubmitting, values, navigate, RESET_PASSWORD_URL]);

  const handleErrorResponse = (err) => {
    if (!err?.response) {
      setErrMsg("No Server Response");
    } else if (err.response?.status === 400) {
      setErrMsg("Missing Password or Password Confirmation");
    } else if (err.response?.status === 401) {
      setErrMsg("Unauthorized");
    } else {
      setErrMsg("Failed to reset password");
    }
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    setErrMsg(""); // Clear the error message when the user starts typing
  };

  return (
    <div className="ResetWrapper">
      <form onSubmit={handleSubmit}>
        <p
          ref={errRef}
          className={errMsg ? "errmsg" : "offscreen"}
          aria-live="assertive"
        >
          {errMsg}
        </p>
        <img className="logo" src="./images/logo.png" alt="logo" />
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={handleChange}
          />
        ))}
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Loading..." : "Change Password"}
        </button>
      </form>
    </div>
  );
}

export default ResetPassword;
