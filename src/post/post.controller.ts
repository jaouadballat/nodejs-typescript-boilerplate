import * as express from 'express';
import Post from './post.interface'

class PostController {
    public path = '/posts';
    public router = express.Router()

    private posts: Post[] =  [
        {
            author: 'jaouad ballat',
            content: 'joaud ballat',
            title: 'jaouad ballat'
        }
    ];

    constructor() {
        this.initialzeRoutes()
    }

    initialzeRoutes() {
        this.router.get(this.path, this.getAllPosts);
        this.router.get(this.path, this.createPost);
    }

    private getAllPosts = (request: express.Request, response: express.Response) => {
        response.send(this.posts)
    }

    createPost = (request: express.Request, response: express.Response) => {
        const post: Post = request.body;
        this.posts.push(post);
        response.send(this.posts)
    }
}

export default PostController;