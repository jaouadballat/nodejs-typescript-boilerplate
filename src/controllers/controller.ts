import * as express from 'express';
import * as mongoose from 'mongoose';
import ResponseInterface from '../interfaces/ResponseInterface';
import HttpException from '../exceptions/HttpException';

require('dotenv').config()

export default class Controller {

    protected path: string = '';
    protected router = express.Router();
    protected model;
    protected response: ResponseInterface; 

 
    public static handle() {
        return new this();
    } 

    protected findAll() {
        return this.model.find({}, (err, data) => {
            return this.getResult(err, data);
        });
    }

    protected findOneById(id) {
        return this.model.findById(id, (err, data) => {
            return this.getResult(err, data);
        });
    }

    protected findByIdAndUpdate(id, data) {
        return this.model.findByIdAndUpdate(id, data, {new: true}, (err, data) => {
            return this.getResult(err, data);
        });
    }

    protected findByIdAndRemove(id: string) {
        return this.model.findByIdAndRemove(id, (err, data) => {
            return this.getResult(err, { status: 'OK'});
        });
    }

    protected findOne(params: mongoose.Document) {
        return this.model.findOne(params, (err, data) => {
            return this.getResult(err, data);
        });
    }

    protected createOne(params: mongoose.Document) {
        const request = new this.model(params);
        return request.save((err, data) => {
            return this.getResult(err, data);
        });
    }

    private setError(err: HttpException) {
        this.response = {
            error: err,
            data: null
        }
    }

    private setData(data) {
        this.response = {
            error: null,
            data
        }
    }

    private getResponse(): ResponseInterface {
        return this.response;
    }

    private getResult(err, data): ResponseInterface {
        if (err) this.setError(err);
        else this.setData(data);

        return this.getResponse();
    }
}