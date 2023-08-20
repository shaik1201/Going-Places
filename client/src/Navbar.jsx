import React from 'react';
import { useNavigate } from 'react-router-dom';



function Navbar() {
    const navigate = useNavigate()

    return (
        <div className='navbar'>
            <div className='buttons'>
                <button onClick={() => navigate('/Posts')}>Posts</button>
                <button onClick={() => navigate('/Register')}>Register</button>
                <button onClick={() => navigate('/Login')}>Login</button>
                <button>About</button>
            </div>
        </div>
    )
}


export default Navbar;