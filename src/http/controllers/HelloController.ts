import {NextFunction, Request, Response} from "express";
import { injectable } from "power-di";

@injectable()
export default class HelloController {

    helloworld(req: Request, res: Response, next: NextFunction) {

        return {
            code: 20000,
            message: "ok",
            result: {
                "message":"hello world!"
            }
        }

    }
}
