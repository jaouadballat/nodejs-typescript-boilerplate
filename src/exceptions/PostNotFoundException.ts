import HttpException from "./HttpException";

class PostNotFoundException extends HttpException {

    constructor(status: number, message: string) {
        super(status, message);
    }

}

export default PostNotFoundException;