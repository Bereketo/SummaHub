import React, { useRef, useState } from "react";
import './SignUp.css'
import FormInput from "./components/forminput";
import inputs from "./inputs";
// import logo from "./images/logo.png";
function SignUp(){
    
    const [values , setValues] = useState({
        firstName : "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleSubmit = (e)=>{
        e.preventDefault(); 
    } 
    const handleChange = (e)=>{
        // console.log("handleChange called");
        setValues({...values,[e.target.name]:e.target.value})
        // console.log(values)
    }


    return <div className="loginWrapper">
        <form onSubmit={handleSubmit}>
        <img className='logo' src= "./images/logo.png"/>
        {inputs.map((input) => (<FormInput key = {input.id} {...input} value = {values[input.name]} onChange = {handleChange}/>))}
        <button > Sign Up</button>
        <p> Have an account? <a href=""> Login here</a></p>
        </form> 
    </div>

}

export default SignUp;

