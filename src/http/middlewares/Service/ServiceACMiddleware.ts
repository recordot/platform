import { Middelware } from "@recordot/http-core";
import { NextFunction, Request, Response } from "express";
import { inject, injectable } from 'power-di';
import { AccessControl, Permission } from 'role-acl';
import { manager } from "@infras/database/connection";
import { UnauthorizedError } from "@http/errors";
import { CommonError } from "@app/errors";
import ServiceORM from "@impl/orms/ServiceORM";

@injectable()
export default class ServiceACMiddleware {
    
    @inject({type:AccessControl})
    protected ac!:AccessControl;
    m = manager();
    async createBerfore(req: Request, res: Response, next: NextFunction) {

        try {

            const permission = this.ac.can(req.auth.role)
            .execute('create').sync()
            .on('services') as Permission;
            
            if(!permission.granted) throw new UnauthorizedError("UnauthorizedError");

            const code = req.body.code; 
            const name = req.body.name; 

            if(!code) throw new CommonError("code is requried");

            if(!name) throw new CommonError("name is requried");

            const exist = await this.m.findOne(ServiceORM,{
                where:[{code},{name}]
            });

            if(exist){
                let msg = '';
                
                if(exist.name === name) 
                    msg = `name(${name}) is exites`;
                if(exist.code === code) 
                    msg = `${msg}, code(${code}) is exites`;

                throw new CommonError(msg);
            }
                
            
            req.body = permission.filter(req.body);

            const readPermission = this.ac.can(req.auth.role)
            .execute('read').sync()
            .on('services') as Permission;

            req.readPermission = readPermission;
            next();
        } catch (error) {
            next(error);    
        }    
    }

    async read(req: Request, res: Response, next: NextFunction) {

        try {

            const permission = this.ac.can(req.auth.role)
            .execute('read').sync()
            .on('services') as Permission;
            
            if(!permission.granted) throw new UnauthorizedError("UnauthorizedError");
            
            req.readPermission = permission;

            next();
        } catch (error) {
            next(error);
        }
    }
}