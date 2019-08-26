import * as express from 'express';

require('dotenv').config()

export default class Controller {

    protected path: string = '';
    protected router = express.Router();
    protected model;
    protected response: {
        error: '',
        data: ''
    }; 

 
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

    private setError(err) {
        this.response = {
            error: err,
            ...this.response
        }
    }

    private setData(data) {
        this.response = {
            ...this.response,
            data
        }
    }

    private getResponse() {
        return this.response;
    }
}