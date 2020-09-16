export class CommonError extends Error {
    code:number = 400000;
    status_code = 400;
    message: string|'unknown error';
    result: {
        [key: string]: any;
    } = {};

    constructor(message: string, result?: { [key: string]: any; }) {
      super(message);
      this.message = message;
      this.result = result? result:{};
    }
}

export class NotFoundError extends CommonError {
    code:number = 404000;
    status_code = 404;
}