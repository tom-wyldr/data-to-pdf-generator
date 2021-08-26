import {Controller, Body, Post, Get, UploadedFile, BadRequestError, UseBefore, Req, Res} from 'routing-controllers';
import fileUploadMiddleware from "../middlewares/fileUploadMiddleware";
import { Request } from 'express';
import PageService from "../services/PageService";
import {promisify} from "util";
import os from "os";

//todo: move into special place
const allowedFileTypes = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];

@Controller()
export class PageController {
    private pageService: PageService;
    constructor(){
        this.pageService = new PageService();
    }

    @Post('/generate')
    @UseBefore(fileUploadMiddleware('input', allowedFileTypes, 1024 * 1024 * 4))
    async post(@Req() req: Request, @Res() res: any) {
        // fs.readFileAsync(file.path) in case of saving to disk
        // await this.pageService.generatePdfFromXlsx(req.file.buffer);
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
