import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { randomUUID } from "crypto";
import { CreateTaskDto } from "./dto/create-task.dto";
import { GetTasksFilterDto } from "./dto/get-tasks-filter.dto";
import { Task } from "./dto/task.entity";
import { TaskStatus } from "./task-status.enum";
import { TasksRepository } from "./tasks.repository";

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TasksRepository)
        private tasksRepository: TasksRepository,
    ) {}

    // private tasks: Task[] = [];
    // getAllTasks(): Task[] {
    //     return this.tasks;
    // }
    // createTask(createTaskDto: CreateTaskDto): Task {
    //     const { title, description } = createTaskDto;
    //     const task = {
    //         id: randomUUID(),
    //         title,
    //         description,
    //         status: TaskStatus.OPEN,
    //     };
    //     this.tasks.push(task);
    //     return task;
    // }

    async getTaskById(id: string): Promise<Task> {
        const task = await this.tasksRepository.findOneBy({ id });

        if (!task) {
            throw new NotFoundException(`Task with id ${id} not found`);
        }

        return task;
    }

    // deleteTask(id: string) {
    //     this.tasks = this.tasks.filter((task) => task.id !== id);
    // }
    // updateTaskStatus(id: string, status: TaskStatus) {
    //     const task = this.getTaskById(id);
    //     task.status = status;
    //     return task;
    // }
    // getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
    //     const { status, search } = filterDto;
    //     let tasks = this.getAllTasks();
    //     if (status) {
    //         tasks = tasks.filter((task) => task.status === status);
    //     }
    //     if (search) {
    //         tasks = tasks.filter((task) => {
    //             if (
    //                 task.title.toLowerCase().includes(search.toLowerCase()) ||
    //                 task.description
    //                     .toLowerCase()
    //                     .includes(search.toLowerCase())
    //             ) {
    //                 return true;
    //             }
    //             return false;
    //         });
    //     }
    //     return tasks;
    // }
}
