import Post from "@app/domains/Post/entities/Post";
import AbsReadPostById from "@app/domains/Post/repositories/AbsReadPostById";
import PostORM from "@impl/orms/PostORM";
import { manager } from "@infras/database/connection";

export default class ReadPostById extends AbsReadPostById {

    protected m = manager();

    async read(id: string | number): Promise<Post | undefined> {

        // load data;
        const orm = await this.m.findOne(PostORM, id);

        if (!orm)
            return;

        return orm.toEntity();
    }
}