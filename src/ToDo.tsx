import React, { useState, useEffect, FormEvent } from 'react';
import { fetchTasks, createTask, updateTask, deleteTask, Task } from './api';

const ToDo: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [score, setScore] = useState<number>(0);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [currentTaskId, setCurrentTaskId] = useState<number | null>(null);

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
    if (title.trim() && description.trim() && score !== null) {
      try {
        const newTask = await createTask({ title, description, score, completed: false });
        setTasks([...tasks, newTask]);
        setTitle('');
        setDescription('');
        setScore(0);
      } catch (error) {
        console.error('Error adding task:', error);
      }
    }
  };

  const handleEditTask = (taskId: number, title: string, description: string, score: number) => {
    setTitle(title);
    setDescription(description);
    setScore(score);
    setIsEditing(true);
    setCurrentTaskId(taskId);
  };

  const handleUpdateTask = async () => {
    if (title.trim() && description.trim() && score !== null && currentTaskId !== null) {
      try {
        const updatedTask = await updateTask(currentTaskId, { title, description, score, completed: false });
        setTasks(tasks.map(t => (t.id === currentTaskId ? updatedTask : t)));
        setTitle('');
        setDescription('');
        setScore(0);
        setIsEditing(false);
        setCurrentTaskId(null);
      } catch (error) {
        console.error('Error updating task:', error);
      }
    }
  };

  const handleDeleteTask = async (taskId: number) => {
    try {
      await deleteTask(taskId);
      setTasks(tasks.filter(t => t.id !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleSubmit = (e: FormEvent) => {
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
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 rounded w-full"
            placeholder="Title"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border p-2 rounded w-full mt-2"
            placeholder="Description"
          ></textarea>
          <input
            type="number"
            value={score}
            onChange={(e) => setScore(Number(e.target.value))}
            className="border p-2 rounded w-full mt-2"
            placeholder="Score"
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
              <div onClick={() => handleEditTask(task.id, task.title, task.description, task.score)}>
                <h3>{task.title}</h3>
                <p>{task.description}</p>
                <p>Score: {task.score}</p>
              </div>
              <div>
                <button
                  onClick={() => handleEditTask(task.id, task.title, task.description, task.score)}
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
