import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type UserDocument = mongoose.HydratedDocument<User>;

@Schema()
export class User {
    @Prop({ type: Date, required: true, default: Date.now() })
    date: Date;

    @Prop({ required: true })
    full_name: string;
    
    @Prop({ required: true, unique: true })
    email: string;
    
    @Prop({ required: true })
    password: string;

    @Prop({ required: false })
    google_id: string;
    
    @Prop()
    avatar: string;
}

export const UserSchema = SchemaFactory.createForClass(User);