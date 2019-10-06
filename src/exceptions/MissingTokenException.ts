import HttpException from "./HttpException";

class MissingTokenException extends HttpException {
    constructor() {
        super(403, "Missing token exception");
    }
}

export default MissingTokenException;