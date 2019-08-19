import App from "./app";

import PostController from './post/post.controller'

const app = new App([
    PostController.handle()
], 3000)

app.listen();