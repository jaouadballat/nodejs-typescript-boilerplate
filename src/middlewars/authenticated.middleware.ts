import * as express from 'express';
import MissingTokenException from '../exceptions/MissingTokenException';


function authenticatedMiddleware(request: express.Request, response: express.Response, next: express.NextFunction) {
    const cookie = request.cookies;
    if(cookie && cookie.token) {

    } else {
        return next(new MissingTokenException())
    }
}

export default authenticatedMiddleware;