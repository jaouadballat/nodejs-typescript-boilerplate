import * as express from 'express';
import HttpException from '../exceptions/HttpException';
import NotFoundException from '../exceptions/NotFoundException';


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

    protected getById = (request: express.Request, response: express.Response, next: express.NextFunction) => {
        const id: string = request.params.id;
        this.model.findOneById(id, (err, data) => {
            if(err) return next(new HttpException(500, err));
            else if(!data) return next(new NotFoundException())
            return response.send(data)
        })
    }

    protected create = (request: express.Request, response: express.Response, next: express.NextFunction) => {
        const model = new this.model(request.body);
        return model.save((err, data) => {
            if(err) return next(new HttpException(500, err));
            return response.send(data)

        })
    }

    protected update = (request: express.Request, response: express.Response, next: express.NextFunction) => {
        const updatedModel = request.body;
        const id = request.params.id;
        this.model.findByIdAndUpdate(id, updatedModel, {new: true}, (err, data) => {
            if(err) return next(new HttpException(500, err));
            else if(!data) return next(new NotFoundException());
                return response.send(data);
        });
    }

    protected remove = (request: express.Request, response: express.Response, next: express.NextFunction) => {
        const id = request.params.id
        this.model.findByIdAndRemove(id, (err, data) => {
            if (err) return next(new HttpException(500, err));
            else if(!data) return next(new NotFoundException());
            return response.json({ status: 'OK' });
        });
    }

}