import app from './api/app';
import * as http from 'http';
/*const { Client } = require('pg');
const dotenv = require('dotenv');*/

class HttpServer {
	public readonly server: http.Server;
	// private client;

	constructor() {
		this.server = http.createServer(app);
		// dotenv.config();
	}

	async runServer(port: number | string) {
		console.info('Starting application...');
		await this.listenAsync(port);
		/*this.client = new Client({
			user: process.env.USER,
			host: process.env.HOST,
			database: process.env.DB,
			password: process.env.PASSWORD,
			port: process.env.PORT,
			ssl: true
		});
		console.info('Connecting to database...');
		await this.client.connect();
		console.info('Connected to the database');*/
	}

	listenAsync(port: number | string) {
		return new Promise((resolve, reject) => {
			this.server.listen(port, () => {
				resolve(true);
			});
		});
	}

	async stopApp(callback: (err: Error) => void) {
		// await this.client.end();
		this.server.close(callback);
	}
}

export { HttpServer };
