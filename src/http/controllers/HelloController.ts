import { buildResponse } from "@recordot/http-core";
import {NextFunction, Request, Response} from "express";
import { injectable } from "power-di";

@injectable()
export default class HelloController {

    helloworld(req: Request, res: Response, next: NextFunction) {

        return buildResponse({message:"hello world!"});

    }
}
