import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
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
      throw new BadRequestException(error.message || `Create new task failed`);
    }
  }

  async findAll(status?: TasksStatusEnum, page: number = 1, limit: number = 5) {
    try {
      const tasks = this.taskRepository.createQueryBuilder('tasks')
      .leftJoinAndSelect('tasks.project', 'project');
      if(status){
        tasks.andWhere('tasks.status= :x', {x: status});
      }
      tasks.skip((page - 1) * limit).take(limit);
      return await tasks.getMany();
    } catch (error) {
      throw new BadRequestException(error.message || `Get tasks failed`);
    }

  } 

  async findOne(id: number) {
    try {
      const task = this.taskRepository.findOneOrFail({where: {id}});
      return await task;
    } catch (error) {
      throw new NotFoundException(error?.message || `Task with ID ${id} not found.`);
    }
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    try {
      const updatedTask = this.taskRepository.update(id, updateTaskDto);
      return await updatedTask;
    } catch (error) {
      throw new BadRequestException(error.message || `Update task with ID ${id} failed`);
    }
  }

  async remove(id: number) {
    try {
      const result = await this.taskRepository.delete(id);
      if(result.affected === 0){
        throw new NotFoundException(`Task with ID ${id} not found`);
      }
    } catch (error) {
      throw new BadRequestException(error.message || `Delete task with ID ${id} failed`);
    }
  }
}
