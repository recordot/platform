import { IocContext } from "power-di";
import { EventEmitter } from "events";
import acl from "@infras/access-control/acl";
import { AccessControl } from 'role-acl';
import IIssueToken, { IssueToken } from "@app/services/IssueToken";

export default function loadContainer(){
    
    const context = IocContext.DefaultInstance;

    context.register(EventEmitter,'EventEmitter');
    context.register(new AccessControl(acl), AccessControl);
    context.register(IssueToken, IIssueToken)
    

}

export function clearContainer(){
    const context = IocContext.DefaultInstance;
    try {
        context.clear();
    } catch (error) {
        
    }
}