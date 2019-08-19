import * as express from 'express';

export default class Controller {

    protected path: string = '';
    protected router = express.Router() 

    constructor() {

    }
    
    public static handle() {
        return new this();
    } 
}