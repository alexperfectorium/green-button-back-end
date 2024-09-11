import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type ProjectDocument = mongoose.HydratedDocument<Project>;

@Schema()
export class Project extends mongoose.Document {
    @Prop({ type: Date, required: true, default: Date.now() })
    created_date: Date;

    @Prop({ required: true })
    name: string;

    @Prop({ required: false })
    marker: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
    owner: mongoose.Schema.Types.ObjectId;

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
    members: mongoose.Schema.Types.ObjectId[];

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Schedule' })
    schedule: mongoose.Schema.Types.ObjectId;

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Channel' }] })
    channels: mongoose.Schema.Types.ObjectId[];

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lending' }] })
    lendings: mongoose.Schema.Types.ObjectId[];
}

export const ProjectSchema = SchemaFactory.createForClass(Project);