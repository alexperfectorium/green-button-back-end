import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type LandingDocument = mongoose.HydratedDocument<Landing>;

class Section {
    id: string;
    component: string;
    settings: {
        variation: number;
        inMenu: boolean;
        isAction: boolean;
        menuTitle: string;
    };
    block: Object;
}

class Appearence {
    colors: {
        "light": "",
        "dark": "",
        "accent": "",
        "text": "",
        "miscellaneous": ""
    }
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
  
    @Prop({ type: Array<Section>, required: true })
    sections: Section[];

    @Prop({ type: FormSubmission })
    form_submission: FormSubmission
}

export const LandingSchema = SchemaFactory.createForClass(Landing);