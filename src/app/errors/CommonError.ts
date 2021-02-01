export default class CommonError extends Error {
    code: number = 400000;
    // tslint:disable-next-line: variable-name
    status_code = 400;
    message: string | 'unknown error';
    result: {
        [key: string]: any;
    } = {};

    constructor(message: string, result?: { [key: string]: any; }) {
        super(message);
        this.message = message;
        this.result = result ? result : {};
    }
}