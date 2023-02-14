import React from 'react'

function CompleteTasks({completedTasks, deleteTasks}) {
    
  return (
    <div className='todo-container'>
        <h1>Completed Tasks</h1>
        <div className='task-container'>
          {completedTasks?.map((completed) => {
            return(
            <>
           
            <li key={completed._id}>{completed.title}</li>
            <button onClick={() => deleteTasks(completed._id)}>Delete</button>
         
            </>
            )
          })}
          </div>
        
    </div>
  )
}

export default CompleteTasks