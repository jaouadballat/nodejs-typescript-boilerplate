import * as express from 'express';
import Post from './post.interface'
import Controller from '../controller';
import PostModel from '../../Model/Post.model'

class PostController extends  Controller{

    private posts: Post[] =  [
        {
            author: 'jaouad ballat',
            content: 'joaud ballat',
            title: 'jaouad ballat'
        }
    ];

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
    }

    private getAllPosts = (request: express.Request, response: express.Response): Post[] => {
        return response.send(this.posts)
    }

     private createPost = (request: express.Request, response: express.Response): Post => {
        const newPost = new PostModel(request.body);
        return newPost.save((err, post) => {
            if(err) return console.log(err)
            return response.send(post)

        })
    }
}

export default PostController;