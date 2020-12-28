import {NextFunction, Request, Response} from "express";
import { injectable } from "power-di";
import Post from "@domains/Post/entities/Post";
import createValidator from "@domains/Post/services/create/CreateReqBody.validator";
import PostORM from "@impl/orms/PostORM";
import { manager } from "@infras/database/connection";


@injectable()
export default class PostController {

    async create(req: Request, res: Response, next: NextFunction) {

        const post = new Post;

        post.title = req.body.title;
        post.content = req.body.content;

        createValidator(post);

        const orm = new PostORM;

        orm.title = post.title;
        orm.content = post.content;

        await manager().save(orm);

        return orm;
    }

    read(req: Request, res: Response, next: NextFunction) {

    }

    reads(req: Request, res: Response, next: NextFunction) {

    }

    patch(req: Request, res: Response, next: NextFunction) {

    }

    delete(req: Request, res: Response, next: NextFunction) {

    }
}
