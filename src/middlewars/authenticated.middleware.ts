import * as express from 'express';


function authenticatedMiddleware(request: express.Request, response: express.Response, next: express.NextFunction) {
    const cookie = request.cookies;
    if(cookie && cookie.token) {

    } else {
        return next(new MissingTokenException())
    }
}