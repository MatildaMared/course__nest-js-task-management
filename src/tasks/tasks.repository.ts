import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { Task } from "./dto/task.entity";

@Injectable()
export class TasksRepository extends Repository<Task> {}
