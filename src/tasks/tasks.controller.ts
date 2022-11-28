import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
    UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { GetUser } from "src/auth/get-user.docrator";
import { User } from "src/auth/user.entity";
import { CreateTaskDto } from "./dto/create-task.dto";
import { GetTasksFilterDto } from "./dto/get-tasks-filter.dto";
import { Task } from "./dto/task.entity";
import { UpdateTaskStatusDto } from "./dto/update-task-status.dto";
import { TasksService } from "./tasks.service";
import { Logger } from "@nestjs/common";

@Controller("tasks")
@UseGuards(AuthGuard())
export class TasksController {
    private logger = new Logger("TasksController");

    constructor(private tasksService: TasksService) {}

    @Get()
    getTasks(
        @Query() filterDto: GetTasksFilterDto,
        @GetUser() user: User,
    ): Promise<Task[]> {
        this.logger.verbose(
            `User "${
                user.username
            }" retrieving all tasks. Filters: ${JSON.stringify(filterDto)}`,
        );

        return this.tasksService.getTasks(filterDto, user);
    }

    @Get("/:id")
    getTaskById(@Param("id") id: string, @GetUser() user: User): Promise<Task> {
        this.logger.verbose(
            `User "${user.username}" retrieving task by ID. Task ID: ${id}`,
        );
        return this.tasksService.getTaskById(id, user);
    }

    @Post()
    createTask(
        @Body() createTaskDto: CreateTaskDto,
        @GetUser() user: User,
    ): Promise<Task> {
        this.logger.verbose(
            `User "${
                user.username
            }" creating a new task. Data: ${JSON.stringify(createTaskDto)}`,
        );
        return this.tasksService.createTask(createTaskDto, user);
    }

    @Delete("/:id")
    deleteTask(@Param("id") id: string, @GetUser() user: User) {
        this.logger.verbose(
            `User "${user.username}" deleting task. Task ID: ${id}`,
        );
        return this.tasksService.deleteTask(id, user);
    }

    @Patch("/:id/status")
    updateTaskStatus(
        @Param("id") id: string,
        @Body() { status }: UpdateTaskStatusDto,
        @GetUser() user: User,
    ): Promise<Task> {
        this.logger.verbose(
            `User "${user.username}" updating task status. Task ID: ${id}, Status: ${status}`,
        );
        return this.tasksService.updateTaskStatus(id, status, user);
    }
}
