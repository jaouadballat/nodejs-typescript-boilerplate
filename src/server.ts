import App from "./app";

import PostController from './post/post.controller'

const app = new App([
    new PostController()
], 3000)

app.listen();