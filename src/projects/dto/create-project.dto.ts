import { IsOptional, IsString } from "class-validator";

export class CreateProjectDto {
    @IsString()
    readonly name: string;
    
    @IsString()
    @IsOptional()
    readonly marker?: string
}