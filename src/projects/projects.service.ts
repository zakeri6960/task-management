import { BadRequestException, Injectable } from '@nestjs/common';
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
      throw new BadRequestException(error);
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
      throw new BadRequestException(error);
    }
  }

  async findOne(id: string) {
    try {
      const project = await this.projectRepository.findOneOrFail({where: {id}});
      return project;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async update(id: string, updateProjectDto: UpdateProjectDto) {
    const updatedProject = await this.projectRepository.update({id}, updateProjectDto);
  }

  remove(id: number) {
    return `This action removes a #${id} project`;
  }
}
