import {Controller, Post, Get, UseBefore, Req, Res} from 'routing-controllers';
import fileUploadMiddleware from "../middlewares/fileUploadMiddleware";
import { Request } from 'express';
import PageService from "../services/PageService";
import {promisify} from "util";

@Controller()
export class PageController {
    private pageService: PageService;
    constructor(){
        this.pageService = new PageService();
    }

    @Post('/generate')
    @UseBefore(fileUploadMiddleware('input', 1024 * 1024 * 4))
    async post(@Req() req: Request, @Res() res: any) {
        await this.pageService.generatePdfFromDiskXlsx();
        const file = `${process.cwd()}\\test2.pdf`;
        await promisify<string, void>(res.sendFile.bind(res))(file)
        return res;
    }

    @Get('/recipes')
    async recipes(@Res() res: any) {
        await this.pageService.getRecipesFromDB();
        const file = `${process.cwd()}\\test2.pdf`;
        await promisify<string, void>(res.sendFile.bind(res))(file)
        return res;
    }
}
