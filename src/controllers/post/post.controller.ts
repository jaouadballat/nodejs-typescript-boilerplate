import * as express from 'express';
import Post from './post.interface'
import Controller from '../controller';
import PostModel from '../../Model/Post.model'

class PostController extends  Controller{

    private readonly PATH: string = '/posts';

    constructor() {
        super()
        this.setPath(this.PATH);
        this.initialzeRoutes();
    }

    private setPath = (path): void =>{
        this.path = path
    }
    
    private initialzeRoutes = () => {
        this.router.get(this.path, this.getAllPosts);
        this.router.post(this.path, this.createPost);
        this.router.get(`${this.path}/:id`, this.getPostById);
    }

    private getAllPosts = (request: express.Request, response: express.Response) => {
        PostModel.find({}, (err, posts) => {
            if(err) return console.log(err)
                return response.send(posts)
        });
            
    }

     private createPost = (request: express.Request, response: express.Response) => {
        const newPost = new PostModel(request.body);
        return newPost.save((err, post) => {
            if(err) return console.log(err)
            return response.send(post)

        })
    }

    private getPostById = (request: express.Request, response: express.Response) => {
        const postId: express.Request = request.params.id;
        PostModel.findById(postId, (err, post) => {
            if(err) return console.log(err)
                return response.send(post)
        });
    }
}

export default PostController;