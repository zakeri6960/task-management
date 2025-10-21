import { TasksStatusEnum } from "src/Enums/taskEnums";
import { Project } from "src/projects/entities/project.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'tasks'})
export class Task {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column({type: 'enum', enum: TasksStatusEnum, default: TasksStatusEnum.ToDo})
    status: TasksStatusEnum;

    @Column({nullable: true})
    project_id: number;

    @ManyToOne(()=> Project, (project)=> project.tasks)
    @JoinColumn({name: "project_id"})
    project: Project;
}
