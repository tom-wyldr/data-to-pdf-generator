import app from './api/app';
import * as http from 'http';
const { Client } = require('pg');
const dotenv = require('dotenv');
const fs = require('fs');

var sql = fs.readFileSync('D:\\IdeaProjects\\data-to-pdf-generator\\queries\\paos_query.sql').toString();

class HttpServer {
	public readonly server: http.Server;
	public client;

	constructor() {
		this.server = http.createServer(app);
		dotenv.config();
	}

	async runServer(port: number | string) {
		console.info('Starting application...');
		await this.listenAsync(port);
		this.client = new Client({
			user: process.env.USER,
			host: process.env.HOST,
			database: process.env.DB,
			password: process.env.PASSWORD,
			port: process.env.PORT,
			ssl: true
		});
		console.info('Connecting to database...');
		await this.client.connect();
		const res = await this.client.query('SELECT $1::text as message', ['Hello world!']);
		console.log(res.rows[0].message);
	}

	listenAsync(port: number | string) {
		return new Promise((resolve, reject) => {
			this.server.listen(port, () => {
				resolve(true);
			});
		});
	}

	async stopApp(callback: (err: Error) => void) {
		await this.client.end();
		this.server.close(callback);
	}
}

export { HttpServer };
