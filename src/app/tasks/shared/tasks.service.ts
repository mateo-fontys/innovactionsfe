import axios from 'axios';
import { environment } from '../../../environments/environment';
import { Task } from './task.model';

const apiUrl = `${environment.apiUrl}/tasks`;

async function createTask(body: Task) {
  try {
    const response = await axios.post(apiUrl, body);
    return response.data;
    console.log('Task created successfully:', response.data);
  } catch (error) {
    console.error('Error creating task:', error);
  }
}

async function getTaskById(id: string) {
  try {
    const response = await axios.get(`${apiUrl}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching task by id: ${id}`, error);
    return null;
  }
}

async function updateTask(id: string, task: Task) {
  try {
    const response = await axios.put(`${apiUrl}/${id}`, task);
    return response.data;
  } catch (error) {
    console.error(`Error updating task with id: ${id}`, error);
    return null;
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

const TaskService = {
  createTask,
  getTaskById,
  updateTask,
  getTasksFromCreator,
};

export default TaskService;
