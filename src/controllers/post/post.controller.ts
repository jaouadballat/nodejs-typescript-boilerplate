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
        this.post = PostModel;
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

    private getAllPosts = (request: express.Request, response: express.Response) => {
        this.post.find({}, (err, posts) => {
            if(err) return console.log(err)
                return response.send(posts)
        });
            
    }

     private createPost = (request: express.Request, response: express.Response) => {
        const newPost = new this.post(request.body);
        return newPost.save((err, post) => {
            if(err) return console.log(err)
            return response.send(post)

        })
    }

    private getPostById = (request: express.Request, response: express.Response, next: express.NextFunction) => {
        const postId: express.Request = request.params.id;
        this.post.findById(postId, (err, post) => {
            if (err) return next(new HttpException(500, err))
            if (!post) return next(new PostNotFoundException(404, 'Post not found.'));
                return response.send(post)
        });
    }

    private updatePost = (request: express.Request, response: express.Response) => {
        const updatedPost: Post = request.body;
        const postId = request.params.id
        this.post.findByIdAndUpdate(postId, updatedPost, {new: true}, (err, post) => {
            if(err) return console.log(err);
                return response.send(post);
        });
    }

    private removePost = (request: express.Request, response: express.Response) => {
        const postId = request.params.id
        this.post.findByIdAndRemove(postId, (err, post) => {
            if (err) return console.log(err);
            return response.json({status: 'OK'});
        });
    }
}

export default PostController;