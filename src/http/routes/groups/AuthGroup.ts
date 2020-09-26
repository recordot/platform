import { RouterGroup, Router } from "@recordot/http-core"
import DevAuthController from "@controllers/develop/DevAuthController";

export default new (class extends RouterGroup {
    
    groups:Router[] = [
        {
            method: "post", 
            route: "/develop/issue-jwt",
            controller: DevAuthController,
            action: 'issueJwt'
        }
    ]
})().getRouterGroups();
    