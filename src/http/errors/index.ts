import { CommonError } from "@app/errors";

export class UnauthorizedError extends CommonError {
    status_code = 403;
    code = 403000;
}