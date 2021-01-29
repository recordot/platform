import { buildResponse, Router, RouterGroup } from '@recordot/http-core'
import { NextFunction, Request, Response } from 'express';
import HelloworldGroup from './groups/HelloWorldGroup'
import PostGroup from './groups/PostGroup'

export const Routes:Array<Router> = [
    {
        method: 'get',
        route: "healthy",
        action: (request: Request, response: Response, next: NextFunction) => {
            return buildResponse({message: "ok"});
        }
    }
];

export const RouteGroups: Array<{new (...args: any[]): RouterGroup;}> = [
    HelloworldGroup,
    PostGroup,
];