import { sha512 } from "js-sha512";
import bcrypt from "bcrypt";
import { Role } from "./Role";

export default class User {
    id!:string;
    username!:string;
    roles:Role[] =[] ;

    private _password!: string;
    public get password(): string {
        return this._password;
    }
    
    public set password(value: string) {
        console.log(`set ${value}`);
        
        const hashed = sha512.hmac.create('key').update(value).hex();

        const salt = bcrypt.genSaltSync(10);
        const password = bcrypt.hashSync(hashed,salt);

        this._password = password;
    }

    public comparePassword(value:string) {
        console.log(`comparePassword ${value}`);
        // Load hash from your password DB.
        const hashed = sha512.hmac.create('key').update(value).hex();
        return bcrypt.compareSync(hashed,this.password);
    }
}
