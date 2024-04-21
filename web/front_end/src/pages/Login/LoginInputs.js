const inputs = [

    {
        id: 1,
        name : 'email',
        type : 'email',
        placeholder: '',
        errorMessage:"It should be valid email address",
        label:<div><img src= './images/email.png'></img>Email</div>,
        required:true
    },
    {
        id: 2,
        name : 'password',
        type : 'text',
        placeholder: '',
        errorMessage:" Password should be 8 -20 characters and iinclude at least 1 letter , 1 number and 1 special character!",
        label:<div><img src="./images/password.png" ></img>Password</div>,
        required:true,
        // pattern:"^(?=.*[0-9])(?=.*[a-z])(?=.*[@$!%*?&])([a-zA-Z0-9@$!%*?&]{8,20})$"
        pattern:"^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^A-Za-z0-9]).{8,20}$"
       
    
    },

  
   
]

export default inputs