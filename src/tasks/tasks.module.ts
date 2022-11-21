import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TasksController } from "./tasks.controller";
import { Task } from "./dto/task.entity";
import { TasksService } from "./tasks.service";
import { TasksRepository } from "./tasks.repository";

@Module({
    imports: [TypeOrmModule.forFeature([Task])],
    controllers: [TasksController],
    providers: [TasksService, TasksRepository],
})
export class TasksModule {}
