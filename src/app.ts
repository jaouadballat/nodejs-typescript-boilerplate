import * as express from 'express';
import * as bodyParser from 'body-parser';

class App  {
    
    public app: express.Application;
    public port: number;

    constructor(controllers, port) {
        this.app = express();
        this.port = port;

        this.initializeMiddelwares()
        this.initializeControllers(controllers)
    }

    private initializeMiddelwares() {
        this.app.use(bodyParser.json())
    }

    private initializeControllers(controllers) {
        controllers.forEach(controller => {
            this.app.use('/', controller.router)
        });
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`server running at port ${this.port}`)
        });
    }
}

export default App
