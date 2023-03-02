import React from 'react'


function IncompleteTasks({tasks, deleteTasks, markComplete, selectedTasks, setSelectedTasks}) {
// console.log(tasks)

console.log(selectedTasks)

 const handleTaskSelection = (task) => {
    if(selectedTasks.includes(task._id)) {
      setSelectedTasks(selectedTasks.filter((id) => id !== task._id));
    } else {
      setSelectedTasks([...selectedTasks, task._id]);
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
            onChange={() => handleTaskSelection(task)}
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