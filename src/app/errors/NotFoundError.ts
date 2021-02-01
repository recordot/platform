import { CommonError } from ".";

export default class NotFoundError extends CommonError {
    code: number = 404000;
    status_code = 404;
}