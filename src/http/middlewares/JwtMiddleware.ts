import { CommonError } from "@app/errors";
import { Middelware } from "@recordot/http-core";
import { NextFunction, Request, Response } from "express";
import IIssueToken from '@app/services/IssueToken';
import { IocContext } from 'power-di';

class UnauthenticatedError extends CommonError {
    status_code = 401;
    code = 401000;
}

const JwtMiddleware:Middelware = {
    
    handle:(req:Request, res:Response, next:NextFunction):any => {
        try {
            if(!req.token)
                throw new Error("No Bearer Token");
                
            const decoded = IocContext.DefaultInstance.get(IIssueToken).verify(req.token);
            
            const validateKeys = require('object-key-validator');
            const rule = { $and: ['role'] };
            
            if(!validateKeys(rule, decoded)){
                throw new Error("Invalid Auth Structure");
            }

            req.auth = decoded as {role:string};
            next();           
        } catch (error) {
            const message = error.message || 'Not Authenticated'
            next(new UnauthenticatedError(message));
        }
    }
}

export default JwtMiddleware;