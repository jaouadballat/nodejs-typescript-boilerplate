import * as express  from 'express'
import HttpException from '../exceptions/HttpException';

function errorMiddleware(error: HttpException, request: express.Request, response: express.Response) {
    
    const message: string = error.message || 'Somthing went wrong';
    const status: number = error.status || 500;

    response
        .status(status)
        .send({
            status: status,
            message: message
        });
}

export default errorMiddleware;