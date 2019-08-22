import Controller from "../controller";
import UserModel from '../../Model/user.model';
import * as bcrypt from 'bcrypt';
import * as express from 'express'
import IUser from '../user/user.interface';
import HttpException from '../../exceptions/HttpException';
import UserWithThatEmailAlreadyExist from "../../exceptions/UserWithThatEmailAlreadyExist";

require('dotenv').config()

export default class AuthenticatedController extends Controller {

    private User = UserModel;

    constructor() {
        super();
        this.path = 'auth';
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}/signup`, this.register);
    }

    private register(request: express.Request, response: express.Response, next: express.NextFunction) {
        let user: IUser = request.body;
        let hashedPassword;
        this.User.findOne({ email: user.email }, (err, user) => {
            if(err) return next(new HttpException(500, err));
            if(user) return next (new UserWithThatEmailAlreadyExist(user.email));
            bcrypt.hash(user.password, process.env.SALT_ROUNDS, function(err, hash) {
                hashedPassword = hash; 
            });
            user = {
                ...user,
                password: hashedPassword
            };

            this.User.create(user);

            return response.send(user);

        });
    }
    
}