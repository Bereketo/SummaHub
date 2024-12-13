const inputs = [
    {
        id: 2,
        name: 'password',
        type: 'password',
        placeholder: '',
        errorMessage: "Password should be 8-20 characters and include at least 1 letter, 1 number, and 1 special character!",
        label: 'Password',
        required: true,
        pattern: "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^A-Za-z0-9]).{8,20}$",
        autoComplete: "new-password" // Added autocomplete attribute
    },
    {
        id: 3,
        name: 'passwordConfirm',
        type: 'password',
        placeholder: '',
        errorMessage: "Passwords don't match",
        label: 'Confirm Password',
        required: true,
        autoComplete: "new-password" // Added autocomplete attribute
    }
];

export default inputs;
