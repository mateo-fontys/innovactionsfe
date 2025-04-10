import axios from 'axios';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

function CreateTask(body: any, router: Router) {
  console.dir(body);

  axios
    .post(`${environment.apiUrl}/api/tasks`, body)
    .then((response) => {
      if (response) {
        console.log('Task created successfully');
        console.log('response:');
        console.dir(response);
        router.navigate(['/task-home']); // Replace with your actual route
      }
    })
    .catch((error) => {
      console.log('error: ' + error);
    });
}

async function GetTasksFromCreator(creatorId: number) {
  try {
    const response = await axios.get(
      `${environment.apiUrl}/api/tasks/creator/${creatorId}/overview`
    );
    console.log(`Succesfully fetched tasks from creator ${creatorId}`);
    console.log(response.data);

    return response.data;
  } catch (error) {
    console.error(`Error fetching tasks from creator ${creatorId} : `, error);
    return null;
  }
}

const TasksService = {
  CreateTask,
  GetTasksFromCreator,
};

export default TasksService;
