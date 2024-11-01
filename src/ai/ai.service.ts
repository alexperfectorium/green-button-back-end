import { HttpException, Injectable } from '@nestjs/common';
import OpenAI from "openai";
import { IChatResponse, IChatRequest } from './ai.interfaces';

@Injectable()
export class AiService {
    public openai: OpenAI;

    constructor() {
        this.openai = new OpenAI({
            apiKey: process.env.OPEN_AI_SECRET_KEY,
        });
    }

    async text(request) {
        try {
            let req = await this.openai.chat.completions.create({
                model: process.env.OPENAI_API_MODEL,
                messages: request.messages,
                functions: request?.functions ?? undefined,
            });

            return req?.choices?.length && req?.choices[0];
        } catch(e) {
            throw new HttpException(e.message, e.status);
        }
    }
}
