import * as express from 'express';
import ResponseInterface from '../interfaces/ResponseInterface';

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
            if(err) this.setError(err);
            else this.setData(data);

            return this.getResponse();
        });

    }

    protected findOneById(id) {
        return this.model.findById(id, (err, data) => {
            if (err) this.setError(err);
            else this.setData(data);

            return this.getResponse();
        });
    }

    protected findByIdAndUpdate(id, data) {
        return this.model.findByIdAndUpdate(id, data, {new: true}, (err, data) => {
            if (err) this.setError(err);
            else this.setData(data);

            return this.getResponse();
        });
    }

    protected findByIdAndRemove(id: string) {
        return this.model.findByIdAndRemove(id, (err, data) => {
            if (err) this.setError(err);
            else this.setData({ status: 'OK' });

            return this.getResponse();
        });
    }

    protected findOne(params) {
        return this.model.findOne(params, (err, data) => {
            if (err) this.setError(err);
            else this.setData(data);

            return this.getResponse(); 
        });
    }

    private setError(err) {
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

    private getResponse() {
        return this.response;
    }
}