import HttpException from "./HttpException";

class UserWithThatEmailAlreadyExist extends HttpException {

    constructor(email: string) {
        super(400, `this ${email} already exist. please choose another one.`);
    }

}

export default UserWithThatEmailAlreadyExist;