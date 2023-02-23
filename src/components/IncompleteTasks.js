import React from 'react'


function IncompleteTasks({tasks, deleteTasks, markComplete, handleTaskSelection}) {

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
            className='checkbox'
            onChange={(e) => handleTaskSelection(e, task)} />
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