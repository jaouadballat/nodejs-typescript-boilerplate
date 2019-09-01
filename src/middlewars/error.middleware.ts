import { NextFunction, Request, Response } from 'express';
import HttpException from '../exceptions/HttpException';

function errorMiddleware(error: HttpException, request: Request, response: Response, next: NextFunction ) {

    const status: number = error.status || 500;
    const message: string = error.message || 'Something went wrong';

    return response
        .status(status)
        .send({
            status,
            message,
        })
}

export default errorMiddleware;

