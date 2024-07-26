import React, { useState, useEffect } from 'react';
import { fetchTasks, createTask, updateTask, deleteTask } from './api';

const ToDo = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentTaskId, setCurrentTaskId] = useState(null);

  useEffect(() => {
    const getTasks = async () => {
      try {
        const tasks = await fetchTasks();
        setTasks(tasks);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    getTasks();
  }, []);

  const handleAddTask = async () => {
    if (task.trim()) {
      try {
        const newTask = await createTask({ text: task, completed: false });
        setTasks([...tasks, newTask]);
        setTask('');
      } catch (error) {
        console.error('Error adding task:', error);
      }
    }
  };

  const handleEditTask = (taskId, text) => {
    setTask(text);
    setIsEditing(true);
    setCurrentTaskId(taskId);
  };

  const handleUpdateTask = async () => {
    if (task.trim()) {
      try {
        const updatedTask = await updateTask(currentTaskId, { text: task, completed: false });
        setTasks(tasks.map(t => (t.id === currentTaskId ? updatedTask : t)));
        setTask('');
        setIsEditing(false);
        setCurrentTaskId(null);
      } catch (error) {
        console.error('Error updating task:', error);
      }
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(taskId);
      setTasks(tasks.filter(t => t.id !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    isEditing ? handleUpdateTask() : handleAddTask();
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">To-Do List</h1>
        <form onSubmit={handleSubmit} className="mb-4">
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="border p-2 rounded w-full"
            placeholder="Add a new task"
          />
          <button
            type="submit"
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
          >
            {isEditing ? 'Update Task' : 'Add Task'}
          </button>
        </form>
        <ul>
          {tasks.map((task) => (
            <li
              key={task.id}
              className={`p-2 border-b flex justify-between items-center ${
                task.completed ? 'line-through' : ''
              }`}
            >
              <span onClick={() => handleEditTask(task.id, task.text)}>
                {task.text}
              </span>
              <div>
                <button
                  onClick={() => handleEditTask(task.id, task.text)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteTask(task.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ToDo;
