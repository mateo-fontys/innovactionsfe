import axios from 'axios';
import { environment } from '../../../environments/environment';
import { Task } from './task.model';

const apiUrl = `${environment.apiUrl}/tasks`;

async function createTask(body: Task) {
  const response = await axios.post(apiUrl, body);
  return response.data;
}

// In tasks.service.ts
async function getTaskById(id: string) {
  try {
    console.log(`Fetching task with ID: ${id} from ${apiUrl}/${id}`);
    const response = await axios.get(`${apiUrl}/${id}`);
    console.log('Task API response:', response.data);
    return response.data;
  } catch (error) {
    console.error(`Error fetching task by id: ${id}`, error);
    // Check if it's a 404 error
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      console.error('Task not found (404)');
    }
    return null;
  }
}

async function updateTask(id: string, task: Task) {
  try {
    console.log('Updating task with data:', task);
    const response = await axios.put(`${apiUrl}/${id}`, task);
    return response.data;
  } catch (error) {
    console.error(`Error updating task with id: ${id}`, error);
    throw error; // Re-throw the error to handle it in the component
  }
}

async function getTasksFromCreator(creatorId: number) {
  try {
    const response = await axios.get(`${apiUrl}/creator/${creatorId}/overview`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching tasks from creator ${creatorId}: `, error);
    return null;
  }
}

async function getAllTasks() {
  try {
    const response = await axios.get(`${apiUrl}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching all tasks:', error);
    return null;
  }
}

async function approveTask(taskId: number) {
  try {
    const response = await axios.put(`${apiUrl}/${taskId}/approve`, {});
    console.log('Task approved successfully:', taskId);
    return response.data;
  } catch (error) {
    console.error(`Error approving task with id: ${taskId}`, error);
    return null;
  }
}

async function declineTask(taskId: number) {
  try {
    const response = await axios.put(`${apiUrl}/${taskId}/decline`, {});
    console.log('Task declined successfully:', taskId);
    return response.data;
  } catch (error) {
    console.error(`Error declining task with id: ${taskId}`, error);
    return null;
  }
}

async function archiveTask(taskId: number) {
  try {
    const response = await axios.delete(`${apiUrl}/${taskId}`);
    console.log('Task archived successfully:', response);
    return response.data;
  } catch (error) {
    console.error(`Error archiving task with id: ${taskId}`, error);
    return null;
  }
}

const TaskService = {
  createTask,
  getTaskById,
  updateTask,
  getTasksFromCreator,
  approveTask,
  declineTask,
  getAllTasks,
  archiveTask
};

export default TaskService;
