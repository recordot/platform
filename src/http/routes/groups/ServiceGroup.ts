import ServiceController from "@controllers/ServiceController";
import { RouterGroup, Router } from "@recordot/http-core"
import { NextFunction, Request, Response } from "express";
import { inject, injectable, IocContext } from "power-di";
import { AccessControl, Permission } from 'role-acl';
import {UnauthorizedError} from '@http/errors'
import JwtMiddleware from "@http/middlewares/JwtMiddleware";
import ServiceACMiddleware from '@http/middlewares/Service/ServiceACMiddleware'
@injectable()
export default class ServiceGroup extends RouterGroup {

    @inject({type:AccessControl})
    protected ac!:AccessControl;
    @inject({type:ServiceACMiddleware})
    protected acm!:ServiceACMiddleware;

    defaultBefores = [JwtMiddleware.handle];

    groups:Router[] = [
        {
            method: "post", 
            route: "/services",
            controller: ServiceController,
            action: 'create',
            befores: [async (req: Request, res: Response, next: NextFunction) => {
                await this.acm.createBerfore(req,res,next);
            }],
        },
        {
            method: "get", 
            route: "/services",
            controller: ServiceController,
            action: 'reads',
            befores: [async (req: Request, res: Response, next: NextFunction) => {
                await this.acm.read(req,res,next);
            }],
        },
    ]
}
    