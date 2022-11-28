import { Injectable, NotFoundException } from "@nestjs/common";
import { User } from "src/auth/user.entity";
import { CreateTaskDto } from "./dto/create-task.dto";
import { GetTasksFilterDto } from "./dto/get-tasks-filter.dto";
import { Task } from "./dto/task.entity";
import { TaskStatus } from "./task-status.enum";
import { TasksRepository } from "./tasks.repository";

@Injectable()
export class TasksService {
    constructor(private tasksRepository: TasksRepository) {}

    async getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
        return this.tasksRepository.getTasks(filterDto, user);
    }

    async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
        return this.tasksRepository.createTask(createTaskDto, user);
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

    async updateTaskStatus(id: string, status: TaskStatus) {
        const task = await this.getTaskById(id);

        task.status = status;

        await this.tasksRepository.save(task);

        return task;
    }
}
