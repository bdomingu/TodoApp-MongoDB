import './App.css';
import { useState, useEffect} from 'react';
import axios from 'axios';
import Input from './components/Input';
import IncompleteTasks from './components/IncompleteTasks';
import CompleteTasks from './components/CompleteTasks';


function App() {
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState('')

  useEffect(() => {
  const displayTasks = async () => {
    try {
      const response = await axios.get('http://localhost:8000/tasks');
      const tasks = response.data

      setTasks(tasks.filter(task => !task.completed));
      setCompletedTasks(tasks.filter(task => task.completed));

    } catch(error) {
      console.error(error)
    }
   
    }; 

  displayTasks()
}, [])



  const submitTask = (title) => {
    const task = {
      title: title, 
      completed: false
    };

  
    axios.post('http://localhost:8000/task/create', task).then(response => {
      const task = response.data;
      setTasks([...tasks, task])
      setCurrentTask('')
  
    })
    .catch(error => {
      console.error(error);
    })
  }

  const deleteTasks = (id) => {
    axios.delete(`http://localhost:8000/delete/task/${id}`).then(response => {
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

  
  const markComplete = (id) => {
  
    axios.patch(`http://localhost:8000/completed/tasks/${id}`, {completed: true})
      .then((res) => {
     
        setTasks(prevTasks => prevTasks.filter(task => task._id !== id));
        setCompletedTasks(prevCompletedTasks => [...prevCompletedTasks, tasks.find(task => task._id === id)])
        
    })
    .catch(error => {
      console.log(error)
    })
  }

  console.log(tasks)
  console.log(completedTasks)

 
  
  return (
    <div className="App">
     <Input  currentTask={currentTask} setCurrentTask={setCurrentTask} submitTask={submitTask}/>
     <IncompleteTasks tasks={tasks} deleteTasks={deleteTasks} markComplete={markComplete}/>
     <CompleteTasks deleteTasks={deleteTasks} markComplete={markComplete} completedTasks={completedTasks}/>
    </div>
  );
}

export default App;
