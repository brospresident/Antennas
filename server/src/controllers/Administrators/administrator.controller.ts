import express from 'express';
import IController from '../controller';
import adminModel from '../../models/administrator.model';
import JWT from '../../utils/JWT/JWT';

export default class AdministratorController implements IController {
    public readonly router: express.Router;
    public readonly path: string = '/administrators';

    public constructor() {
        this.router = express.Router();
        this.initRoutes();
    }

    private initRoutes(): void {
        this.router.get(`${this.path}/`, this.checkLogin);
    }

    private async checkLogin(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
        const token = req.headers.authorization;
        if (!token) {
            res.status(401).json({
                message: 'No token provided'
            });
            return;
        }

        const decoded = JWT.verifyToken(token);
        if (!decoded) {
            res.status(401).json({
                message: 'Invalid token'
            });
            return;
        }

        const admin = await adminModel.findOne({ username: decoded });
        if (!admin) {
            res.status(401).send({
                message: 'Invalid token'
            });
            return;
        }
        
        res.status(200).json({
            message: 'Token is valid'
        });
    }
}