import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { ProjectsStatusEnum } from "src/Enums/projectEnums";

export class CreateProjectDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsOptional()
    @IsEnum(ProjectsStatusEnum)
    status: ProjectsStatusEnum = ProjectsStatusEnum.Enable;
}
