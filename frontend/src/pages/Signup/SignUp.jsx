import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './SignUp.css';
import FormInput from "./components/forminput";
import inputs from "./inputs";
import axios from "../../api/axios";

const SIGN_UP_URL = "http://localhost:4040/api/v1/users/signup";

function SignUp() {
    const [values, setValues] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        passwordConfirm: "",
    });
    const [errMsg, setErrMsg] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [passwordConfirmError, setPasswordConfirmError] = useState("");
    const errRef = useRef();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        // Custom validation for password confirm
        if (values.password !== values.passwordConfirm) {
            setPasswordConfirmError("Passwords do not match");
            return;
        } else {
            setPasswordConfirmError("");
        }

        setIsSubmitting(true);
    };

    useEffect(() => {
        const submitForm = async () => {
            if (!isSubmitting) {
                return;
            }

            try {
                const response = await axios.post(SIGN_UP_URL, {
                    firstname: values.firstName,
                    lastname: values.lastName,
                    email: values.email,
                    password: values.password,
                    passwordConfirm: values.passwordConfirm,
                });
                console.log(response.data)
                console.log(response?.data.status);
                if (response?.data.status === "Success") {
                    navigate("/");
                } else {
                    console.log(response.data)
                    setErrMsg(response?.data.message);
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
            setErrMsg("Unable to sign up");
        }
    };

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
        setErrMsg(""); // Clear the error message when the user starts typing
    };

    return (
        <div className="signUpWrapper">
            <form onSubmit={handleSubmit}>
                <p
                    ref={errRef}
                    className={errMsg ? "errmsg" : "offscreen"}
                    aria-live="assertive"
                >
                    {errMsg}
                </p>
                <img className='logo' src="./images/logo.png" alt="logo" />
                {inputs.map((input) => (
                    <FormInput
                        key={input.id}
                        {...input}
                        value={values[input.name]}
                        onChange={handleChange}
                    />
                ))}
                {passwordConfirmError && (
                    <p className="errmsg">{passwordConfirmError}</p>
                )}
                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Signing Up..." : "Sign Up"}
                </button>
                <p> Have an account? <a href="/login">Login here</a></p>
            </form>
        </div>
    );
}

export default SignUp;
