import Controller from "../controller";
import UserModel from '../../Model/user.model';
import * as bcrypt from 'bcrypt';
import * as express from 'express'
import IUser from '../user/user.interface';
import HttpException from '../../exceptions/HttpException';
import UserWithThatEmailAlreadyExist from "../../exceptions/UserWithThatEmailAlreadyExist";
import WrongCredentialException from "../../exceptions/WrongCredentialException";

require('dotenv').config()

export default class AuthenticatedController extends Controller {
    

    private User;

    constructor() {
        super();
        this.path = 'auth';
        this.User = UserModel;
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(`${this.path}/signup`, this.register);
        this.router.post(`${this.path}/signin`, this.login);
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

    private login(request: express.Request, response: express.Response, next: express.NextFunction) {
        let user: IUser = request.body;
        this.User.findOne({ email: user.email }, (err, userLogedIn) => {
            if(err) return next(new HttpException(500, err));
            if(!user) return next(new WrongCredentialException());
            bcrypt.compare(user.password, userLogedIn.password, (err, res) => {
                if(!res) return next(new WrongCredentialException())
                return response.send({
                    ...userLogedIn,
                    password: ""
                });
            });

        })
    }

}