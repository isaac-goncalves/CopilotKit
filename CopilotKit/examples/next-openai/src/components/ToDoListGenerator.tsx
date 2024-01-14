import React, { useState, useEffect } from 'react';
// import axios from 'axios';

function ToDoListGenerator() {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [generatedList, setGeneratedList] = useState([]);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleGenerateList = async () => {
    setLoading(true);
    const response = await fetch('https://api.openai.com/v1/engines/davinci/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer YOUR_OPENAI_API_KEY_HERE'
      },
      body: JSON.stringify({
        prompt: `Create a todo list:\n${input}\n-`,
        max_tokens: 100
      })
    });

    const data = await response.json();

    console.log(data);

    // const extractedTodos = data.choices[0].text.trim().split('-').filter(todo => todo.trim() !== '');

    // setTodos(extractedTodos);
  };




  return (
    <div>
      <input
        type="text"
        value={input}
        onChange={handleInputChange}
        placeholder="Insert what you want to do"
      />
      <button onClick={handleGenerateList}>Generate To-Do List</button>
      {loading && <div className="spinner">Loading...</div>}
      {generatedList.length > 0 && (
        <ul>
          {generatedList.map((task) => (
            <li key={task}>{task}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ToDoListGenerator;