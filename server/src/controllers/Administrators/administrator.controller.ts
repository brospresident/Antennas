import express from 'express';
import IController from '../controller';
import adminModel from '../../models/administrator.model';
import JWT from '../../utils/JWT/JWT';
import Mailer from '../../services/mailService';
const mailInstance = Mailer.getInstance();

const invitationCodes: string[] = ['1234'];
export { invitationCodes };

export default class AdministratorController implements IController {
    public readonly router: express.Router;
    public readonly path: string = '/administrators';

    public constructor() {
        this.router = express.Router();
        this.initRoutes();
    }

    private initRoutes(): void {
        this.router.get(`${this.path}/`, this.checkLogin);
        this.router.post(`${this.path}/generate`, this.generateInvitation);
    }

    private async checkLogin(req: express.Request, res: express.Response, next: express.NextFunction): Promise<boolean> {
        const token = req.headers.authorization;
        if (!token) {
            res.status(401).json({
                message: 'No token provided'
            });
            return false;
        }

        const decoded = JWT.verifyToken(token);
        if (!decoded) {
            res.status(401).json({
                message: 'Invalid token'
            });
            return false;
        }

        const admin = await adminModel.findOne({ username: decoded });
        if (!admin) {
            res.status(401).send({
                message: 'Invalid token'
            });
            return false;
        }
        
        res.status(200).json({
            message: 'Token is valid'
        });
        return true;
    }

    private async generateInvitation(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
        const { email } = req.body.data;
        const code = Math.floor(Math.random() * 1000000);
        invitationCodes.push(code.toString());

        await mailInstance.sendMail(code, email);

        res.status(200).json({
            code
        });
    }
}