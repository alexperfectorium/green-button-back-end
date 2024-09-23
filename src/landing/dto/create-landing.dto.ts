import { IsString, IsIn, IsArray, ValidateNested, IsNotEmpty, MinLength, ArrayNotEmpty, IsMimeType, ValidateIf, IsOptional, Min, Max } from "class-validator";
import { Type } from "class-transformer";

class ProductDto {
    @IsString()
    readonly name: string
    
    @IsString()
    readonly price: number
    
    @IsIn(['uah', 'usd'])
    readonly currency: string
    
    @IsOptional() 
    @IsMimeType()
    readonly image: Express.Multer.File
}

export class CreateLandingDto {
    @IsString()
    @IsNotEmpty()
    readonly title: string;

    @IsIn(["ecommerce", "promotion"])
    readonly type: string;    
    
    @IsString()
    @IsNotEmpty()
    @MinLength(50)
    readonly description: string;    

    @IsIn(["call", "send-a-message", "go-to-socials"])
    readonly action: string;    
    
    @IsString()
    readonly company_name: string;    

    @IsArray()
    @ArrayNotEmpty()
    @ValidateIf(o => o.type === 'ecommerce')
    @ValidateNested({ each: true })
    @Min(1)
    @Max(3)
    @Type(() => ProductDto)
    readonly products: ProductDto[]

    @IsOptional()
    @IsMimeType()
    readonly logo: Express.Multer.File
     
    // @IsOptional()
    // @IsMimeType()
    // readonly brandbook: Express.Multer.File
}