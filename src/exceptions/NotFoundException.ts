import HttpException from "./HttpException";

class NotFoundException extends HttpException {

    constructor() {
        super(404, 'not found');
    }

}

export default NotFoundException;