import { NextFunction, Request, Response } from 'express';
import { CommonError } from '@app/errors';
import { ErrorHandler } from "@recordot/http-core";

let commonErrorHandler:ErrorHandler = {
    handle:(err:Error,req:Request, res:Response, next:NextFunction):any => {
        // let code = 40000;
        let message = 'Error';
        let result:{[key: string]: any;} = {};
        let status_code = 500;

        if(err instanceof CommonError){
            // code = err.constructor.name;
            const code = err.code;
            message = err.message;
            result = err.result;
            result.err = err.constructor.name;
            status_code = err.status_code;

            res.status(status_code).send({
                code,
                message,
                result,
            });
            next();
        }
        
        next(err)
    }
}

let unknownErrorHandler:ErrorHandler = {
    handle:(err:Error,req:Request, res:Response, next:NextFunction):any => {
        console.log(err);
        
        res.status(500).send({
            code: 'ERROR',
            message: err.message?err.message:'unknown error',
            result: {err:err},
        });
        next();
    }
}

const ErrorHandlers:Array<ErrorHandler> = [
     commonErrorHandler,
     unknownErrorHandler
]

export default ErrorHandlers