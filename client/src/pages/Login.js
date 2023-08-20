import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';


function Login() {
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("clicked");
        fetch("http://localhost:8000/api/login", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        }).then(response => response.json()).then(data => {
            console.log(data);
            if (data.token) {
                // User was found, navigate to Main page
                navigate(`/Main?name=${data.name}`);
            } else {
                // User not found or incorrect password, display an error message or handle as needed
                window.alert("Incorrect password or email");
            }
        })
        // navigate(`/Main?name=${formData.first_name}`);

    };


    return (
        <div>
            <Navbar />
            <div className='login'>
                <form onSubmit={handleSubmit}>
                    <input required name='email' placeholder='Email' onChange={handleInputChange} />
                    <input required name='password' placeholder='Password' type='password' onChange={handleInputChange} />
                    <button>Submit</button>
                </form>
            </div>




        </div>
    )
}


export default Login;
