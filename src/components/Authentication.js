import React, { useState } from 'react'
import axios from 'axios';
import {useNavigate} from 'react-router-dom'

/* Figure out why the logout does not remove the token
    Figure out why the tasks for specific users show until after refresh
    Figure out why I cant check the little boxes
*/

function Authentication() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const [error, setError] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const navigate = useNavigate();

    const url = 'http://localhost:8000';

    const handleRegister = (e) => {
        e.preventDefault()

        const user = {
            username: username,
            email: email,
            password: password
        }

        axios.post(`${url}/register`, user).then(response => {
            console.log(response.data)
        })
        .catch(error => {
            // setError(error.response.data.error)
        })
    }

    const handleLogin = async (e) => {
        e.preventDefault()

        const registeredUser = {
            email:userEmail,
            password: userPassword
        }

        const response = await axios.post('http://localhost:8000/login', registeredUser)
        const token = response.data.token
    
        localStorage.setItem('token', token);
        if (response.status === 200) {
            navigate('/todos')
        }
        
        
    }
   

  return (
    <>
    <div>
          <h1>Register</h1>
          <form onSubmit={handleRegister}>
              <label>
                  Name:
                  <input
                      type='text'
                      placeholder='Enter your name...'
                      value={username}
                      onChange={(e) => setUsername(e.target.value)} />
              </label>

              <label>
                  Email:
                  <input
                      type='text'
                      placeholder='Enter an email...'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)} />
              </label>

              <label>
                  Password:
                  <input
                      type='password'
                      placeholder='Enter a password...'
                      value={password}
                      onChange={(e) => setPassword(e.target.value)} />
              </label>
              <button type='submit'>Register</button>

          </form>
      </div>

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
    </div>
    </>
  )
}

export default Authentication