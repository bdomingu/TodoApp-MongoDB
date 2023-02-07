import React from 'react'

function Input({currentTask, setCurrentTask, submitTask}) {
  return (
    <div>
        <input
        type='text'
        value={currentTask}
        onChange={(e) => setCurrentTask(e.target.value)}
        />
        <button onClick={() => submitTask(currentTask)}>Add</button>
    </div>
  )
}

export default Input