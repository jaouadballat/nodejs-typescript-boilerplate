import HttpException from "./HttpException";

class MissingTokenException extends HttpException {
    constructor() {
        super()
    }
}