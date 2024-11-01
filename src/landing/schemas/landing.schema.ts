import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { ColorsType } from '../entities/appearence.entity';
import { SectionType } from '../entities/sections.entity';

export type LandingDocument = mongoose.HydratedDocument<Landing>;

class Appearence {
    colors: ColorsType
}

class FormSubmission {
    fields: Array<{
        type: 'text'
    }>
}

@Schema()
export class Landing extends mongoose.Document {
    @Prop({ type: Date, required: true, default: Date.now() })
    created_date: Date;
    
    @Prop({ type: String, required: true, unique: true })
    domain: string;

    @Prop({ type: String, required: true })
    title: string;

    @Prop({ type: String, required: true })
    seo_title: string;

    @Prop({ type: Appearence, required: true })
    appearence: Appearence;
  
    @Prop({ type: Array<SectionType>, required: true })
    sections: SectionType[];

    @Prop({ type: FormSubmission })
    form_submission: FormSubmission
}

export const LandingSchema = SchemaFactory.createForClass(Landing);