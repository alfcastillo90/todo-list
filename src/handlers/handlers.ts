import { fetchTasks, createTask, updateTask, deleteTask, toggleTaskCompletion, Task } from '../api/api';
import { Dispatch, SetStateAction, FormEvent } from 'react';

export const handleFetchTasks = async (
  setTasks: Dispatch<SetStateAction<Task[]>>
) => {
  try {
    const tasks = await fetchTasks();
    setTasks(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
  }
};

export const handleAddTask = async (
  title: string,
  description: string,
  score: number,
  setTasks: Dispatch<SetStateAction<Task[]>>,
  setTitle: Dispatch<SetStateAction<string>>,
  setDescription: Dispatch<SetStateAction<string>>,
  setScore: Dispatch<SetStateAction<number>>,
  setShowModal: Dispatch<SetStateAction<boolean>>
) => {
  if (title.trim() && description.trim() && score !== null) {
    try {
      const newTask = await createTask({ title, description, score, completed: false });
      setTasks(prevTasks => [...prevTasks, newTask]);
      setTitle('');
      setDescription('');
      setScore(0);
    } catch (error) {
      console.error('Error adding task:', error);
    }
  } else {
    setShowModal(true);
  }
};

export const handleEditTask = (
  taskId: number,
  title: string,
  description: string,
  score: number,
  completed: boolean,
  setTitle: Dispatch<SetStateAction<string>>,
  setDescription: Dispatch<SetStateAction<string>>,
  setScore: Dispatch<SetStateAction<number>>,
  setIsEditing: Dispatch<SetStateAction<boolean>>,
  setCurrentTaskId: Dispatch<SetStateAction<number | null>>
) => {
  setTitle(title);
  setDescription(description);
  setScore(score);
  setIsEditing(true);
  setCurrentTaskId(taskId);
};

export const handleUpdateTask = async (
  currentTaskId: number | null,
  title: string,
  description: string,
  score: number,
  setTasks: Dispatch<SetStateAction<Task[]>>,
  setTitle: Dispatch<SetStateAction<string>>,
  setDescription: Dispatch<SetStateAction<string>>,
  setScore: Dispatch<SetStateAction<number>>,
  setIsEditing: Dispatch<SetStateAction<boolean>>,
  setCurrentTaskId: Dispatch<SetStateAction<number | null>>,
  setShowModal: Dispatch<SetStateAction<boolean>>
) => {
  if (title.trim() && description.trim() && score !== null && currentTaskId !== null) {
    try {
      const updatedTask = await updateTask(currentTaskId, { title, description, score, completed: false });
      setTasks(prevTasks => prevTasks.map(t => (t.id === currentTaskId ? updatedTask : t)));
      setTitle('');
      setDescription('');
      setScore(0);
      setIsEditing(false);
      setCurrentTaskId(null);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  } else {
    setShowModal(true);
  }
};

export const handleDeleteTask = async (
  taskId: number,
  setTasks: Dispatch<SetStateAction<Task[]>>
) => {
  try {
    await deleteTask(taskId);
    setTasks(prevTasks => prevTasks.filter(t => t.id !== taskId));
  } catch (error) {
    console.error('Error deleting task:', error);
  }
};

export const handleToggleCompletion = async (
  task: Task,
  setTasks: Dispatch<SetStateAction<Task[]>>
) => {
  try {
    const updatedTask = await toggleTaskCompletion(task);
    setTasks(prevTasks => prevTasks.map(t => (t.id === task.id ? updatedTask : t)));
  } catch (error) {
    console.error('Error toggling task completion:', error);
  }
};

export const handleSubmit = (
  e: FormEvent,
  isEditing: boolean,
  handleUpdateTask: () => Promise<void>,
  handleAddTask: () => Promise<void>
) => {
  e.preventDefault();
  isEditing ? handleUpdateTask() : handleAddTask();
};
