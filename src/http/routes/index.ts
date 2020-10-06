import { Router, RouterGroup } from '@recordot/http-core'
import HelloworldGroup from './groups/HelloWorld'
import HelloworldGroup2 from './groups/HelloWorld2'

export const Routes:Array<Router> = [
    // ... HelloworldGroup,
    // {
    //     route:'authenticateW'
    // }
    // ... ServiceGroup
]

export const RouteGroups: Array<{new (...args: any[]): RouterGroup;}> = [
    HelloworldGroup2
]