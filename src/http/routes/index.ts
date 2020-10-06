import { Router, RouterGroup } from '@recordot/http-core'
import HelloworldGroup from './groups/HelloWorld'

export const Routes:Array<Router> = [
    ... HelloworldGroup,
    // {
    //     route:'authenticateW'
    // }
    // ... ServiceGroup
]

export const RouteGroups: Array<{new (...args: any[]): RouterGroup;}> = [
    
]