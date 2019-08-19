import * as express from 'express';
import * as mongoose from 'mongoose'

export default class Controller {

    protected path: string = '';
    protected router = express.Router() 

    constructor() {
        this.connectToDB()
    }

    private connectToDB(){
        mongoose.connect('mongodb://localhost:27017/typscipt', { useNewUrlParser: true }, function(err) {
            if(err) return console.log('failed to connect to the DB');
            console.log(`-------------------Connected to DB-------------------------------`);
        });
        
    }
    
    public static handle() {
        return new this();
    } 
}