import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import MissingTokenException from '../exceptions/MissingTokenException';
import User from '../Model/user.model';
import HttpException from '../exceptions/HttpException';
import WrongAuthenticationTokenException from '../exceptions/WrongAuthenticationTokenException';
import RequestWithUser from '../interfaces/RequestWithUser';

require('dotenv').config()


function authenticatedMiddleware(request: RequestWithUser, response: express.Response, next: express.NextFunction) {
    const header = request.headers['authorization'];
    if(header) {
        try {
            const token = header.split(' ')[1];
            const result  = jwt.verify(token, process.env.PRIVATE_TOKEN_KEY) as any;
            User.findById(result._id, (err, user) => {
                if(err) return next(new HttpException(500, err));
                if(user) {
                    request.user = user;
                    next();
                } else {
                    return next(new WrongAuthenticationTokenException())
                }
            })
        } catch (error) {
            next(new WrongAuthenticationTokenException())
        }
    } else {
        return next(new MissingTokenException())
    }
}

export default authenticatedMiddleware;