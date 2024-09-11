import { CanActivate, ExecutionContext, UnauthorizedException, Injectable } from "@nestjs/common";
import { Request } from "express";
import { JwtService } from "@nestjs/jwt";
import { CookieService } from "./cookie.service";

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor ( private jwtService: JwtService ) {}

    async canActivate( context: ExecutionContext ) {
        const req = context.switchToHttp().getRequest() as Request;

        try {
            const access_token = req.cookies[CookieService.tokenKey];

            if (!access_token) {
                throw new UnauthorizedException({ 
                    statusCode: 401, 
                    message: 'server_error',
                    dev_message: `Invalid Authorization: token is not set` 
                });
            }

            const sessionInfo = await this.jwtService.verifyAsync(access_token);

            req['session'] = sessionInfo;
        } catch (e) {
            throw new UnauthorizedException({ 
                statusCode: 501, 
                message: 'server_error', 
                dev_message: e 
            });
        }

        return true;
    }
}