import * as express from 'express';
import * as mongoose from 'mongoose';

require('dotenv').config()

export default class Controller {

    protected path: string = '';
    protected router = express.Router() 

    constructor() {
        this.connectToDB()
    }

    private connectToDB(){
        mongoose.connect(process.env.MONGO_DB, { useNewUrlParser: true }, { useFindAndModify: false }, function(err) {
            if(err) return console.log('failed to connect to the DB');
            console.log(`-------------------Connected to DB-------------------------------`);
        });
        
    }
    
    public static handle() {
        return new this();
    } 
}