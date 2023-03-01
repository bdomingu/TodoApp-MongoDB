import React, {useState} from 'react'
import axios from 'axios';
import {useNavigate} from 'react-router-dom'

function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

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
            console.log(response)

            if(response.status === 200) {
                navigate('/')
            }
        })

        
        .catch(error => {
            setError(error.response.data.error)
            
        })
    }

 
  return (
    
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
              <p>Already have an account?</p> <a href='/'>Login Here</a>

          </form>
      </div>

    
  )
}

export default Register