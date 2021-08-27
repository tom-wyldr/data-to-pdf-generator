import app from './api/app';
import * as http from 'http';
const { Pool } = require('pg');
const dotenv = require('dotenv');

class HttpServer {
	public readonly server: http.Server;
	public static pool;

	constructor() {
		this.server = http.createServer(app);
		dotenv.config();
		HttpServer.pool = new Pool({
			user: process.env.USER,
			host: process.env.HOST,
			database: process.env.DB,
			password: process.env.PASSWORD,
			port: process.env.PORT,
			ssl: true
		});
	}

	async runServer(port: number | string) {
		console.info('Starting application...');
		await this.listenAsync(port);
	}

	listenAsync(port: number | string) {
		return new Promise((resolve, reject) => {
			this.server.listen(port, () => {
				resolve(true);
			});
		});
	}

	async stopApp(callback: (err: Error) => void) {
		this.server.close(callback);
	}
}

export { HttpServer };
