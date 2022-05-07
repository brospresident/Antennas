import express from 'express';
import IController from '../controller';
import adminModel from '../../models/administrator.model';
import bcrypt from 'bcrypt';
import JWT from '../../utils/JWT/JWT';
import IAuthenticator from './authenticator.interface';

class AuthenticatorController implements IController {
    public readonly router: express.Router;
    public readonly path: string = '/authenticator';

    public constructor() {
        this.router = express.Router();
        this.initRoutes();
    }

    private initRoutes(): void {
        this.router.post(`${this.path}/register`, this.registerAccount);
        this.router.post(`${this.path}/login`, this.loginAccount);
    }

    private async checkAccountExists(username: string): Promise<boolean> {
        const account = await adminModel.findOne({ username });
        if (!account) return false;
        return true;
    }

    private async registerAccount(req: express.Request, res: express.Response, next: express.NextFunction): Promise<express.Response<IAuthenticator>> {
        const { username, password, email } = req.body;
        if (!username || !password || !email) {
            return res.status(400).json({
                message: 'Missing required fields'
            });
        }

        const accountExists = await this.checkAccountExists(username);
        if (accountExists) {
            return res.status(400).json({
                message: 'Account already exists'
            });
        }

        const hash = await bcrypt.hash(password, 10);
        await adminModel.create({ username, password: hash, email });

        const token = JWT.generateToken(username);
        return res.status(201).json({
            message: 'Account created with success',
            token: token
        });
    }

    private async loginAccount(req: express.Request, res: express.Response, next: express.NextFunction): Promise<express.Response<IAuthenticator>> {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({
                message: 'Missing required fields'
            });
        }

        const account = await adminModel.findOne({ username });
        if (!account) {
            return res.status(400).json({
                message: 'Account does not exist'
            });
        }

        const isPasswordValid = await bcrypt.compare(password, account.password);
        if (!isPasswordValid) {
            return res.status(400).json({
                message: 'Invalid password'
            });
        }

        const token = JWT.generateToken(username);
        return res.status(200).json({
            message: `Welcome ${username}`,
            token: token
        });
    }
}

export default AuthenticatorController;