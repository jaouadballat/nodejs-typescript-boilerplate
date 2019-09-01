import HttpException from "../exceptions/HttpException";
import { Document } from 'mongoose';

export default interface ResponseInterface {
    error: HttpException,
    data: Document
}