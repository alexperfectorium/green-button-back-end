import { Controller, Post, Body } from '@nestjs/common';
import { IChatRequest, IChatResponse } from './ai.interfaces';
import { AiService } from './ai.service';
import OpenAI from 'openai';

@Controller('/api/ai')
export class AiController {
    constructor(private aiService: AiService) {}

    @Post('/chat')
    async getChat(@Body() request: IChatRequest): Promise<IChatResponse> {
        const getMessages = (await this.aiService.getMessagesData(request)) as OpenAI.ChatCompletion;
        return this.aiService.getChatResponse(getMessages);
    }
}
