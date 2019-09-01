import * as express from 'express';
import Post from './post.interface'
import Controller from '../controller';
import PostModel from '../../Model/Post.model'
import HttpException from '../../exceptions/HttpException';
import PostNotFoundException from '../../exceptions/PostNotFoundException';

class PostController extends  Controller {

    private readonly PATH: string = '/posts';
    private post;

    constructor() {
        super()
        this.setPath(this.PATH);
        this.initialzeRoutes();
        this.model = PostModel;
        
    }

    private setPath = (path): void =>{
        this.path = path
    }
    
    private initialzeRoutes = () => {
        this.router.get(this.path, this.getAllPosts);
        this.router.post(this.path, this.createPost);
        this.router.get(`${this.path}/:id`, this.getPostById);
        this.router.put(`${this.path}/:id`, this.updatePost);
        this.router.delete(`${this.path}/:id`, this.removePost);
    }

    private getAllPosts =  (request: express.Request, response: express.Response, next: express.NextFunction) => {
        this.findAll()
            .then(posts => response.send(posts))
            .catch(error => next(new HttpException(500, error)));
            
    }

    private createPost = (request: express.Request, response: express.Response, next: express.NextFunction) => {
         this.createOne(request.body)
            .then(post => response.send(post))
            .catch(error => next(new HttpException(500, error)));
    }

    private getPostById = (request: express.Request, response: express.Response, next: express.NextFunction) => {
        const postId: express.Request = request.params.id;
        this.findOneById(postId)
            .then(post => {
                if (!post) return next(new PostNotFoundException(404, 'Post not found.'));
                return response.send(post)
            })
            .catch(error => next(new HttpException(500, error)));
    }

    private updatePost = (request: express.Request, response: express.Response, next: express.NextFunction) => {
        const updatedPost: Post = request.body;
        const postId = request.params.id

        this.findByIdAndUpdate(postId, updatedPost)
            .then(post => {
                if (!post) return next(new PostNotFoundException(404, 'Post not found.'));
                return response.send(post);
            })
            .catch(error => next(new HttpException(500, error)));
    }

    private removePost = (request: express.Request, response: express.Response, next: express.NextFunction) => {
        const postId: string = request.params.id;

        this.findByIdAndRemove(postId)
            .then(data => {
                if (!data) return next(new PostNotFoundException(404, 'Post not found.'));
                return response.send({ status: 'OK' });
            })
            .catch(error => next(new HttpException(500, error)));
    }
}

export default PostController;