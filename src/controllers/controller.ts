import * as express from 'express';
import * as mongoose from 'mongoose';
import ResponseInterface from '../interfaces/ResponseInterface';
import HttpException from '../exceptions/HttpException';

require('dotenv').config()

export default class Controller {

    protected path: string = '';
    protected router = express.Router() 
    protected model;



    protected router = express.Router();
    protected model;
    protected response: ResponseInterface;


    public static handle() {
        return new this();
    }

    protected findAll() {
        return this.model.find({})
            .then(data => data)
            .catch(error => error);

    }

    protected findOneById(id) {
        return this.model.findById(id)
            .then(data => data)
            .catch(error => error);
    }

    protected findByIdAndUpdate(id, data) {
        return this.model.findByIdAndUpdate(id, data, { new: true })
            .then(data => data)
            .catch(error => error);
    }

    protected findByIdAndRemove(id: string) {
        return this.model.findByIdAndRemove(id)
            .then(data => data)
            .catch(error => error);
    }

    protected findOne(params: mongoose.Document) {
        return this.model.findById(params)
            .then(data => data)
            .catch(error => error);
    }

    protected createOne(params: mongoose.Document) {
        const request = new this.model(params);

        return request.save()
            .then(data => data)
            .catch(error => error);
    }
}