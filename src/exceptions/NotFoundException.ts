import HttpException from "./HttpException";

class NotFoundException extends HttpException {

    constructor(status: number, message: string) {
        super(status, message);
    }

}

export default NotFoundException;