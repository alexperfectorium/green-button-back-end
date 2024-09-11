import { IsString, IsEmail, Length } from "class-validator";

export class SignInUserDto {
    @IsString({ message: 'Email should be a string' })
    @IsEmail({}, { message: 'Email is not correct' })
    readonly email: string;
    
    @IsString({ message: 'Password should be a string' })
    @Length(8, undefined, { message: 'Minimum characters length - 8 symbols' })
    readonly password: string;    
}