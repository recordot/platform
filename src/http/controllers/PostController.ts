import { NextFunction, Request, Response } from "express";
import { injectable } from "power-di";
import Post from "@domains/Post/entities/Post";
import createValidator from "@domains/Post/services/create/CreateReqBody.validator";
import PostORM from "@impl/orms/PostORM";
import { manager } from "@infras/database/connection";


@injectable()
export default class PostController {

    async create(req: Request, res: Response, next: NextFunction) {

        const dto = req.body;

        const post = createValidator(dto);

        const orm = new PostORM;
        orm.title = post.title;
        orm.content = post.content;

        await manager().save(orm);

        return orm;
    }

    read(req: Request, res: Response, next: NextFunction) {
        // todo
    }

    reads(req: Request, res: Response, next: NextFunction) {
        // todo
    }

    patch(req: Request, res: Response, next: NextFunction) {
        const id = req.params.id;
    }

    delete(req: Request, res: Response, next: NextFunction) {
        // todo
    }
}
