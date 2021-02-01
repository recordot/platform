import Post from "@app/domains/Post/entities/Post";
import { AbsSavePostRepo } from "@app/domains/Post/repositories";
import PostORM from "@impl/orms/PostORM";
import { manager } from "@infras/database/connection";
import { getRepository } from "typeorm";

export default class SavePostRepo extends AbsSavePostRepo {

    protected m = manager();

    async save(id: string | number, post: Post): Promise<Post | undefined> {

        const orm = await this.m.save(PostORM);


    }
}