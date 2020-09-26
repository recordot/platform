import { CommonError } from "@app/errors";
import DevAuthController from "@controllers/develop/DevAuthController";
import { RouterGroup, Router } from "@recordot/http-core"
import { NextFunction, Request, Response } from "express";
import { RequestHandlerParams } from 'express-serve-static-core';

export default new (class extends RouterGroup {
    
    defaultBefores: RequestHandlerParams[] = [
        (req: Request, res: Response, next: NextFunction):any => {
            if(process.env.NODE_ENV !== 'develop' && process.env.NODE_ENV !== 'test')
                 throw new CommonError("Not Allowed");
            next();
        }
    ];

    groups:Router[] = [
        {
            method: "post", 
            route: "/develop/issue-jwt",
            controller: DevAuthController,
            action: 'issueJwt'
        },
        {
            method: "post", 
            route: "/develop/decode-jwt",
            controller: DevAuthController,
            action: 'decodeJwt'
        }
    ]
})().getRouterGroups();
    