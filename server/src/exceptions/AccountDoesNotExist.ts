import HttpException from "./HttpException";

class AccountDoesNotExist extends HttpException {
    public constructor(message: string) {
        super(404, message);
    }
}

export default AccountDoesNotExist;