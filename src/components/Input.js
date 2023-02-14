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
    <div className='form-container'>
      <form onSubmit={handleSubmit}>
        <input
        type='text'
        className='form-input'
        placeholder='Enter a task...'
        value={value}
        onChange={handleOnChange}
        />
        <button 
        className='form-button'
        disabled={!value}
        type='submit'
         >Add</button>
        </form>
    </div>
  )
}

export default Input