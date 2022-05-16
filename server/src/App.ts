import express from 'express';
import IController from './controllers/controller';
import mongo from './services/mongo';

export default class App {
    private static instance: App | null = null;
    private readonly PORT: number = 3001;
    private app: express.Application;

    private constructor(controllers: IController[] = []) {
        this.app = express();
        this.initApp();
        this.initMiddleware();
        this.initControllers(controllers);
        mongo.checkConnection();
    }

    private initControllers(controllers: IController[] = []): void { 
        for (const controller of controllers) {
            this.app.use('/api', controller.router);
        }
    }

    private initMiddleware(): void {
        this.app.use(express.json());
    }

    private initApp(): void {
        this.app.listen(this.PORT, () => {
            console.log('Server is running on port 3000');
        })
    }

    public static getInstance(controllers: IController[] = []): App {
        if (!App.instance) {
            App.instance = new App(controllers);
        }
        return App.instance;
    }
}