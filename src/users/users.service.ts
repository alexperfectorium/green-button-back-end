import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';

type GetUserOptions = {
    withPassword?: boolean,
    detail?: boolean,
    isProfile?: boolean
} | undefined;

@Injectable()
export class UsersService {
    constructor(
       @InjectModel(User.name) private userModel: Model<UserDocument> 
    ) {}

    async createUser({data}) {
        try {
            const newUser = await new this.userModel({
                ...data
            });
            await newUser.save();    
            const { password, google_id, ...result } = newUser.toObject();
            return result;
        }
        catch(e) {
            console.log(e);
            throw new HttpException(e.message, e.status);
        }
    }

    async getUserBy(props, options : GetUserOptions  = {
        withPassword : false,
        detail: false,
        isProfile: false
    }) {
        try {
            let projection = { 
                password: 0,
                google_id: 0, 
                // some_saved: 0 
            };

            if (options.withPassword) {
                delete projection.password; 
                delete projection.google_id; 
            }
            
            if (options.isProfile) {
                // delete projection.some_saved;          
            }

            let user = await this.userModel.findOne(props, projection);
            return user;
        }
        catch(e) {
            throw new HttpException(e, HttpStatus.BAD_REQUEST);
        }
    }
}
