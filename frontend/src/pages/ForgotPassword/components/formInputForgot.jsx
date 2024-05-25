import { useState } from 'react';
import './formInputForgot.css';

const FormInput = (props) => {
  const [focused, setFocused] = useState(false);
  const { label, errorMessage, onChange, id, ...inputProps } = props;
  const handleFocus = (e) => {
    setFocused(true);
  };

  return (
    <div className="formInput">
      <input
        {...inputProps}
        onChange={onChange}
        onBlur={handleFocus}
        focused={focused.toString()}
        onFocus={() => inputProps.name === "confirmPassword" && setFocused(true)}
      />
      <label>{label}</label>
      <span>{errorMessage}</span>
    </div>
  );
};

export default FormInput;
