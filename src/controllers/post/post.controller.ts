import * as express from 'express';
import Post from './post.interface'
import Controller from '../controller';
import PostModel from '../../Model/Post.model'
import HttpException from '../../exceptions/HttpException';
import PostNotFoundException from '../../exceptions/PostNotFoundException';

class PostController extends  Controller{

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
        this.router.get(this.path, this.getAllPosts);
        this.router.post(this.path, this.createPost);
        this.router.get(`${this.path}/:id`, this.getPostById);
        this.router.put(`${this.path}/:id`, this.updatePost);
        this.router.delete(`${this.path}/:id`, this.removePost);
    }

    private getAllPosts = (request: express.Request, response: express.Response, next: express.NextFunction) => {
        let { error, data } = this.findAll();
        if(error) return next(new HttpException(500, error));
        return response.send(data)
    }

     private createPost = (request: express.Request, response: express.Response, next: express.NextFunction) => {
        const newPost = new this.model(request.body);
        return newPost.save((err, post) => {
            if(err) return next(new HttpException(500, err));
            return response.send(post)

        })
    }

    private getPostById = (request: express.Request, response: express.Response, next: express.NextFunction) => {
        const postId: string = request.params.id;
        let { error, data } = this.findOneById(postId);
        if (error) return next(new HttpException(500, error));
        if (!data) return next(new PostNotFoundException(404, 'Post not found.'));
        return response.send(data);
    }

    private updatePost = (request: express.Request, response: express.Response, next: express.NextFunction) => {
        const updatedPost: Post = request.body;
        const postId = request.params.id
        let { error, data } = this.findByIdAndUpdate(postId, updatedPost);
        if (error) return next(new HttpException(500, error));
        if (!data) return next(new PostNotFoundException(404, 'Post not found.'));
        return response.send(data);
    }

    private removePost = (request: express.Request, response: express.Response, next: express.NextFunction) => {
        const postId = request.params.id
        this.model.findByIdAndRemove(postId, (err, post) => {
            if (err) return next(new HttpException(500, err));
            return response.json({ status: 'OK' });
        });
    }
}

export default PostController;