import * as express from 'express';
import Post from './post.interface'
import Controller from '../controller';
import PostModel from '../../Model/Post.model'

class PostController extends  Controller {

    private readonly PATH: string = '/posts';
    private post;

    constructor() {
        super()
        this.setPath(this.PATH);
        this.initialzeRoutes();
        this.model = PostModel;
    }

    private setPath = (path): void => {
        this.path = path
    }
    
    private initialzeRoutes = () => {
        this.router.get(this.path, this.getAll);
        this.router.post(this.path, this.create);
        this.router.get(`${this.path}/:id`, this.getById);
        this.router.put(`${this.path}/:id`, this.update);
        this.router.delete(`${this.path}/:id`, this.remove);
    }

}

export default PostController;