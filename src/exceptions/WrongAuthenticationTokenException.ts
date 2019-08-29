import HttpException from "./HttpException";

class WrongAuthenticationTokenException extends HttpException {

    constructor() {
        super(401, `wrong credentials. Please try again`);
    }

}

export default WrongAuthenticationTokenException;