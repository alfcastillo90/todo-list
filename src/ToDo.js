import React, { useState } from 'react';

const ToDo = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState('');

  const addTask = () => {
    if (task.trim()) {
      setTasks([...tasks, { text: task, completed: false }]);
      setTask('');
    }
  };

  const toggleTaskCompletion = (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  };

  const deleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">To-Do List</h1>
        <div className="mb-4">
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="border p-2 rounded w-full"
            placeholder="Add a new task"
          />
          <button
            onClick={addTask}
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add Task
          </button>
        </div>
        <ul>
          {tasks.map((task, index) => (
            <li
              key={index}
              className={`p-2 border-b flex justify-between items-center ${
                task.completed ? 'line-through' : ''
              }`}
            >
              <span onClick={() => toggleTaskCompletion(index)}>
                {task.text}
              </span>
              <button
                onClick={() => deleteTask(index)}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ToDo;
