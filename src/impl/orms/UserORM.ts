import { Role } from "@app/domains/User/entities/Role";
import User from "@app/domains/User/entities/User";
import { BeforeInsert, Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import RoleORM from "./RoleORM";

@Entity({name:'users'})
export default class UserORM {

    @BeforeInsert()
    private beforeInsert() {
        const uuid = require("uuid");
        const id = uuid.v4();
        this.id = id;
    }

    @PrimaryColumn()
    id!: string;

    @Column()
    username!: string;
    
    private _password!: string;
    @Column()
    public get password(): string {
        return this._password;
    }

    @OneToMany(type => RoleORM, role => role.user)
    roles!:RoleORM[];

    getRoleEntities(): Role[] {
        const entities:Role[] = [];
        if(this.roles)
        this.roles.forEach(role => {
            entities.push(role.toEntity());
        })

        return entities;
    }
    
    public set password(value: string) {
        this._password = value;
    }
    
    toEntity(): User {
        const user = new User;
        user.id = this.id;
        user.password = this.password;
        user.username = this.username;
        user.roles = this.getRoleEntities();

        return user;
    }
}
