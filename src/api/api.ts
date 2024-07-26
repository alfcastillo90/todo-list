import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000';

export interface Task {
  id: number;
  title: string;
  description: string;
  score: number;
  completed: boolean;
}

export const fetchTasks = async (): Promise<Task[]> => {
  try {
    const response = await axios.get(`${API_URL}/tasks/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
};

export const createTask = async (task: Omit<Task, 'id'>): Promise<Task> => {
  try {
    const response = await axios.post(`${API_URL}/tasks/`, task);
    return response.data;
  } catch (error) {
    console.error('Error creating task:', error);
    throw error;
  }
};

export const updateTask = async (taskId: number, task: Omit<Task, 'id'>): Promise<Task> => {
  try {
    const response = await axios.put(`${API_URL}/tasks/${taskId}`, task);
    return response.data;
  } catch (error) {
    console.error('Error updating task:', error);
    throw error;
  }
};

export const deleteTask = async (taskId: number): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/tasks/${taskId}`);
  } catch (error) {
    console.error('Error deleting task:', error);
    throw error;
  }
};

export const toggleTaskCompletion = async (task: Task): Promise<Task> => {
  try {
    const response = await axios.put(`${API_URL}/tasks/${task.id}`, {
      title: task.title,
      description: task.description,
      score: task.score,
      completed: !task.completed
    });
    return response.data;
  } catch (error) {
    console.error('Error toggling task completion:', error);
    throw error;
  }
};
