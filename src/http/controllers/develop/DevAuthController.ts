import { CommonError } from "@app/errors";
import IIssueToken, { IssueToken } from "@app/services/IssueToken";
import { buildResponse } from "@recordot/http-core";
import {NextFunction, Request, Response} from "express";
import { injectable } from "power-di";

@injectable()
export default class DevAuthController {

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
                    
        const body = req.body 
        const jwt = this.issueToken.issueToken(body);

        return buildResponse({jwt});
    }

    decodeJwt(req: Request, res: Response, n: NextFunction) {
        if(process.env.NODE_ENV !== 'develop' && process.env.NODE_ENV !== 'test')
            throw new CommonError("Not Implemented");
            
        const jwt = req.body.jwt;
        if(!jwt)
            throw new CommonError("jwt is required");
            
        const decoded = this.issueToken.verify(jwt);

        return buildResponse({decoded});
    }
}
