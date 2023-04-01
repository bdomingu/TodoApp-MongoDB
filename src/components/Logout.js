import axios from "axios"
import {useNavigate} from 'react-router-dom'

function Logout({setTasks}) {
    axios.defaults.baseURL = `http://${window.location.hostname}:8000`
    const navigate = useNavigate();
    
    const handleLogout = async () => {
        console.log(localStorage.getItem('token'))
        localStorage.removeItem('token');
        console.log(localStorage.getItem('token'))
        setTasks([])
       const response = await axios.get('/logout')
       console.log(response.data)
       if (response.status === 200) {
            navigate('/')
       }
    }

  return (
    <div>
        <a href='#' className='logout-button' onClick={handleLogout}>Logout</a>
    </div>
  )
}

export default Logout