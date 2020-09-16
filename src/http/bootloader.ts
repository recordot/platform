import * as express from 'express';
import * as bodyParser from "body-parser";
import Middlewares from "./middlewares"
import {Routes} from "./routes";
import ErrorHandlers from "./errors/handlers";
import {connect as connectDB, close as closeDB } from "@infras/database/connection"
import { NextFunction } from 'express';
import dotenv from 'dotenv'
import { injectable, IocContext } from 'power-di';
import { Router, Middelware } from "@recordot/http-core";

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
        
        Middlewares.forEach((middleware:Middelware)=> {
            if(middleware.route)
                this.app.use(middleware.route,middleware.handle)
            else
                this.app.use(middleware.handle)
        });
    }

    loadRoutes(){
        Routes.forEach(route => {
            const handle = (req: express.Request, res: express.Response, next: NextFunction) => {
                let result = null;               
                
                if(typeof route.action === 'string') {
                    const ctrlr = IocContext.DefaultInstance.get((route as Router).controller);
                    result = ctrlr[route.action](req, res, next);
                } else {
                    result = route.action(req, res, next);
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
            const rr = route.route;
            
            if(route.befores && route.befores.length > 0) 
                app.use(rr, route.befores);    
            app[route.method](rr, handle)
            if(route.afters && route.afters.length > 0) 
                app.use(rr, route.afters);
                
        });
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