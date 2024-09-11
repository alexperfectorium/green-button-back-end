import { IsString, IsEmail, Length, IsOptional, IsArray } from "class-validator";

export class SignUpUserDto {
    @IsString({ message: 'Full name should be a string' })
    readonly full_name: string;
    
    @IsString({ message: 'Email should be a string' })
    @IsEmail({}, { message: 'Email is not correct' })
    readonly email: string;
    
    @IsString({ message: 'Password should be a string' })
    @Length(8, undefined, { message: 'Minimum password length - 8 symbols' })
    readonly password: string;

    @IsString({ message: 'Confirm password should be a string' })
    @Length(8, undefined, { message: 'Minimum confirm password length - 8 symbols' })
    readonly confirm_password: string;
}

export class SignUpGoogleDto {
    @IsString({ message: 'Token should be a string' })
    readonly access_token: string;
}