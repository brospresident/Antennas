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
        console.log("AuthenticatorController loaded");
    }

    private initRoutes(): void {
        this.router.post(`${this.path}/register`, this.registerAccount);
        this.router.post(`${this.path}/login`, this.loginAccount);
    }

    private async registerAccount(req: express.Request, res: express.Response, next: express.NextFunction): Promise<express.Response<IAuthenticator>> {
        const { username, password, email, code } = req.body.data;
        if (!username || !password || !email || !code) {
            return res.status(400).json({
                message: 'Missing required fields'
            });
        }

        let validCode: boolean = false;
        for (const c of invitationCodes) {
            if (c === code) {
                invitationCodes.splice(invitationCodes.indexOf(code), 1);
                validCode = true;
                break;
            }
        }

        if (!validCode) {
            return res.status(400).json({
                message: 'Invalid activation code'
            });
        }

        const accountExists = await adminModel.findOne({ username });
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
        const { username, password } = req.body.data;
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
import { invitationCodes } from '../Administrators/administrator.controller';

export default AuthenticatorController;