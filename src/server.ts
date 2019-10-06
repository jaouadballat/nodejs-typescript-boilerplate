import App from "./app";

import PostController from './controllers/post/post.controller'
import AuthenticatedController from "./controllers/user/authenticated.controller";

const app = new App([
    PostController.handle(),
    AuthenticatedController.handle()
], process.env.PORT || 3000)

app.listen();