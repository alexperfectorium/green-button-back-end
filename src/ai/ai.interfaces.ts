import OpenAI from 'openai';

export interface IChatRequest {
    messages: OpenAI.Chat.ChatCompletionMessage[],
    // functions?: OpenAI.ChatCompletionFunctionCallOption[]
}

export interface IChatResponse {
    success: boolean;
    result: OpenAI.ChatCompletion.Choice;
}