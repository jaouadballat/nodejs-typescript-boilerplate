import App from "./app";

import PostController from './controllers/post/post.controller'

const app = new App([
    PostController.handle()
], 3000)

app.listen();