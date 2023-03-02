import React from 'react'


function IncompleteTasks({tasks, deleteTasks, markComplete, selectedTasks, setSelectedTasks}) {


 const handleTaskSelection = (e, id) => {

    if(e.target.checked) {
      setSelectedTasks([...selectedTasks, id]);
    } else {
      setSelectedTasks(selectedTasks.filter((taskId) => taskId !== id));
    } 
  }
  
  return (
    <div className='todo-container'>
      <h1>To-do's</h1>
      <button className='complete-button' onClick={() => markComplete()}>Complete</button>
      <div className='task-container'>
      {tasks.map((task) => {
        return (
            <><li key={task._id}>
            <input 
            type="checkbox" 
            onChange={(e) => handleTaskSelection(e, task._id)}
            checked={selectedTasks.includes(task._id)}
            
             />
            {task.title}</li>
            <button className='delete-button' onClick={() => deleteTasks(task._id)}>
            <span className='fa-solid fa-trash-can'></span>
            </button></>
        )

      })}
      </div>
      
    </div>
  )
}

export default IncompleteTasks