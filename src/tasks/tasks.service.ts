import { Injectable } from "@nestjs/common";
import { randomUUID } from "crypto";
import { Task, TaskStatus } from "./task.model";

@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    getAllTasks(): Task[] {
        return this.tasks;
    }

    createTask(title: string, description: string): Task {
        const task = {
            id: randomUUID(),
            title,
            description,
            status: TaskStatus.OPEN,
        };

        this.tasks.push(task);

        return task;
    }
}
