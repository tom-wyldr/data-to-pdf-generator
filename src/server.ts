import app from './api/app';
import * as http from 'http';

class HttpServer {
	public readonly server: http.Server;

	constructor() {
		this.server = http.createServer(app);
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
