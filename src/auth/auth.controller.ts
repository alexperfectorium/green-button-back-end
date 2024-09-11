import { Body, Controller, Get, Post, Response, UseGuards, UsePipes, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SessionInfo } from './session-info.decorator';
import { GetSessionInfoDto } from './dto/get-session-info.dto';
import { JwtAuthGuard } from './jwt.auth.guard';
import { SignUpUserDto } from './dto/sign-up-user.dto';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { SignInUserDto } from './dto/sign-in-user.dto';
import { CookieService } from './cookie.service';
import { UsersService } from 'src/users/users.service';

@Controller('/api/auth')
export class AuthController {
    constructor (
        private authService: AuthService,
        private cookieService: CookieService,
        private usersService: UsersService
    ) {}

    @Get('/session')
    @UseGuards(JwtAuthGuard)
    async getSessionInfo(@SessionInfo() session: GetSessionInfoDto) {
        let user = await this.usersService.getUserBy({ 'email' : session.email}, { isProfile: true });
    
        if (!user) {
            throw new HttpException('not_allowed', HttpStatus.NOT_FOUND);
        }

        return user;        
    }

    @Post('/sign-up')
    @UsePipes(ValidationPipe)
    async signUp(
        @Body() body: SignUpUserDto,
        @Response({ passthrough: true }) res
    ) {
        const data = await this.authService.signUp(body);
        this.cookieService.setToken(res, data.access_token);                
        return data;        
    }
    
    @Post('/sign-in')
    @UsePipes(ValidationPipe)
    async signIn(
        @Body() body: SignInUserDto,
        @Response({ passthrough: true }) res
    ) {
        const data = await this.authService.signIn(body);
        this.cookieService.setToken(res, data.access_token); 
        return data;        
    }

    @Post('/sign-out')
    @UseGuards(JwtAuthGuard)
    signOut(
        @Response({ passthrough: true }) res
    ) {
        this.cookieService.removeToken(res);
    }
}
