import { CommonError, NotFoundError } from "@app/errors";
import UserORM from "@impl/orms/UserORM";
import { manager } from "@infras/database/connection";
import User from "./entities/User";

class Unauthenticated extends CommonError {
    status_code = 401;
}

export class Authenticate {
    
    m = manager();
    async authenticate(credential:{id:string, password:string}): Promise<User> {
        
        const orm = await this.m.findOne(UserORM,credential.id);

        if(!orm)
            throw new NotFoundError(`User(id:${credential.id} is NOT FOUND`);

        const user = orm.toEntity();        
        
        if(user.comparePassword(credential.password))
            return user;

        throw new Unauthenticated('Unauthenticated');
    }
}

export class IssueJWT{

    async issue(){

    }
}