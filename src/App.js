import './App.css';
import { useState, useEffect} from 'react';
import axios from 'axios';
import Input from './components/Input';
import IncompleteTasks from './components/IncompleteTasks';
import CompleteTasks from './components/CompleteTasks';


function App() {
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState('');
  const [selectedTasks, setSelectedTasks] = useState([]);
  
  const handleTaskSelection = (e, task) => {
    if (e.target.checked){
      setSelectedTasks([...selectedTasks, task]);
    } else {
      setSelectedTasks(selectedTasks.filter(selectedTask => selectedTask._id !== task._id))
    }
    
    
  }


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

  
  const markComplete = async () => {
  
   const response = await axios.patch('http://localhost:8000/completed/tasks/', 
   {taskIds: selectedTasks.map(task => task._id),
    completed: true
    
    })
    const updatedTasks = await response.data.updatedTasks
  
    setCompletedTasks(prevCompletedTasks => [...prevCompletedTasks, ...updatedTasks])
    setTasks(prevTasks => prevTasks.filter(task => !selectedTasks.includes(task)) )
    console.log(updatedTasks)
    setSelectedTasks([])
    
  }


 
 
    
  
  return (
    <div className="App">
     <Input  currentTask={currentTask} setCurrentTask={setCurrentTask} submitTask={submitTask}/>
     <IncompleteTasks handleTaskSelection={handleTaskSelection} tasks={tasks} deleteTasks={deleteTasks} markComplete={markComplete}/>
     <CompleteTasks deleteTasks={deleteTasks} markComplete={markComplete} completedTasks={completedTasks}/>
    </div>
  );
}

export default App;
