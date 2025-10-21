import { ProjectsStatusEnum } from "src/Enums/projectEnums";
import { Task } from "src/tasks/entities/task.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'projects'})
export class Project {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({type: 'enum', enum: ProjectsStatusEnum ,default: ProjectsStatusEnum.Enable})
    status: ProjectsStatusEnum;

    @OneToMany(()=> Task, (task)=> task.project)
    tasks: Task[];
}
