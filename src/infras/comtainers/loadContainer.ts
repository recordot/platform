import { IocContext } from "power-di";
import EventEmitter from "promise-events";
import acl from "@infras/access-control/acl";
import { AccessControl } from 'role-acl';
import IIssueToken, { IssueToken } from "@app/services/IssueToken";
import log4js, { configure, getLogger } from "log4js";

export default function loadContainer(){
    
    const context = IocContext.DefaultInstance;

    // 필수 로드
    context.register(EventEmitter, 'EventEmitter');
    context.register(new AccessControl(acl), AccessControl);
    context.register(IssueToken, IIssueToken)
    log4js.addLayout('json', require('log4js-json-layout'));
    configure("log4js.conf")
    context.register(getLogger(),"Logger");

    // 추가 로드
}

export function clearContainer(){
    const context = IocContext.DefaultInstance;
    try {
        context.clear();
    } catch (error) {
        
    }
}