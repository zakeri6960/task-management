import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpStatus, HttpCode } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TasksStatusEnum } from 'src/Enums/taskEnums';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createTaskDto: CreateTaskDto) {
    const result = await this.tasksService.create(createTaskDto);
    return {
          statusCode: HttpStatus.CREATED,
          data: result,
          message: 'Task creation was successful.'
        }
  }

  @Get()
  @HttpCode(HttpStatus.FOUND)
  async findAll(
    @Query('status') status?: TasksStatusEnum,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 5 
  ) {
    const result = await this.tasksService.findAll(status, page, limit);
    return {
      statusCode: HttpStatus.FOUND,
      data: result,
      message: null
    }
  }

  @Get(':id')
  @HttpCode(HttpStatus.FOUND)
  async findOne(@Param('id') id: string) {
    const result = await this.tasksService.findOne(id);
    return {
      statusCode: HttpStatus.FOUND,
      data: result,
      message: null
    }
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    await this.tasksService.update(id, updateTaskDto);
    return {
      statusCode: HttpStatus.OK,
      data: null,
      message: 'The task update was successful.'
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id') id: string) {
    await this.tasksService.remove(id);
    return {
      statusCode: HttpStatus.OK,
      data: null,
      message: 'Project deletion was successful.'
    }
  }
}
