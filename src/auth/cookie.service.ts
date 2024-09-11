import { Injectable } from "@nestjs/common";
import { CookieOptions, Response } from "express";

@Injectable()
export class CookieService {
    static tokenKey = 'access_token';
    static cookieOptions : CookieOptions = { 
        httpOnly: true,
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,            
        sameSite: 'none',
        path: '/'      
    };


    setToken(res: Response, access_token: string) {
        res.cookie(CookieService.tokenKey, access_token, CookieService.cookieOptions);
    }

    removeToken(res: Response) {
        res.clearCookie(CookieService.tokenKey, CookieService.cookieOptions);
    }
}