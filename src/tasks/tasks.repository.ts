import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, EntityRepository, Repository } from "typeorm";
import { CreateTaskDto } from "./dto/create-task.dto";
import { Task } from "./dto/task.entity";
import { TaskStatus } from "./task-status.enum";

@Injectable()
export class TasksRepository extends Repository<Task> {
    constructor(private dataSource: DataSource) {
        super(Task, dataSource.createEntityManager());
    }

    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        const { title, description } = createTaskDto;

        const task = this.create({
            title,
            description,
            status: TaskStatus.OPEN,
        });

        await this.save(task);
        return task;
    }
}

// @EntityRepository(Task)
// export class TasksRepository extends Repository<Task> {
//     async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
//         const { title, description } = createTaskDto;

//         const task = this.create({
//             title,
//             description,
//             status: TaskStatus.OPEN,
//         });

//         await this.save(task);
//         return task;
//     }
// }
