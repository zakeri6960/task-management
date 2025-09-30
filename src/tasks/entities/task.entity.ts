import { TasksStatusEnum } from "src/Enums/taskEnums";
import { Project } from "src/projects/entities/project.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'tasks'})
export class Task {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column({type: 'enum', enum: TasksStatusEnum, default: TasksStatusEnum.ToDo})
    status: TasksStatusEnum;

    @Column()
    project_id: string;

    @ManyToOne(()=> Project, (project)=> project.tasks)
    project: Project
}
