import jwt from 'jsonwebtoken';
import TokenData from './TokenData.interface';

class JWT {
    private readonly secret: string = 'secretKeyForJSONWebToken';
    private readonly expiresIn: number = 360; // seconds

    public constructor () {}

    public generateToken(username: string): TokenData {
        const token = {
            username
        };

        const tokenData: TokenData = {
            expiresIn: this.expiresIn,
            token: jwt.sign(token, this.secret, { expiresIn: this.expiresIn }),
        }

        return tokenData;
    }

    public verifyToken(token: string): boolean {
        try {
            jwt.verify(token, this.secret);
            return true;
        } catch (error) {
            return false;
        }
    }

    public getPayload(token: string): string {
        const payload = jwt.decode(token, { complete: true });
        return (payload as any).payload.username;
    }
}

export default new JWT();