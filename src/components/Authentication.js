import React, { useState } from 'react'
import axios from 'axios';

function Authentication() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');

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
            setError(error.response.data.error)
        })
    }

    const handleLogin = (e) => {
        e.preventDefault()

        const registeredUser = {
            email:userEmail,
            password: userPassword
        }


        axios.post('http://localhost:8000/login', registeredUser).then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.error(error)
            setError(error.response)
        })
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