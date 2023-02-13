import React from 'react'

function IncompleteTasks({tasks, deleteTasks, markComplete, handleTaskSelection}) {

  return (
    <div>
      <h1>Incomplete Tasks</h1>
       
          {tasks.map((task) => {
         
            return (
            <div>
            <li key={task._id}><input type="checkbox" onChange={(e) => handleTaskSelection(e, task)}/>
            {task.title}</li>
            <button onClick={() => deleteTasks(task._id)}>Delete</button>
            
            </div>
            )
          
        })}
        <button onClick={() => markComplete()}>Complete</button>
    </div>
  )
}

export default IncompleteTasks