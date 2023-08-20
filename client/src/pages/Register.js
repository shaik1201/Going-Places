import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';

/**
 * A component for user registration.
 */
function Register() {
    const navigate = useNavigate();

    // State to hold form data
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: ''
    });

    /**
     * Handler for input field changes.
     * @param {Event} event - The input change event.
     */
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    /**
     * Handler for form submission.
     * @param {Event} event - The form submit event.
     */
    const handleSubmit = (event) => {
        event.preventDefault();

        // Submit registration data to the server
        fetch("http://localhost:8000/api/register", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
            .then(response => response.json())
            .then(data => {
                if (data.first_name) {
                    navigate(`/Main?name=${formData.first_name}`);
                } else {
                    window.alert("Email already registered");
                }
                console.log(data);
            })
            .catch(error => {
                console.error("Error:", error);
            });
    };

    return (
        <div>
            <Navbar />
            <div className='register'>
                <form onSubmit={handleSubmit} className='register-form'>
                    <input required name='first_name' placeholder='First Name' onChange={handleInputChange} />
                    <input required name='last_name' placeholder='Last Name' onChange={handleInputChange} />
                    <input required name='email' placeholder='Email' onChange={handleInputChange} />
                    <input required name='password' placeholder='Password' type='password' onChange={handleInputChange} />
                    <button>Submit</button>
                </form>
            </div>
        </div>
    );
}

export default Register;
