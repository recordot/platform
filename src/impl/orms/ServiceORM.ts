import { Role } from "@app/domains/User/entities/Role";
import User from "@app/domains/User/entities/User";
import { BeforeInsert, Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import RoleORM from "./RoleORM";

@Entity({name:'services'})
export default class ServiceORM {

    @PrimaryGeneratedColumn()
    id!: number;
    
    @Column({unique:true})
    code!: string;

    @Column({unique:true})
    name!: string;

    @Column({nullable:true})
    desc!: string;

    toEntity() {
        const id = this.id
        const code = this.code
        const name = this.name
        const desc = this.desc

        return {
            id, code, name, desc
        }
    }
}
