import React, { useState } from 'react'

function Input({currentTask, setCurrentTask, submitTask}) {
const [value, setValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    submitTask(value);
    setValue('')
  }

  const handleOnChange = (e) => {
    setValue(e.target.value)
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
        type='text'
        value={value}
        onChange={handleOnChange}
        />
        <button disabled={!value} type='submit'>Add</button>
        </form>
    </div>
  )
}

export default Input