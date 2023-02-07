import React from 'react'

function IncompleteTasks({tasks, deleteTasks, markComplete}) {

  return (
    <div>
      <h1>Incomplete Tasks</h1>
       
          {tasks.map((task) => {
          
            return (
            <div>
            <li key={task._id}>{task.title}</li>
            <button onClick={() => deleteTasks(task._id)}>Delete</button>
            <button onClick={() => markComplete(task._id)}>Complete</button>
            </div>
            )
          
        })}
        
    </div>
  )
}

export default IncompleteTasks