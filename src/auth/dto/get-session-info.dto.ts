import mongoose from "mongoose";

export class GetSessionInfoDto {
    userId: mongoose.Schema.Types.ObjectId;

    email: string;

    iat: number;
    
    exp: number;
}