import {Request, Response, NextFunction, response} from 'express';
import HttpException from '../exceptions/HttpException';

export default function errorHandling(req: Request, res: Response, next: NextFunction): void {
    const status = res.statusCode;
    const message = res.statusMessage || 'Something went wrong';

    response.status(status).json({status, message});
}