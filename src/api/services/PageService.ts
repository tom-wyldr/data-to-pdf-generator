import {Service} from "typedi";
const excelToJson = require('convert-excel-to-json');
const child_process = require('child_process');

@Service()
export default class PageService {
    //public static data: any;

    async generatePdfFromXlsx(buffer: Buffer) {
        const spreadsheet = excelToJson({
            source: buffer,
            sheets: ['figma_recipes']
        });
        const recipesList = spreadsheet.figma_recipes.filter(it => it.S !== '/hide').slice(1);
        //PageService.data = recipesList;
        await child_process.execSync('next build && next export && node src/convert.tsx');
    }
}
