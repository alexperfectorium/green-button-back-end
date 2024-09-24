import OpenAI from 'openai';

export interface IChatResponse {
    success: boolean;
    result: OpenAI.ChatCompletion.Choice;
}