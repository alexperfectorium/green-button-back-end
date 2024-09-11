import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Project, ProjectDocument } from './schemas/project.schema';
import { Model } from 'mongoose';
// import { UsersService } from 'src/users/users.service';

@Injectable()
export class ProjectsService {
    constructor (
        // private usersService: UsersService,
        @InjectModel(Project.name) private projectsModel: Model<ProjectDocument>
    ) {}

    async createProject(props) {
        try {
            let { name, marker, owner } = props;

            if (!name) throw new HttpException('no_name', HttpStatus.BAD_REQUEST);
            
            let newProject = await new this.projectsModel({
                name, 
                marker: marker ?? 'none',
                owner,
                members: [ owner ]
            });

            await newProject.save();
            return newProject.toObject();

        } catch(e) {
            throw new HttpException(e.message, e.status);
        }
    }
}
