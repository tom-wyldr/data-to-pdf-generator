import { createExpressServer } from 'routing-controllers';
import { PageController } from './PageController';
import "reflect-metadata"

const app = createExpressServer({
    controllers: [PageController],
});

// app.listen(5000);

export default app;
