import express from 'express';
import IController from '../controller';
import adminModel from '../../models/administrator.model';

export default class AdministratorController implements IController {
    public readonly router: express.Router;
    public readonly path: string = '/administrators';

    public constructor() {
        this.router = express.Router();
        this.initRoutes();
    }

    private initRoutes(): void {

    }

    private async checkAccountExists(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
        
    }
}