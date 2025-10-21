import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { Repository } from 'typeorm';
import { ProjectsStatusEnum } from 'src/Enums/projectEnums';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>
  ) {} 

  async create(createProjectDto: CreateProjectDto): Promise<CreateProjectDto> {
    try {
      const newProject = this.projectRepository.create(createProjectDto);
      return await this.projectRepository.save(newProject);
    } catch (error) {
      throw new BadRequestException(error.message || `Create new project failed`);
    }
  }

  async findAll(status?: ProjectsStatusEnum, page: number = 1, limit: number = 5) {
    try {
      const query = this.projectRepository.createQueryBuilder('projects');

      if(status){
        query.where('status = :x', {x: status});
      }
      query.skip((page - 1) * limit).take(limit);
      return await query.getMany();
    } catch (error) {
      throw new NotFoundException(error.message || `Get projects failed`);
    }
  }

  async findOne(id: number) {
    try {
      const project = await this.projectRepository.findOneOrFail({where: {id}});
      return project;
    } catch (error) {
      throw new NotFoundException(error?.message || `Project with ID ${id} not found.`);
    }
  }

  async update(id: number, updateProjectDto: UpdateProjectDto) {
    try {
      const updatedProject = await this.projectRepository.update({id}, updateProjectDto);
      return updatedProject;
    } catch (error) {
      throw new BadRequestException(error.message || `Update project with ID ${id} failed`)
    }
  }

  async remove(id: number) {
    try {
      const result= await this.projectRepository.delete(id);
      if(result.affected === 0){
        throw new NotFoundException(`Project with ID ${id} not found`)
      }
    } catch (error) {
      throw new BadRequestException(error.message || `Delete project with ID ${id} failed`);
    }
  }
}
