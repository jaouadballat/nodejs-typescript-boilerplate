import * as express from 'express';
import * as mongoose from 'mongoose';
import * as bodyParser from 'body-parser';
import errorMiddleware from './middlewars/error.middleware'

class App  {
    
    public app: express.Application;
    public port: number;

    constructor(controllers, port) {
        this.app = express();
        this.port = port;

        this.initializeMiddelwares();
        this.initializeControllers(controllers);
        this.inizializeErrorHandler();
        this.connectToDB();
    }

    private initializeMiddelwares() {
        this.app.use(bodyParser.json())
    }

    private initializeControllers(controllers) {
        controllers.forEach(controller => {
            this.app.use('/', controller.router)
        });
    }

    private inizializeErrorHandler() {
        return this.app.use(errorMiddleware)
    }

    private connectToDB() {
        mongoose.connect(process.env.MONGO_DB, { useNewUrlParser: true }, function (err) {
            if (err) return console.log('failed to connect to the DB');
            console.log(`-------------------Connected to DB-------------------------------`);
        })

    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`server running at port ${this.port}`)
        });
    }
}

export default App
