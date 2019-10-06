import HttpException from "./HttpException";

class WrongCredentialException extends HttpException {

    constructor() {
        super(401, `wrong credentials. Please try again`);
    }

}

export default WrongCredentialException;