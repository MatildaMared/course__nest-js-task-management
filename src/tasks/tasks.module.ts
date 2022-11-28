import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TasksController } from "./tasks.controller";
import { Task } from "./dto/task.entity";
import { TasksService } from "./tasks.service";
import { TasksRepository } from "./tasks.repository";
import { AuthModule } from "src/auth/auth.module";
import { ConfigModule } from "@nestjs/config";

@Module({
    imports: [ConfigModule, TypeOrmModule.forFeature([Task]), AuthModule],
    controllers: [TasksController],
    providers: [TasksService, TasksRepository],
})
export class TasksModule {}
