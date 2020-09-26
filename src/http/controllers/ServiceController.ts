import { CommonError } from "@app/errors";
import ServiceORM from "@impl/orms/ServiceORM";
import { manager } from "@infras/database/connection";
import { buildResponse } from "@recordot/http-core";
import {NextFunction, Request, Response} from "express";
import { injectable } from "power-di";

@injectable()
export default class ServiceController {

    m = manager();
    async create(req: Request, res: Response, next: NextFunction) {        
            
        // const dto = new ServiceORM;
        const created = await this.m.save(ServiceORM,req.body);

        // const service = created.toEntity();

        return buildResponse({service:created});
    }

    async reads(req: Request, res: Response, next: NextFunction) {        
            
        const orms = await this.m.find(ServiceORM);
        const services:any[] = [];
        
        orms.forEach(orm => {
            const service = req.readPermission.filter(orm);
            services.push(service);
        })

        return buildResponse({services});
    }

}
