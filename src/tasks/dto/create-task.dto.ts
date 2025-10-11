import { TasksStatusEnum } from "src/Enums/taskEnums";

export class CreateTaskDto {
    title: string;
    description: string;
    status: TasksStatusEnum;
    project_id: string;
}
