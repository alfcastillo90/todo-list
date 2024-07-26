import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000';

export const fetchTasks = async () => {
  try {
    const response = await axios.get(`${API_URL}/tasks/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
};

export const createTask = async (task) => {
  try {
    const response = await axios.post(`${API_URL}/tasks/`, task);
    return response.data;
  } catch (error) {
    console.error('Error creating task:', error);
    throw error;
  }
};

export const updateTask = async (taskId, task) => {
  try {
    const response = await axios.put(`${API_URL}/tasks/${taskId}`, task);
    return response.data;
  } catch (error) {
    console.error('Error updating task:', error);
    throw error;
  }
};

export const deleteTask = async (taskId) => {
  try {
    const response = await axios.delete(`${API_URL}/tasks/${taskId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting task:', error);
    throw error;
  }
};
