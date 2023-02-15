import React from 'react'

function CompleteTasks({completedTasks, deleteTasks}) {
    
  return (
    <div className='todo-container'>
        <h1>Done</h1>
        <div className='task-container'>
          {completedTasks?.map((completed) => {
            return(
            <>
           
            <li key={completed._id}>{completed.title}</li>
            <button
            className='delete-button'
            onClick={() => deleteTasks(completed._id)}>
            <span className='fa-solid fa-trash-can'></span>
            </button>
         
            </>
            )
          })}
          </div>
        
    </div>
  )
}

export default CompleteTasks