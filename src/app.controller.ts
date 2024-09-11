import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
    constructor () {}

    @Get()
    getHello() {
        return `Hello World. All routes available via '/api' path.`;
    }
}
