import { HttpException, Injectable } from '@nestjs/common';
import OpenAI from "openai";
import { IChatResponse } from './ai.interfaces';

@Injectable()
export class AiService {
    public openai: OpenAI;

    constructor() {
        this.openai = new OpenAI({
            apiKey: process.env.OPEN_AI_SECRET_KEY,
        });
    }

    async text(request): Promise<OpenAI.ChatCompletion> {
        try {
            return this.openai.chat.completions.create({
                model: process.env.OPENAI_API_MODEL,
                messages: request.messages,
                functions: request?.functions ?? undefined,
            });
        } catch(e) {
            throw new HttpException(e.message, e.status);
        }
    }
    
    getChatResponse(message: OpenAI.ChatCompletion): IChatResponse {
        return {
            success: true,
            result: message?.choices?.length && message?.choices[0],
        };
    }
}
