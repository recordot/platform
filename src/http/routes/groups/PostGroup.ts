import { RouterGroup, Router } from "@recordot/http-core"
import PostController from "../../controllers/PostController"
import { injectable } from "power-di";

@injectable()
export default class PostGroup extends RouterGroup {
    

    groups:Router[] = [
        {
            method: "post", 
            route: "/posts",
            controller: PostController,
            action: 'create',
        }
    ]
}
    