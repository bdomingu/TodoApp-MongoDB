import axios from "axios"
import {useNavigate} from 'react-router-dom'

function Logout() {
    const navigate = useNavigate();

    const handleLogout = async () => {
       const response = await axios.get('http://localhost:8000/logout')
       console.log(response.data)
       if (response.status === 200) {
            navigate('/')
       }
    }

  return (
    <div>
        <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Logout