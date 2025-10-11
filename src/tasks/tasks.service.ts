import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { TasksStatusEnum } from 'src/Enums/taskEnums';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>
  ) {}

  async create(createTaskDto: CreateTaskDto) {
    try {
      const newTask = this.taskRepository.create(createTaskDto);
      return await this.taskRepository.save(newTask);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findAll(status?: TasksStatusEnum, page: number = 1, limit: number = 5) {
    try {
      const tasks = this.taskRepository.createQueryBuilder();
      if(status){
        tasks.where('status= :x', {x: status});
      }
      tasks.skip((page - 1) * limit).limit(limit);
      return await tasks.getMany();
    } catch (error) {
      throw new BadRequestException(error);
    }

  }

  async findOne(id: string) {
    try {
      const task = this.taskRepository.findOneOrFail({where: {id}});
      return await task;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    try {
      const updatedTask = this.taskRepository.update(id, updateTaskDto);
      return await updatedTask;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async remove(id: string) {
    try {
      await this.taskRepository.delete(id);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
