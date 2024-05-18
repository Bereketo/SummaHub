const inputs = [
    {
        id: 1,
        name : 'firstName',
        type : 'text',
        placeholder: '',
        errorMessage:"First Name should be 3 -16 characters and shouldn't include any special character! ",
        label: 'FirstName',
        required: true,
        pattern:"^[a-zA-Z]{3,16}$"
    },
    {
        id: 2,
        name : 'lastName',
        type : 'text',
        placeholder: '',
        errorMessage:"Last Name should be 3 -16 characters and shouldn't include any special character! ",
        label: 'LastName',
        pattern:"^[a-zA-Z]{3,16}$",
    },

    {
        id: 3,
        name : 'email',
        type : 'email',
        placeholder: '',
        errorMessage:"It should be valid email address",
        label: 'Email',
        required:true
    },
    {
        id: 4,
        name : 'password',
        type : 'text',
        placeholder: '',
        errorMessage:" Password should be 8 -20 characters and iinclude at least 1 letter , 1 number and 1 special character!",
        label: 'Password',
        required:true,
        // pattern:"^(?=.*[0-9])(?=.*[a-z])(?=.*[@$!%*?&])([a-zA-Z0-9@$!%*?&]{8,20})$"
        pattern:"^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^A-Za-z0-9]).{8,20}$"
       
    
    },
    {
        id: 5,
        name : 'confirmPassword',
        type : 'text',
        placeholder: '',
        errorMessage:" Password don't match",
        label: 'Confirm Password',
        required:true,
        pattern:""
    }
  
   
]

export default inputs