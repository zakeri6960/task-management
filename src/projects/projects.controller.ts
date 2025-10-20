import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Res, HttpStatus, HttpCode } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectsStatusEnum } from 'src/Enums/projectEnums';
import { Response } from 'express';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  async create(
    @Body() createProjectDto: CreateProjectDto,
    @Res() res: Response
  ) {
    const result = await this.projectsService.create(createProjectDto);
    return res.status(HttpStatus.CREATED).json({
      statusCode: HttpStatus.CREATED,
      data: result,
      message: 'Project creation was successful.'
    })
  }

  @Get()
  async findAll(
    @Res() res: Response,
    @Query('status') status?: ProjectsStatusEnum,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 5
  ) {
    const result = await this.projectsService.findAll(status, page, limit);
    return res.status(HttpStatus.FOUND).json({
      statusCode: HttpStatus.FOUND,
      data: result,
      message: null
    })
  }

  @Get(':id')
  async findOne(
  @Res() res: Response,
  @Param('id') id: string) {
    const result = await this.projectsService.findOne(id);
    return res.status(HttpStatus.FOUND).json({
      statusCode: HttpStatus.FOUND,
      data: result,
      message: null
    })
  }

  @Patch(':id')
  async update(
  @Res() res: Response,
  @Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    await this.projectsService.update(id, updateProjectDto);
    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: null,
      message: 'The project update was successful.'
    })
  }

  @Delete(':id')
  async remove(
  @Res() res: Response,
  @Param('id') id: string) {
    await this.projectsService.remove(id);
    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: null,
      message: 'Project deletion was successful.'
    })
  }
}
