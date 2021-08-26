import {Service} from "typedi";
const excelToJson = require('convert-excel-to-json');
const child_process = require('child_process');
const fs = require('fs');
const path = require('path');
const { Client } = require('pg');
const dotenv = require('dotenv');
const get_recipes = fs.readFileSync(path.join(__dirname, '../../../queries/ready_recipes.sql'));

@Service()
export default class PageService {
    //public static data: any;
    private client;
    constructor() {
        dotenv.config();
        this.client = new Client({
            user: process.env.USER,
            host: process.env.HOST,
            database: process.env.DB,
            password: process.env.PASSWORD,
            port: process.env.PORT,
            ssl: true
        });
    }

    async generatePdfFromXlsx(buffer: Buffer) {
        await child_process.execSync('next build && next export && node src/convert.tsx');
    }

    async generatePdfFromDiskXlsx() {
        await child_process.execSync('next build && next export && node src/convert.tsx');
    }

    async getRecipesFromDB() {
        await this.client.connect();
        let { rows } = await this.client.query(get_recipes.toString());
        rows = rows.filter(it => it.show !== '/hide');
        rows = JSON.stringify(rows, null, 4);
        await fs.writeFile('DB.json', rows, (err) => {
            if (err) {
                throw err;
            }
            console.log("JSON data is saved.");
        });
        await this.client.end();
        await child_process.execSync('next build && next export && node src/convert.tsx');
    }
}
