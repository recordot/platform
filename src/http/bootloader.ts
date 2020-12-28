import * as express from 'express';
import * as bodyParser from "body-parser";
import Middlewares from "./middlewares"
import {Routes, RouteGroups} from "./routes";
import ErrorHandlers, { notFoundHandler } from "./errors/handlers";
import {connect as connectDB, close as closeDB } from "@infras/database/connection"
import { NextFunction } from 'express';
import dotenv from 'dotenv'
import { injectable, IocContext } from 'power-di';
import { Router, Middelware, RouterGroup } from "@recordot/http-core";
import bearerToken from "express-bearer-token";

export class Bootloader {

    protected static _instance: Bootloader;
    
    public static get Instance()
    {
        return this._instance || (this._instance = new this());
    }
    
    async loadConnections() {
        await connectDB();
    }
    
    public app : express.Application;
    
    protected constructor(){
        dotenv.config()
        this.app = express.default();
    }

    loadMiddleware(){

        this.app.use(bodyParser.json());
        this.app.use(bearerToken());
        
        Middlewares.forEach((middleware:Middelware)=> {
            if(middleware.route)
                this.app.use(middleware.route,middleware.handle)
            else
                this.app.use(middleware.handle)
        });
    }

    protected routerInit(router:Router) {

        const handle = (req: express.Request, res: express.Response, next: NextFunction) => {
            let result = null;               
            
            if(typeof router.action === 'string') {
                const ctrlr = IocContext.DefaultInstance.get((router as Router).controller);
                result = ctrlr[router.action](req, res, next);
            } else {
                result = router.action(req, res, next);
            }
            
            if (result instanceof Promise) {
                result.then(result => {
                    res.json(result)
                    next();
                }).catch(error => {
                    next(error);
                })
                return;
            }
            
            if (result !== null && result !== undefined) {
                res.json(result);
            } else {
                res.status(500).json({
                    code:"NoResult",
                    message: "Empty result.",
                    result: {}
                });
            }
            next();
        };
        
        const app = (this.app as any);
        const rr = router.route;
        
        app[router.method](rr, router.befores, handle, router.afters)
    }
    
    loadRoutes(){

        Routes.forEach(router => {
            this.routerInit(router);
        });
    
        RouteGroups.forEach( routeGrous => {
            const routeGroup = IocContext.DefaultInstance.get(routeGrous) as RouterGroup;
            routeGroup.getRouterGroups().forEach(router => {
                this.routerInit(router);
            });
        })

        // 마지막 까지 라우팅 되지 않는다면 Not Found 처리
        this.app.use(notFoundHandler.handle);
    }

    loadErrorHandler(){
        ErrorHandlers.forEach(handler => {
            this.app.use(handler.handle)
        });
    }

    async bootstrap(){
        await this.loadConnections();
        this.loadMiddleware();
        this.loadRoutes();
        this.loadErrorHandler();
    }

    async down(){
        await closeDB();
    }
}

export default Bootloader.Instance;