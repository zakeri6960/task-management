import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpStatus, HttpCode, Res } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TasksStatusEnum } from 'src/Enums/taskEnums';
import { Response } from 'express';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  async create(
    @Res() res: Response,
    @Body() createTaskDto: CreateTaskDto,
) {
    const result = await this.tasksService.create(createTaskDto);
    return res.status(HttpStatus.CREATED).json({
          statusCode: HttpStatus.CREATED,
          data: result,
          message: 'Task creation was successful.'
        })
  }

  @Get()
  async findAll(
    @Res() res: Response,
    @Query('status') status?: TasksStatusEnum,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 5 
  ) {
    const result = await this.tasksService.findAll(status, page, limit);
    return res.status(HttpStatus.FOUND).json({
      statusCode: HttpStatus.FOUND,
      data: result,
      message: null
    })
  }

  @Get(':id')
  async findOne(
    @Param('id') id: number,
    @Res() res: Response
) {
    const result = await this.tasksService.findOne(id);
    return res.status(HttpStatus.FOUND).json({
      statusCode: HttpStatus.FOUND,
      data: result,
      message: null
    })
  }

  @Patch(':id')
  async update(
    @Param('id') id: number, 
    @Body() updateTaskDto: UpdateTaskDto,
    @Res() res: Response
) {
    await this.tasksService.update(id, updateTaskDto);
    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: null,
      message: 'The task update was successful.'
    })
  }

  @Delete(':id')
  async remove(
    @Param('id') id: number,
    @Res() res: Response
) {
    await this.tasksService.remove(id);
    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: null,
      message: 'Project deletion was successful.'
    })
  }
}
