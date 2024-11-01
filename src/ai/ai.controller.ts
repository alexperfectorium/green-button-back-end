import { Controller, Post, Body } from '@nestjs/common';
import { IChatResponse } from './ai.interfaces';
import { AiService } from './ai.service';
import OpenAI from 'openai';

@Controller('/api/ai')
export class AiController {
    constructor(private aiService: AiService) {}

    @Post('/chat')
    async getChat(@Body() request) {
        const getMessages = await this.aiService.text(request);
        return getMessages;
    }
}
