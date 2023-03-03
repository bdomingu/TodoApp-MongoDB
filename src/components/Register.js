import React, {useState} from 'react'
import axios from 'axios';
import {useNavigate} from 'react-router-dom'

function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [registrationError, setRegistrationError] = useState('');

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
            setRegistrationError(error.response.data.error)
            
        })
    }

    

 
  return (
    
         <div className='login-container'>
          <h1>Register</h1>
          <form className='form-container' onSubmit={handleRegister}>
              <label className='name-label'>
                  Name:
                  <input
                      className='name-input'
                      type='text'
                      placeholder='Enter your name...'
                      value={username}
                      onChange={(e) => setUsername(e.target.value)} />
              </label>

              <label>
                  Email:
                  <input
                      className='email-input'
                      type='text'
                      placeholder='Enter an email...'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)} />
              </label>

              <label className='password-label'>
                  Password:
                  <input
                      className='password-input'
                      type='password'
                      placeholder='Enter a password...'
                      value={password}
                      onChange={(e) => setPassword(e.target.value)} />
              </label>
              <button className='login-button' type='submit'>Register</button>
              <div className='login-text'>
                <p>{registrationError}</p>
                <p>Already have an account?</p> <a href='/'>Login Here</a>
              </div>
          </form>
      </div>

    
  )
}

export default Register