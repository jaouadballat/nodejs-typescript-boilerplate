import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import MissingTokenException from '../exceptions/MissingTokenException';
import userModel from '../Model/user.model';
import HttpException from '../exceptions/HttpException';
import WrongAuthenticationTokenException from '../exceptions/WrongAuthenticationTokenException';

require('dotenv').config()


function authenticatedMiddleware(request: express.Request, response: express.Response, next: express.NextFunction) {
    const cookie = request.cookies;
    if(cookie && cookie.token) {
        try {
            let userId = jwt.verify(cookie.token, process.env.PRIVATE_TOKEN_KEY);
            userModel.findById(userId._id, (err, user) => {
                if(err) return next(new HttpException(500, err));
                if(user) {
                    //request.user = user; 
                } else {
                    return next(new WrongAuthenticationTokenException())
                }
            })
        } catch (error) {
            next(new MissingTokenException())
        }
    } else {
        return next(new MissingTokenException())
    }
}

export default authenticatedMiddleware;