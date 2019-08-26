import * as express from 'express';
import * as mongoose from 'mongoose';

require('dotenv').config()

export default class Controller {

    protected path: string = '';
    protected router = express.Router() 

 
    public static handle() {
        return new this();
    } 
}