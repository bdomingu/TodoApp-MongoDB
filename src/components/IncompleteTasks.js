import React from 'react'

function IncompleteTasks({tasks, deleteTasks, markComplete, handleTaskSelection}) {

  return (
    <div className='todo-container'>
      <h1>Incomplete Tasks</h1>
      <button onClick={() => markComplete()}>Complete</button>
      <div className='task-container'>
      {tasks.map((task) => {
        return (
            <><li key={task._id}><input type="checkbox" onChange={(e) => handleTaskSelection(e, task)} />
            {task.title}</li><button onClick={() => deleteTasks(task._id)}>Delete</button></>
        )

      })}
      </div>
      
    </div>
  )
}

export default IncompleteTasks