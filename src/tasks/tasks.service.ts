import { Injectable, NotFoundException } from "@nestjs/common";
import { randomUUID } from "crypto";
import { CreateTaskDto } from "./dto/create-task.dto";
import { GetTasksFilterDto } from "./dto/get-tasks-filter.dto";
import { Task, TaskStatus } from "./task.model";

@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    getAllTasks(): Task[] {
        return this.tasks;
    }

    createTask(createTaskDto: CreateTaskDto): Task {
        const { title, description } = createTaskDto;

        const task = {
            id: randomUUID(),
            title,
            description,
            status: TaskStatus.OPEN,
        };

        this.tasks.push(task);

        return task;
    }

    getTaskById(id: string): Task {
        const task = this.tasks.find((task) => task.id === id);

        if (!task) {
            throw new NotFoundException(`Task with ID '${id}' not found`);
        }

        return task;
    }

    deleteTask(id: string) {
        this.tasks = this.tasks.filter((task) => task.id !== id);
    }

    updateTaskStatus(id: string, status: TaskStatus) {
        const task = this.getTaskById(id);
        task.status = status;

        return task;
    }

    getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
        const { status, search } = filterDto;

        let tasks = this.getAllTasks();

        if (status) {
            tasks = tasks.filter((task) => task.status === status);
        }

        if (search) {
            tasks = tasks.filter((task) => {
                if (
                    task.title.toLowerCase().includes(search.toLowerCase()) ||
                    task.description
                        .toLowerCase()
                        .includes(search.toLowerCase())
                ) {
                    return true;
                }

                return false;
            });
        }

        return tasks;
    }
}
