import React, { useState } from 'react'
import axios from 'axios';
import {useNavigate} from 'react-router-dom'



function Login({setToken}) {
   
    // const [error, setError] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [loginError, setLoginError] = useState('')

    const navigate = useNavigate();

    



    const handleLogin = async (e) => {
        e.preventDefault()
        try {
        const registeredUser = {
            email:userEmail,
            password: userPassword
        }

        const response = await axios.post('http://localhost:8000/login', registeredUser)
        const token = response.data.token
    
        localStorage.setItem('token', token);
        setToken(token)
        if (response.status === 200) {
            navigate('/todos')
        }
        
        console.log(token)
        } catch (error) {
            setLoginError(error.response.data.message)
        }
    }
   
    console.log(loginError)

  return (
    <>
   
      <div>
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
            <label> Email:
                <input
                    type='text'
                    placeholder='Enter your email'
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                />
            </label>
            <label> Password:
                <input 
                    type='password'
                    placeholder='Enter your password'
                    value={userPassword}
                    onChange={(e) => setUserPassword(e.target.value)}
                />
            </label>
            <button type='submit'>Login</button>
        </form>
        <p>{loginError}</p>
        <p>Don't have an account?</p> <a href='/register'>Register here.</a>
    </div>
    </>
  )
}

export default Login