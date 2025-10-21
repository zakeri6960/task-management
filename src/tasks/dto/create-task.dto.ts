import { Optional } from "@nestjs/common";
import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { TasksStatusEnum } from "src/Enums/taskEnums";

export class CreateTaskDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsString()
    description: string;

    @Optional()
    @IsEnum(TasksStatusEnum)
    status: TasksStatusEnum = TasksStatusEnum.ToDo;

    @IsNotEmpty()
    @IsNumber()
    project_id: number;
}
