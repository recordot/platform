import { AbsReadPostById, AbsSavePost } from "@app/domains/Post/repositories";
import PatchReqBody from "@app/domains/Post/services/patch/PatchReqBody copy";
import { NotFoundError } from "@app/errors";
import PostORM from "@impl/orms/PostORM";
import { inject, injectable } from "power-di";

@injectable()
export default class PatchCtl {

    async patch(id: string | number, dto: PatchReqBody) {

        // load data
        const post = await this.readPost.read(id);

        if (!post) {
            throw new NotFoundError("");
        }

        if (dto.title !== undefined) {
            post.title = dto.title;
        }

        if (dto.content !== undefined) {
            post.content = dto.content;
        }

        await this.savePost.save(id, post);


    }
}