import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { SessionInfo } from 'src/auth/session-info.decorator';
import { GetSessionInfoDto } from 'src/auth/dto/get-session-info.dto';

@Controller('/api/projects')
export class ProjectsController {
    constructor (
        private projectsService: ProjectsService
    ) {}

    @Post('/create')
    @UseGuards(JwtAuthGuard)
    async createProject(@SessionInfo() session: GetSessionInfoDto, @Body() body: CreateProjectDto) {
        return this.projectsService.createProject({
            owner: session.userId,
            ...body
        });
    }
}
