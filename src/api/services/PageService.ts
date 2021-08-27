import {Service} from "typedi";
import {HttpServer} from "../../server";
import os from "os";
const child_process = require('child_process');
const fs = require('fs');
const path = require('path');
const get_recipes = fs.readFileSync(path.join(__dirname, '../../../queries/ready_recipes.sql'));

@Service()
export default class PageService {

    async generatePdfFromDiskXlsx() {
        await child_process.execSync('next build && next export && node src/convert.tsx');
    }

    async getRecipesFromDB() {
        const client = await HttpServer.pool.connect();
        let { rows } = await client.query(get_recipes.toString());
        rows = await rows.filter(it => it.show !== '/hide');
        rows = JSON.stringify(rows, null, 4);
        await fs.writeFile(os.tmpdir()+'/DB.json', rows, (err) => {
            if (err) {
                throw err;
            }
            console.log("JSON data is saved.");
            client.release();
            child_process.execSync('next build && next export && node src/convert.tsx');
        });
    }
}
