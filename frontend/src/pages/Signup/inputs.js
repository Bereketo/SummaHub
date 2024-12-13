const inputs = [
    {
        id: 1,
        name: 'firstName',
        type: 'text',
        placeholder: '',
        errorMessage: "First Name should be 3 -16 characters and shouldn't include any special character!",
        label: 'First Name',
        required: true,
        pattern: "^[a-zA-Z]{3,16}$"
    },
    {
        id: 2,
        name: 'lastName',
        type: 'text',
        placeholder: '',
        errorMessage: "Last Name should be 3 -16 characters and shouldn't include any special character!",
        label: 'Last Name',
        pattern: "^[a-zA-Z]{3,16}$"
    },
    {
        id: 3,
        name: 'email',
        type: 'email',
        placeholder: '',
        errorMessage: "It should be a valid email address",
        label: 'Email',
        required: true
    },
    {
        id: 4,
        name: 'password',
        type: 'password',
        placeholder: '',
        errorMessage: "Password should be 8-20 characters and include at least 1 letter, 1 number, and 1 special character!",
        label: 'Password',
        required: true,
        pattern: "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^A-Za-z0-9]).{8,20}$"
    },
    {
        id: 5,
        name: 'passwordConfirm',
        type: 'password',
        placeholder: '',
        errorMessage: "Passwords don't match",
        label: 'Confirm Password',
        required: true,
    }
];

export default inputs;
