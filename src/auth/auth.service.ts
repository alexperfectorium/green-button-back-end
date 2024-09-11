import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignUpUserDto } from './dto/sign-up-user.dto';
import { SignInUserDto } from './dto/sign-in-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
    constructor( 
        private jwtService: JwtService, 
        private usersService: UsersService    
    ) {}

    generateToken(user) {
        const payload = { email: user.email, userId: user._id };
        return this.jwtService.sign(payload);
    }

    async signUp(body: SignUpUserDto) {
        try {
            // User is exist
            const candidate = await this.usersService.getUserBy({email: body.email});
            if (candidate) {
                throw new HttpException('user_is_exist', HttpStatus.BAD_REQUEST);
            }
    
            if (!body.password || body.password.length < 8) {
                throw new HttpException('short_password', HttpStatus.BAD_REQUEST);
            }
           

            let hashedPassword = await bcrypt.hash(body.password, 12);             
    
            let { confirm_password, ...userData } = body;

            let newUser = await this.usersService.createUser({
                data: {
                    ...userData,
                    password: hashedPassword
                }
            });        

            return {
                access_token: this.generateToken(newUser),
                user: newUser
            };
        }
        catch(e) {
            throw new HttpException(e.message, e.status);
        }
    }

    async signIn(body : SignInUserDto) {
        try {
            let { email, password } = body;

            if (!email || !password) {
                throw new HttpException('email_or_password_is_empty', HttpStatus.BAD_REQUEST);
            }

            const user = await this.usersService.getUserBy({'email': email}, { 
                withPassword: true
            });

            if (!user) {
                throw new HttpException('user_not_exist', HttpStatus.BAD_REQUEST);
            }

            const isPasswordEquals = await bcrypt.compare(password, user.password);
            
            if (!isPasswordEquals) {
                if ( user?.google_id?.length ) {
                    throw new HttpException('registered_with_google', HttpStatus.BAD_REQUEST);
                } else {
                    throw new HttpException('incorrect_password', HttpStatus.BAD_REQUEST);
                }
            }

            return {
                access_token: this.generateToken(user),
                user: user
            };
        }
        catch(e) {
            throw new HttpException(e.message, e.status);
        }
    }
}
