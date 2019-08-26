import HttpException from "./HttpException";
import { Document } from 'mongoose';

export default interface ResponseInterface {
        error: HttpException,
        data: Document
}