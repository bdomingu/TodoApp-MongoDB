import React from 'react'

function CompleteTasks({completedTasks, deleteTasks}) {
    
  return (
    <div>
        <h1>Completed Tasks</h1>

          {completedTasks?.map((completed) => {
    
            return(
            <>
            <li key={completed._id}>{completed.title}</li>
            <button onClick={() => deleteTasks(completed._id)}>Delete</button>
            </>
            )
          })}
        
    </div>
  )
}

export default CompleteTasks