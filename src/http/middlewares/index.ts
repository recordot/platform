import { NextFunction, Request, Response } from 'express';
import { Middelware } from '@recordot/http-core';

const everyRequest: Middelware = {
    handle: (req: Request, res: Response, next: NextFunction): any => { next(); },
};

const helloReqeust: Middelware = {
    route: '/hello-world*',
    handle: (req: Request, res: Response, next: NextFunction): any => { next(); },
};

const Middlewares: Middelware[] = [
    everyRequest,
    helloReqeust,
];

export default Middlewares;