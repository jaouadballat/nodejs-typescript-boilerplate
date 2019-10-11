import Controller from "../controller";
import UserModel from '../../Model/user.model';
import * as bcrypt from 'bcrypt';
import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import IUser from '../user/user.interface';
import HttpException from '../../exceptions/HttpException';
import UserWithThatEmailAlreadyExist from "../../exceptions/UserWithThatEmailAlreadyExist";
import WrongCredentialException from "../../exceptions/WrongCredentialException";
import TokenInterface from "../../interfaces/TokenInterface";
import DataStoredInTokenInterface from "../../interfaces/DataStoredInTokenInterface";

require('dotenv').config()

export default class AuthenticatedController extends Controller {
    private readonly PATH = '/auth';

    constructor() {
        super();
        this.setPath(this.PATH)
        this.initializeRoutes();
        this.path = this.PATH;
        this.model = UserModel;

    }

    private initializeRoutes = () => {
        this.router.post(`${this.path}/signup`, this.register);
        this.router.post(`${this.path}/signin`, this.login);
    }

    private register = async (request: express.Request, response: express.Response, next: express.NextFunction) => {

        let userBody: IUser = request.body;
        let hashedPassword;
        let user = null;
        try {
            user =  await this.findOne({email: userBody.email});
            if(user) return next(new UserWithThatEmailAlreadyExist(userBody.email));
            const salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS));
            const hash = await bcrypt.hash(userBody.password, salt);
            hashedPassword = hash;
            user = {
                ...userBody,
                password: hashedPassword
            };
            const createdUser = await this.model.create(user);
            let tokenData = this.createToken(createdUser);
            return response.send(tokenData);

        } catch(error) {
            next(new HttpException(500, error.message));
        }
    }

    private login = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        const userRequest: IUser = request.body;
        let user = null;
        try {
            user =  await this.findOne({email: userRequest.email});
            if(!user) return next(new WrongCredentialException());
            const isEqual = await bcrypt.compare(userRequest.password, user.password)
            if(!isEqual) return next(new WrongCredentialException());
            let tokenData = this.createToken(user);
            const result = {
                token: tokenData,
                id: user._id,
                email: user.email,
                name: user.name
            }
            return response.send(result);

        } catch(error) {
            next(new HttpException(500, error.message));
        }
    }

    private setPath(path: string): void {
        this.path = path;
    }

    private createToken(user): TokenInterface {
        const dataStoredInToken: DataStoredInTokenInterface = {
            _id: user._id
        }

        const expireIn: number = 60 * 60; // 1Hour

        const token = jwt.sign(dataStoredInToken, process.env.PRIVATE_TOKEN_KEY);

        return {
            expireIn,
            token
        };
    }
}