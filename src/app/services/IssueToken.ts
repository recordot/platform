import { CommonError } from "@app/errors";

export default abstract class IIssueToken {

    /**
     * 
     * @param payloy 
     * @return jwt
     */
    abstract issueToken(payloy:object): string;

    abstract verify(token:string) : object;
}

export class InvaildTokenError extends CommonError {}

import jwt from "jsonwebtoken"

export class IssueToken extends IIssueToken {
    
    issueToken(payloy: object): string {
        
        const token = jwt.sign(payloy, 'copm.themoin.broker');

        return token;
        
    }

    verify(token: string): object {
        
        // let decoded = jwt.verify(token, "abc", {algorithms:['RS256']});
        var decoded = jwt.verify(token, 'copm.themoin.broker');

        if(typeof decoded === 'string'){
            decoded = JSON.parse(decoded) as object;
        }

        return decoded;
    }

}