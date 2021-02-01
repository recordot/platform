import { buildResponse, Router, RouterGroup } from '@recordot/http-core';
import { NextFunction, Request, Response } from 'express';
import HelloworldGroup from './groups/HelloWorldGroup';

export const Routes: Router[] = [
    {
        method: 'get',
        route: "healthy",
        action: (request: Request, response: Response, next: NextFunction) => {
            return buildResponse({ message: "ok" });
        },
    },
];

export const RouteGroups: (new (...args: any[]) => RouterGroup)[] = [
    HelloworldGroup,
];