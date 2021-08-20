import {Controller, Body, Post, Get} from 'routing-controllers';

@Controller()
export class PageController {
    @Post('/generate')
    post(@Body() inputFile: any) {
        return 'Saving user...';
    }

    @Get('/test')
    testReq() {
        return 'it\'s working';
    }
}
