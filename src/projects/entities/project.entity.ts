import { ProjectsStatusEnum } from "src/Enums/projectEnums";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'projects'})
export class Project {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    title: string;

    @Column({type: 'enum', enum: ProjectsStatusEnum ,default: ProjectsStatusEnum.Enable})
    status: ProjectsStatusEnum;
}
