import { Role } from "@app/domains/User/entities/Role";
import User from "@app/domains/User/entities/User";
import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import UserORM from "./UserORM";

@Entity({name:'roles'})
export default class RoleORM {

    @PrimaryColumn()
    name!: string;

    @ManyToOne(type=>UserORM, user => user.roles)
    @JoinColumn({name:'user_id'})
    user!:UserORM;

    
    toEntity(): Role {
        const role = new Role;
        role.name = this.name;

        return role;
    }
}
