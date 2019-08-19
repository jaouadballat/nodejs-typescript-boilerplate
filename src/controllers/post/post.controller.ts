import * as express from 'express';
import Post from './post.interface'
import Controller from '../controller'

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
        this.initialzeRoutes();
        this.setPath(this.PATH)
    }

    private setPath(path): void {
        this.path = path
    }

    initialzeRoutes() : void{
        this.router.get(this.path, this.getAllPosts);
        this.router.get(this.path, this.createPost);
    }

    private getAllPosts = (request: express.Request, response: express.Response) => {
        response.send(this.posts)
    }

    private createPost = (request: express.Request, response: express.Response) => {
        const post: Post = request.body;
        this.posts.push(post);
        response.send(this.posts)
    }
}

export default PostController;