import './App.css';
import { useState, useEffect} from 'react';
import axios from 'axios';
import Input from './components/Input';
import IncompleteTasks from './components/IncompleteTasks';
import CompleteTasks from './components/CompleteTasks';
import Login from './components/Login';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Logout from './components/Logout';
import Register from './components/Register';

function App() {
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState('');
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [token, setToken] = useState(localStorage.getItem('token'))
  axios.defaults.baseURL = `http://${window.location.hostname}:8000`
  



  useEffect(() => {
  const displayTasks = async () => {
  
    try {
      const response = await axios.get('/tasks', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const tasks = await response.data
     
    
      setTasks(tasks.filter(task => !task.completed));
      setCompletedTasks(tasks.filter(task => task.completed));
 
      
    } catch(error) {
      console.error(error)
    }
   
    }; 

  displayTasks()
}, [token])



  const submitTask = (title) => {
    
    const task = {
      title: title, 
      completed: false
    };
    
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

     axios.post('/tasks/create', task).then((response) =>{
      const data = response.data
      setTasks([...tasks, data])
      setCurrentTask('')
     })
    .catch((error) => {
      console.error(error);
    });
  }

  const deleteTasks = (id) => {
    axios.delete(`/delete/task/${id}`).then(response => {
      setTasks(prevTasks => {
        return prevTasks.filter(task => task._id !== id)
      })
      setCompletedTasks(prevTasks => {
        return prevTasks.filter(task => task._id !== id)
      })
    })
    .catch(error => {
      console.log(error)
    })
  }


  
  const markComplete = async () => {
    
   for (let i=0; i<selectedTasks.length; i++){
   const response = await axios.patch(`/completed/tasks/${selectedTasks[i]}`,
   {
    completed:true
    
    })
    const updatedTasks = await response.data.updatedTasks
    
    setCompletedTasks(prevCompletedTasks => [...prevCompletedTasks, ...updatedTasks])
    setTasks(prevTasks => prevTasks.filter(task => !selectedTasks.includes(task._id)) )
   
    setSelectedTasks([])
   }
 
    
  }



  function TodoContainer() {
    return (
      <>
        <div className='nav'>
        <Input currentTask={currentTask} setCurrentTask={setCurrentTask} submitTask={submitTask}/>
        <Logout setTasks={setTasks}/>
        </div>
        <div className='tasks-container'> 
          <IncompleteTasks selectedTasks={selectedTasks} setSelectedTasks={setSelectedTasks} tasks={tasks} deleteTasks={deleteTasks} markComplete={markComplete}/>
          <CompleteTasks deleteTasks={deleteTasks} markComplete={markComplete} completedTasks={completedTasks}/>
        </div>
      </>
    );
  }

 
 
    
  
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Login setToken={setToken}/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/todos' element={<TodoContainer/>}/>
      </Routes>
    </Router>
  
   
  );
}

export default App;
