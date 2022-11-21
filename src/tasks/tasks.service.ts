import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateTaskDto } from "./dto/create-task.dto";
import { GetTasksFilterDto } from "./dto/get-tasks-filter.dto";
import { Task } from "./dto/task.entity";
import { TaskStatus } from "./task-status.enum";
import { TasksRepository } from "./tasks.repository";

@Injectable()
export class TasksService {
    constructor(private tasksRepository: TasksRepository) {}

    // getAllTasks(): Task[] {
    //     return this.tasks;
    // }
    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        return this.tasksRepository.createTask(createTaskDto);
    }

    async getTaskById(id: string): Promise<Task> {
        const task = await this.tasksRepository.findOneBy({ id });

        if (!task) {
            throw new NotFoundException(`Task with id ${id} not found`);
        }

        return task;
    }

    async deleteTask(id: string): Promise<void> {
        const result = await this.tasksRepository.delete(id);

        if (result.affected === 0) {
            throw new NotFoundException(`Task with id ${id} not found`);
        }
    }
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
