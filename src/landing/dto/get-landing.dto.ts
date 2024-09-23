import * as mongoose from "mongoose"

export class GetLandingDto {
    readonly _id: mongoose.Schema.Types.ObjectId;
    readonly created_date: Date;
    readonly domain: string;
    readonly title: string;
    readonly set_title: string;
    readonly appearence: Object;
    readonly sections: Object;
}