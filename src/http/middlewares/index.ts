import { NextFunction, Request, Response } from 'express';
import { Middelware } from '@recordot/http-core';

let everyRequest:Middelware =  {
    handle:(req:Request, res:Response, next:NextFunction):any => {next()}
}

let helloReqeust:Middelware =  {
    route:'/hello-world*',
    handle:(req:Request, res:Response, next:NextFunction):any => {next()}
}

const Middlewares:Array<Middelware> = [
    everyRequest,
    helloReqeust
]

export default Middlewares