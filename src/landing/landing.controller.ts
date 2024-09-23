import { Controller, Get, Post, Body, UseGuards, UseInterceptors, Response } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { SessionInfo } from 'src/auth/session-info.decorator';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { CreateLandingDto } from './dto/create-landing.dto';
import { GetLandingDto } from './dto/get-landing.dto';
import { LandingService } from './landing.service';
import { GetSessionInfoDto } from 'src/auth/dto/get-session-info.dto';

@Controller('/api/landing')
export class LandingController {
    constructor(
        private landingService: LandingService
    ) {}

    @Get('/questionnaire')
    questionnaire() {
        return this.landingService.questionnaire();
    }

    @Post('/create')
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'logo', maxCount: 1 }
    ]))
    create(
        @SessionInfo() session: GetSessionInfoDto, 
        @Body() body: CreateLandingDto
        // @Response() res: GetLandingDto
    ){
        return this.landingService.create(session.userId, body);
    }
}
