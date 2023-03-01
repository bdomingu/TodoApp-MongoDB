import React from 'react'

function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
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

          </form>
      </div>

    
  )
}

export default Register