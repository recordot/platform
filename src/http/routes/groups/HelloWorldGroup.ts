import { RouterGroup, Router, buildResponse } from "@recordot/http-core";
import { NextFunction, Response, Request } from "express";
import HelloController from "../../controllers/HelloController";
import { CommonError } from "@app/errors";
import { RequestHandlerParams } from 'express-serve-static-core';
import { fire } from "@infras/event";
import HelloEvent from "@infras/event/events/HelloEvent";
import { injectable } from "power-di";

const emptyFunc = (request: Request, response: Response, next: NextFunction): any => {
    next();
};

@injectable()
export default class HelloWorldGroup extends RouterGroup {

    defaultBefores: RequestHandlerParams[] = [emptyFunc];
    defaultAfters: RequestHandlerParams[] = [emptyFunc];

    groups: Router[] = [
        {
            method: "get",
            route: "/hello-world",
            controller: HelloController,
            action: 'helloworld',
            afters: [emptyFunc],
            befores: [emptyFunc],
        },
        {
            method: "get",
            route: "/hello-world/tests/anonymous",
            action: (request: Request, response: Response, next: NextFunction): any => {
                return buildResponse({
                    "message": "hello world!",
                });
            },
        },
        {
            method: "get",
            route: "/hello-world/tests/anonymous-throw-error-no-mssg",
            action: (request: Request, response: Response, next: NextFunction): any => {
                throw new Error();
            },
        },
        {
            method: "get",
            route: "/hello-world/tests/anonymous-throw-error",
            action: (request: Request, response: Response, next: NextFunction): any => {
                throw new Error("anonymous-throw-error");
            },
        },
        {
            method: "get",
            route: "/hello-world/tests/anonymous-throw-common-error",
            action: (request: Request, response: Response, next: NextFunction): any => {
                throw new CommonError("anonymous-throw-common-error");
            },
        },
        {
            method: "get",
            route: "/hello-world/tests/return-nothing",
            // tslint:disable-next-line: no-empty
            action: (request: Request, response: Response, next: NextFunction): any => { },
        },
        {
            method: "get",
            route: "/hello-world/tests/event",
            action: (request: Request, response: Response, next: NextFunction): any => {
                const event = new HelloEvent;
                fire(event);
                return buildResponse({
                    "message": "hello world!",
                });
            },
        },
    ];
}
