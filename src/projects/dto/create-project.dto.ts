import { ProjectsStatusEnum } from "src/Enums/projectEnums";

export class CreateProjectDto {
    title: string;
    status: ProjectsStatusEnum;
}
