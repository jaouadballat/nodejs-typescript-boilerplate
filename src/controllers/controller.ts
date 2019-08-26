import * as express from 'express';
import HttpException from '../exceptions/HttpException';


require('dotenv').config()

export default class Controller {

    protected path: string = '';
    protected router = express.Router();
    protected model; 

 
    public static handle() {
        return new this();
    } 

    protected getAll = (request: express.Request, response: express.Response, next: express.NextFunction) => {
        this.model.find({}, (err, data) => {
            if(err) return next(new HttpException(500, err));
            return response.send(data)
        });
    }

    protected findById = (request: express.Request, response: express.Response, next: express.NextFunction) => {
        this.model.findOneById(request.params.id, (err, data) => {
            if(err) return next(new HttpException(500, err));
            return response.send(data)
        })
    }
}