import axios from "axios";
import { Router } from "@angular/router";

function CreateTask(body: any, router: Router) {

    console.dir(body)

    axios.post("/api/tasks", body)
        .then((response) => {
            if (response) {
                console.log("Task created successfully");
                console.log("response:")
                console.dir(response)
                router.navigate(['/task-home']); // Replace with your actual route
            }
        })
        .catch((error) => {
            console.log("error: " + error);
        });
}

const TasksService = {
    CreateTask
}

export default TasksService;
