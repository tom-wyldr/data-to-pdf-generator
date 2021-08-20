import { HttpServer } from './server';

(async () => {
    const httpServer = new HttpServer();
    await httpServer.runServer(5000);
    console.log(`App is running at localhost:5000`);
    const closeHandler = (signal: string, exitCode?: number) => {
        return async () => {
            console.info(`SIGNAL: ${signal}`);
            console.info('Shutting down application...');
            await httpServer.stopApp(err => {
                if (err) {
                    console.error(err);
                    process.exit(1);
                }
            });
            process.exit(exitCode || 0);
        };
    };
    process.on('SIGTERM', closeHandler('SIGTERM'));
    process.on('SIGINT', closeHandler('SIGINT'));
})();
