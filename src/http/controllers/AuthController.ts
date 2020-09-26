import { CommonError } from "@app/errors";
import IIssueToken, { IssueToken } from "@app/services/IssueToken";
import { buildResponse } from "@recordot/http-core";
import {NextFunction, Request, Response} from "express";
import { injectable } from "power-di";
import { env } from "process";

@injectable()
export default class AuthController {

    issueToken!:IIssueToken;

    constructor(){
        // todo injection 
        this.issueToken = new IssueToken;
    }

    // todo 개발용
    /**
     * @description 이슈
     * 
     */
    issueJwt(req: Request, res: Response, n: NextFunction) {
        if(process.env.NODE_ENV !== 'develop' || process.env.NODE_ENV !== 'test')
            throw new CommonError("Not Implemented");
            
        const body = req.body 
        const jwt = this.issueToken.issueToken(body);
        return buildResponse({jwt});
    }
}
